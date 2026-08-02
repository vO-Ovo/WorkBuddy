// 粤东医疗设备招标信息汇总平台 — 搜索交互
//
// 搜索输入实时、全局优先；用防抖合并高频输入，避免每次按键全量重渲染。

import { state } from './state.js';
import { SEARCH_DEBOUNCE_MS } from './constants.js';
import { renderList } from './render.js';

export function setupSearch() {
  const searchEl = document.getElementById('search');
  if (!searchEl) return;
  let timer = null;
  searchEl.addEventListener('input', function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      state.keyword = searchEl.value;
      state.page = 1;
      renderList();
    }, SEARCH_DEBOUNCE_MS);
  });
}
