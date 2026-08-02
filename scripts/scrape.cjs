#!/usr/bin/env node
/* eslint-disable */
/**
 * scripts/scrape.cjs — 广东全省医疗设备招标公告自动抓取脚本
 *
 * 数据源：
 *   - 中国政府采购网（http://search.ccgp.gov.cn/）
 *   - 广东省政府采购网（http://gdgpo.czt.gd.gov.cn/）
 *
 * 用法：node scripts/scrape.cjs
 * 退出码：0 = 完成；1 = 异常
 *
 * 设计原则：
 *   - 零第三方依赖（仅用 Node.js 内置 http/https），CI 跑更稳定
 *   - 只追加、不删除现有数据（保护历史）
 *   - 字段推断（category/type/budget）容错友好
 *   - 输出标准格式的 js/data.js，便于浏览器直接加载
 */

'use strict';

const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');

// ============================================================
// 配置
// ============================================================
const PROJECT_ROOT = path.resolve(__dirname, '..');
const DATA_FILE = path.join(PROJECT_ROOT, 'js', 'data.js');

const GUANGDONG_CITIES = [
  '广州', '深圳', '珠海', '汕头', '佛山', '韶关', '湛江', '肇庆',
  '江门', '茂名', '惠州', '梅州', '汕尾', '河源', '阳江', '清远',
  '东莞', '中山', '潮州', '揭阳', '云浮'
];

const MED_KEYWORDS = [
  '彩超', 'B超', '超声', '内窥镜', '胃肠镜', '支气管镜', '宫腔镜',
  '腹腔镜', '喉镜', '关节镜', 'CT', 'MRI', '磁共振', 'X线', 'X射线',
  'DR', '呼吸机', '麻醉机', '监护仪', '血透', '透析', '生化分析',
  'PCR', '心电图', '除颤', '手术床', '无影灯', '腔镜', '医疗设备', '医疗器械'
];

const ENDOSCOPE_KW = ['内窥镜', '胃肠镜', '支气管镜', '宫腔镜', '腹腔镜', '喉镜', '关节镜', '腔镜'];
const ULTRASOUND_KW = ['彩超', 'B超', '超声'];

const REQUEST_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'zh-CN,zh;q=0.9'
};

// ============================================================
// HTTP 工具
// ============================================================
function fetchUrl(rawUrl, redirects = 0) {
  return new Promise((resolve, reject) => {
    let url;
    try { url = new URL(rawUrl); } catch (e) { return reject(new Error('bad url: ' + rawUrl)); }
    const mod = url.protocol === 'https:' ? https : http;
    const req = mod.get(rawUrl, { headers: REQUEST_HEADERS, timeout: 20000 }, (res) => {
      if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
        if (redirects >= 3) return reject(new Error('too many redirects'));
        const next = new URL(res.headers.location, rawUrl).toString();
        return resolve(fetchUrl(next, redirects + 1));
      }
      if (res.statusCode !== 200) return reject(new Error('HTTP ' + res.statusCode + ' ' + rawUrl));
      let data = '';
      res.setEncoding('utf8');
      res.on('data', chunk => {
        data += chunk;
        if (data.length > 10 * 1024 * 1024) req.destroy();
      });
      res.on('end', () => resolve(data));
      res.on('error', reject);
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout ' + rawUrl)); });
  });
}

// ============================================================
// 字段推断
// ============================================================
function detectCity(title) {
  return GUANGDONG_CITIES.find(c => title.includes(c)) || null;
}

function isMedical(title) {
  return MED_KEYWORDS.some(k => title.includes(k));
}

function inferCategory(title) {
  if (ENDOSCOPE_KW.some(k => title.includes(k))) return '内窥镜类';
  if (ULTRASOUND_KW.some(k => title.includes(k))) return '彩超·超声设备';
  return '其他设备';
}

function inferType(title) {
  if (/中标|成交|结果/.test(title)) return '中标结果公告';
  if (/调研|论证|需求|咨询/.test(title)) return '调研·论证公告';
  return '招标公告';
}

function inferBudget(title) {
  const m = title.match(/(\d+(?:\.\d+)?)\s*[万w]\s*元/);
  return m ? Math.round(parseFloat(m[1]) * 10000) : 0;
}

// ============================================================
// 数据源 1：中国政府采购网（ccgp.gov.cn）
// ============================================================
async function scrapeCCGP() {
  const out = [];
  const queries = ['广东 医疗设备', '广东 医疗器械', '广东 彩超', '广东 内窥镜'];
  for (const q of queries) {
    try {
      const url = 'http://search.ccgp.gov.cn/tyzbsearch/dataSearch.do?searchtype=1&page_index=1&bidType=0&kw=' + encodeURIComponent(q);
      const html = await fetchUrl(url);
      // 兼容嵌套标签：<a href="URL" ...>(嵌套标签)标题(嵌套标签)</a>...附近有日期
      const re = /<a[^>]*href="(http[^"]+)"[^>]*>([\s\S]{6,200}?)<\/a>(?:(?!<\/a>)[\s\S]){0,800}?(\d{4}-\d{2}-\d{2})/g;
      let m;
      while ((m = re.exec(html)) !== null) {
        const href = m[1];
        // 清洗标题：去掉 HTML 标签
        const title = m[2].replace(/<[^>]+>/g, '').trim();
        const date = m[3];
        const city = detectCity(title);
        if (city && isMedical(title) && title.length >= 6) {
          out.push({ title, region: city + '市', publishDate: date, sourceUrl: href });
        }
      }
    } catch (e) {
      console.warn('[ccgp] "' + q + '" 抓取失败:', e.message);
    }
  }
  return out;
}

