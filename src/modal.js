// 粤东医疗设备招标信息汇总平台 — 详情弹窗（无障碍）
//
// role=dialog / aria-modal / 焦点陷阱 / 打开时暂停自动刷新。
// 焦点管理：打开时记住当前焦点元素，关闭后归还，避免键盘用户丢失位置。

import { store } from './state.js';
import { setText, escapeHtml, fmtMoney } from './utils.js';
import { pauseAutoRefresh, resumeAutoRefresh } from './autoRefresh.js';

// 弹窗内的一行信息（字段名 + 值），值经 escapeHtml 转义。
function infoRow(k, v) {
  return '<div><div class="text-xs text-slate-400 mb-0.5">' + escapeHtml(k) + '</div>' +
    '<div class="text-sm font-medium text-slate-800">' + escapeHtml(v) + '</div></div>';
}

export function openModal(a) {
  store.lastFocusedEl = document.activeElement;
  setText('modalTitle', a.title);

  const body = document.getElementById('modalBody');
  body.innerHTML =
    '<div class="grid grid-cols-2 gap-3">' +
      infoRow('所属地区', a.region) +
      infoRow('设备类别', a.category) +
      infoRow('公告类型', a.type) +
      infoRow('发布日期', a.publishDate) +
      infoRow('预算金额', fmtMoney(a.budget)) +
      infoRow('公告编号', 'YD-' + String(a.id).padStart(4, '0')) +
    '</div>' +
    '<div class="border-t border-slate-100 pt-4 leading-relaxed whitespace-pre-line text-slate-600">' +
      '本' + escapeHtml(a.type) + '由' + escapeHtml(a.region) + '相关采购单位发布，项目涉及「' + escapeHtml(a.category) + '」类设备。\n\n' +
      '预算金额：' + escapeHtml(fmtMoney(a.budget)) + '；发布日期：' + escapeHtml(a.publishDate) + '。\n\n' +
      '（以上为基础信息；完整的公告正文、投标人资格要求、联系方式与附件，请点击右下角「跳转原始公告链接」前往官方公告页查看。）' +
    '</div>';

  const link = document.getElementById('modalLink');
  link.href = a.sourceUrl;

  const modal = document.getElementById('modal');
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  document.getElementById('modalClose').focus();
  document.addEventListener('keydown', trapFocus, true);
  pauseAutoRefresh(); // 打开弹窗时暂停自动刷新，避免重渲染打断阅读
}

export function closeModal() {
  const modal = document.getElementById('modal');
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  document.removeEventListener('keydown', trapFocus, true);
  resumeAutoRefresh();
  if (store.lastFocusedEl && store.lastFocusedEl.focus) store.lastFocusedEl.focus();
}

// 焦点陷阱：Tab / Shift+Tab 在弹窗内循环，不跑到背景。
function trapFocus(e) {
  if (e.key !== 'Tab') return;
  const modal = document.getElementById('modal');
  const focusables = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (!focusables.length) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault(); last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault(); first.focus();
  }
}
