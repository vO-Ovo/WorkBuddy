// 粤东医疗设备招标信息汇总平台 — 数据桥接层 + 校验归一化
//
// 数据文件 js/data.js 由定时任务以「经典 <script>」形式注入全局
// window.ANNOUNCEMENTS / window.DATA_UPDATED（详见 README 的自动化说明）。
// 本模块作为桥接层读取该全局并归一化，避免改动机器生成格式；
// 刷新时重新注入脚本以更新 window 上的值（经典脚本的全局副作用）。
//
// 若未来把 js/data.js 也改为 ESM（export const ANNOUNCEMENTS），
// 可改用动态 import('../js/data.js?t=' + Date.now()) 替换桥接逻辑。

import { REGIONS, TYPES } from './constants.js';
import { setText, DATE_RE } from './utils.js';
import { store } from './state.js';

// 加载即校验 + 安全兜底：单项脏数据不再拖垮整页。
// 返回归一化后的合法数组；非法项记入 warnings 并跳过。
export function normalizeData(raw) {
  if (!Array.isArray(raw)) {
    throw new Error('ANNOUNCEMENTS 不是数组，数据文件可能加载失败');
  }
  const seenIds = {};
  const valid = [];
  const warnings = [];
  raw.forEach(function (a, i) {
    if (!a || typeof a !== 'object') { warnings.push('第' + (i + 1) + '项不是对象，已跳过'); return; }
    if (a.id == null) { warnings.push('缺少 id 的记录已跳过: ' + (a.title || '?')); return; }
    if (seenIds[a.id]) { warnings.push('重复 id=' + a.id + ' 已去重'); return; }
    seenIds[a.id] = true;
    valid.push({
      id: a.id,
      title: String(a.title || '（无标题）'),
      region: REGIONS.indexOf(a.region) !== -1 ? a.region : '未知',
      category: String(a.category || '其他设备'),
      type: TYPES.indexOf(a.type) !== -1 ? a.type : '未知',
      budget: Number(a.budget) || 0,
      publishDate: DATE_RE.test(a.publishDate) ? a.publishDate : '',
      sourceUrl: /^https?:\/\//.test(a.sourceUrl || '') ? a.sourceUrl : '#'
    });
  });
  if (warnings.length) console.warn('[数据校验警告]', warnings);
  return valid;
}

// 从全局读取并刷新 store.DATA；失败（未加载 / 空）向上抛，由调用方决定如何提示。
export function refreshDataFromGlobals() {
  const raw = window.ANNOUNCEMENTS;
  if (!Array.isArray(raw)) {
    throw new Error('数据未加载（ANNOUNCEMENTS 未定义）');
  }
  store.DATA = normalizeData(raw);
  if (!store.DATA.length) throw new Error('有效数据为空');
  if (typeof window.DATA_UPDATED !== 'undefined') setText('updatedAt', window.DATA_UPDATED);
  setText('totalCount', store.DATA.length);
}

// 重新拉取最新数据文件。返回 Promise<boolean>：成功 true / 失败 false。
// 不直接操作 UI（按钮态、错误提示交给调用方），保持数据层纯净。
export function loadData() {
  return new Promise((resolve) => {
    const s = document.createElement('script');
    s.src = 'js/data.js?t=' + Date.now(); // 加时间戳绕过缓存，拿到最新抓取结果
    s.onload = function () {
      try {
        refreshDataFromGlobals();
        resolve(true);
      } catch (e) {
        console.error('数据刷新失败:', e.message);
        resolve(false);
      }
    };
    s.onerror = function () {
      console.error('数据文件加载失败');
      resolve(false);
    };
    document.body.appendChild(s);
  });
}
