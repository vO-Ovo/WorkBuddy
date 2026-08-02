#!/usr/bin/env node
/**
 * 数据质量门禁：校验 js/data.js 的 schema 完整性。
 *
 * 为什么需要它：
 *   data.js 由定时自动化任务持续从外部站点抓取追加，脏数据是必然会发生的事。
 *   本脚本作为「闸门」，在 CI / pre-commit / 定时任务重写入库前拦住非法数据，
 *   避免一条坏记录（缺字段、重复 id、非法日期/链接）污染前端。
 *
 * 用法：
 *   node tests/validate-data.cjs                 # 默认校验 ../js/data.js
 *   node tests/validate-data.cjs path/to/data.js  # 指定文件
 *
 * 退出码：0 = 通过；1 = 存在错误（可直接接入 CI 失败策略）。
 */
'use strict';

// 注意：本仓库 package.json 声明了 "type": "module"，故门禁脚本使用 .cjs 扩展名，
// 以明确采用 CommonJS（与文件内 require / vm 用法一致），不受 type:module 影响。
var fs = require('fs');
var path = require('path');
var vm = require('vm');

// 与前端 src/constants.js 中的分类法保持一致（单一事实来源）：全省 21 个地级市
var REGIONS = ['广州市', '深圳市', '珠海市', '汕头市', '佛山市', '韶关市', '湛江市', '肇庆市', '江门市', '茂名市', '惠州市', '梅州市', '汕尾市', '河源市', '阳江市', '清远市', '东莞市', '中山市', '潮州市', '揭阳市', '云浮市'];
var TYPES = ['招标公告', '中标结果公告', '调研·论证公告'];
var DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

var dataPath = process.argv[2] || path.join(__dirname, '..', 'js', 'data.js');

function ok(msg) { console.log('  ✓ ' + msg); }
function warn(msg) { console.warn('  ! 警告: ' + msg); }
function fail(msg) { console.error('  ✗ ' + msg); }

console.log('\n[数据校验] ' + dataPath);

if (!fs.existsSync(dataPath)) {
  console.error('文件不存在: ' + dataPath);
  process.exit(1);
}

var code;
try {
  code = fs.readFileSync(dataPath, 'utf8');
} catch (e) {
  console.error('读取失败: ' + e.message);
  process.exit(1);
}

// 在沙箱中执行 data.js，仅读取其导出的全局变量，不污染本进程
var ctx = { console: console };
vm.createContext(ctx);
try {
  vm.runInContext(code, ctx, { filename: dataPath });
} catch (e) {
  console.error('执行失败(可能语法错误): ' + e.message);
  process.exit(1);
}

var list = ctx.ANNOUNCEMENTS;
var updated = ctx.DATA_UPDATED;

var errors = [];

if (!Array.isArray(list)) {
  errors.push('ANNOUNCEMENTS 不是数组');
} else {
  ok('共 ' + list.length + ' 条记录');

  if (typeof updated !== 'string' || !DATE_RE.test(updated)) {
    warn('DATA_UPDATED 缺失或格式不正确: ' + updated);
  } else {
    ok('DATA_UPDATED = ' + updated);
  }

  var ids = {};
  list.forEach(function (a, i) {
    var at = '第' + (i + 1) + '条';
    if (!a || typeof a !== 'object') { errors.push(at + ' 不是对象'); return; }

    if (a.id == null) errors.push(at + ' 缺少 id');
    else if (ids[a.id]) errors.push(at + ' 重复 id=' + a.id);
    else ids[a.id] = true;

    if (typeof a.title !== 'string' || !a.title.trim()) errors.push(at + '(id=' + a.id + ') 标题为空');
    if (REGIONS.indexOf(a.region) === -1) errors.push(at + '(id=' + a.id + ') region 非法: ' + a.region);
    if (typeof a.category !== 'string' || !a.category.trim()) errors.push(at + '(id=' + a.id + ') category 为空');
    if (TYPES.indexOf(a.type) === -1) errors.push(at + '(id=' + a.id + ') type 非法: ' + a.type);
    if (typeof a.budget !== 'number' || a.budget < 0) errors.push(at + '(id=' + a.id + ') budget 非法: ' + a.budget);
    if (typeof a.publishDate !== 'string' || !DATE_RE.test(a.publishDate)) errors.push(at + '(id=' + a.id + ') publishDate 格式非法: ' + a.publishDate);
    if (typeof a.sourceUrl !== 'string' || !/^https?:\/\//.test(a.sourceUrl)) errors.push(at + '(id=' + a.id + ') sourceUrl 非法: ' + a.sourceUrl);
  });
}

if (errors.length) {
  console.error('\n校验未通过，发现 ' + errors.length + ' 个错误:');
  errors.forEach(fail);
  process.exit(1);
}

ok('全部校验通过 ✅');
process.exit(0);