// ============================================================
// 数据源 2：广东省政府采购网（gdgpo.czt.gd.gov.cn）
// ============================================================
async function scrapeGDGPO() {
  const out = [];
  const urls = [
    'http://gdgpo.czt.gd.gov.cn/cms-gd-government/web/list.html?type=zfcg',
    'http://gdgpo.czt.gd.gov.cn/cms-gd-government/web/index.html'
  ];
  for (const url of urls) {
    try {
      const html = await fetchUrl(url);
      const re = /<a[^>]*href="([^"]+)"[^>]*>([\s\S]{6,200}?)<\/a>(?:(?!<\/a>)[\s\S]){0,800}?(\d{4}-\d{2}-\d{2})/g;
      let m;
      while ((m = re.exec(html)) !== null) {
        const href = m[1];
        const title = m[2].replace(/<[^>]+>/g, '').trim();
        const date = m[3];
        const city = detectCity(title);
        if (city && isMedical(title)) {
          out.push({
            title,
            region: city + '市',
            publishDate: date,
            sourceUrl: href.startsWith('http') ? href : 'http://gdgpo.czt.gd.gov.cn' + href
          });
        }
      }
    } catch (e) {
      console.warn('[gdgpo] ' + url + ' 失败:', e.message);
    }
  }
  return out;
}

// ============================================================
// 数据加载与保存
// ============================================================
function loadData() {
  const c = fs.readFileSync(DATA_FILE, 'utf8');
  const m = c.match(/var\s+ANNOUNCEMENTS\s*=\s*(\[[\s\S]*?\]);/);
  if (!m) throw new Error('解析 data.js 失败');
  return JSON.parse(m[1]);
}

function saveData(announcements, date) {
  const header =
    '// 广东全省医疗设备招标信息汇总平台 — 公告数据（真实数据，定时扩充，覆盖全省 21 个地级市）\n' +
    '// 数据源：中国政府采购网(ccgp.gov.cn)、广东省政府采购网(gdgpo.czt.gd.gov.cn) 等官方源\n' +
    '// 最后更新：' + date + '\n\n' +
    "var DATA_UPDATED = '" + date + "';\n" +
    'var ANNOUNCEMENTS = ' + JSON.stringify(announcements, null, 2) + ';\n';
  fs.writeFileSync(DATA_FILE, header, 'utf8');
}

// ============================================================
// 主流程
// ============================================================
async function main() {
  const log = function () { console.log.apply(console, ['[scrape]'].concat([].slice.call(arguments))); };
  log('开始抓取广东省医疗设备招标公告');

  const existing = loadData();
  const existingUrls = new Set(existing.map(function (a) { return a.sourceUrl; }));
  log('现有 ' + existing.length + ' 条');

  let raw = [];
  try { raw = raw.concat(await scrapeCCGP()); } catch (e) { console.warn('ccgp 整体失败:', e.message); }
  try { raw = raw.concat(await scrapeGDGPO()); } catch (e) { console.warn('gdgpo 整体失败:', e.message); }

  const seen = new Set();
  const fresh = raw.filter(function (it) {
    if (!it.sourceUrl || existingUrls.has(it.sourceUrl) || seen.has(it.sourceUrl)) return false;
    seen.add(it.sourceUrl);
    return true;
  });

  if (fresh.length === 0) {
    log('无新数据');
    return;
  }

  const maxId = Math.max.apply(null, [0].concat(existing.map(function (a) { return a.id || 0; })));
  const newItems = fresh.map(function (it, i) {
    return {
      id: maxId + i + 1,
      title: it.title,
      region: it.region,
      category: inferCategory(it.title),
      type: inferType(it.title),
      budget: inferBudget(it.title),
      publishDate: it.publishDate,
      sourceUrl: it.sourceUrl
    };
  });

  const all = existing.concat(newItems);
  const today = new Date().toISOString().slice(0, 10);
  saveData(all, today);

  log('新增 ' + newItems.length + ' 条，总计 ' + all.length + ' 条');
}

main().catch(function (err) {
  console.error('[scrape] 异常:', err);
  process.exit(1);
});