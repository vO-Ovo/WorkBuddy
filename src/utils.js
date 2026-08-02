// 广东全省医疗设备招标信息汇总平台 — 通用工具函数
//
// 纯功能、无副作用、不依赖 DOM 之外的状态，便于复用与（未来）单元测试。

// 五字符转义，杜绝 XSS 与渲染错乱。任何动态文本进 innerHTML 前必须过这一关。
export function escapeHtml(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// 安全地设置元素文本（找不到元素静默跳过）。优先用 textContent，永不用 innerHTML 承载动态值。
export function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

// 预算金额格式化；调研类未披露预算时传 0，界面显示「—」。
export function fmtMoney(n) {
  if (!n) return '—';
  return '¥' + Number(n).toLocaleString('zh-CN');
}

// 公告类型 → 徽章配色
export function typeBadgeClass(type) {
  if (type === '招标公告') return 'bg-sky-100 text-sky-700';
  if (type === '中标结果公告') return 'bg-teal-100 text-teal-700';
  return 'bg-amber-100 text-amber-700';
}

// 所属地区 → 徽章配色（按四大片区区分色系，覆盖全省 21 市）
import { CITY_TO_MACRO } from './constants.js';

const MACRO_BADGE_COLORS = {
  '珠三角': 'bg-blue-100 text-blue-700',
  '粤东':   'bg-cyan-100 text-cyan-700',
  '粤西':   'bg-violet-100 text-violet-700',
  '粤北':   'bg-emerald-100 text-emerald-700'
};

export function regionBadgeClass(region) {
  const macro = CITY_TO_MACRO[region];
  return macro ? MACRO_BADGE_COLORS[macro] : 'bg-slate-100 text-slate-600';
}

// 发布日期格式（YYYY-MM-DD）—— 校验与兜底共用
export const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

// 简易防抖：高频事件（搜索输入等）合并触发，避免每次按键全量重渲染。
export function debounce(fn, ms) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}
