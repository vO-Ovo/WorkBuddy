// 广东全省医疗设备招标信息汇总平台 — 渲染层（导航 / 列表 / 分页 / 错误提示）
//
// 所有动态文本均经 escapeHtml 转义；卡片点击打开详情弹窗（openModal）。
// 本模块只负责「画」，数据来自 state.js 的 store.DATA，不直接发起数据请求。

import { state, store } from './state.js';
import { NAV_GROUPS, matchFilters, PAGE_SIZE } from './constants.js';
import {
  escapeHtml, setText, fmtMoney, typeBadgeClass, regionBadgeClass
} from './utils.js';
import { openModal } from './modal.js';

// ===== 筛选 + 排序 =====
export function getFiltered() {
  const kw = state.keyword.trim().toLowerCase();
  let list;
  if (kw) {
    // 全局搜索优先：忽略左侧三维筛选，直接在全量公告中检索
    list = store.DATA.filter(function (a) {
      return [a.title, a.region, a.category, a.type, a.publishDate]
        .join(' ').toLowerCase().indexOf(kw) !== -1;
    });
  } else {
    list = store.DATA.filter(function (a) { return matchFilters(a, state); });
  }
  // 发布时间倒序；空日期排最后
  list = list.slice().sort(function (a, b) {
    const da = a.publishDate || '', db = b.publishDate || '';
    if (da === db) return 0;
    if (!da) return 1;
    if (!db) return -1;
    return db.localeCompare(da);
  });
  return list;
}

// 某导航项是否命中当前状态（按维度比对对应 state 字段）
function isItemActive(item) {
  if (item.kind === 'city') return state.city === item.value;
  if (item.kind === 'category') return state.category === item.value;
  if (item.kind === 'type') return state.type === item.value;
  return false;
}

// 点击导航项时应用对应维度的筛选
function applyFilter(item) {
  if (item.kind === 'city') state.city = item.value;
  else if (item.kind === 'category') state.category = item.value;
  else if (item.kind === 'type') state.type = item.value;
}

// ===== 渲染左侧分组导航 =====
export function renderNav() {
  const nav = document.getElementById('nav');
  nav.innerHTML = '';
  NAV_GROUPS.forEach(function (group) {
    const header = document.createElement('div');
    header.className = 'px-1 pt-3 pb-1 text-[11px] font-bold tracking-wide text-sky-400';
    header.textContent = group.group;
    nav.appendChild(header);

    group.items.forEach(function (item) {
      const active = isItemActive(item);
      const btn = document.createElement('button');
      btn.className = 'shrink-0 whitespace-nowrap md:w-full md:whitespace-normal text-left px-3 py-2 rounded-lg text-sm transition ' +
        (active
          ? 'bg-sky-100 text-sky-700 font-semibold'
          : 'text-slate-600 hover:bg-sky-50');
      btn.textContent = item.label;
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      btn.addEventListener('click', function () {
        applyFilter(item);
        state.keyword = '';
        state.page = 1;
        const searchEl = document.getElementById('search');
        if (searchEl) searchEl.value = '';
        renderNav();
        renderList();
      });
      nav.appendChild(btn);
    });
  });
}

// 当前生效的筛选条件描述（元信息展示）
function describeFilters() {
  const parts = [];
  if (state.city && state.city !== '全部') parts.push('地区：' + state.city);
  if (state.category && state.category !== '全部设备') parts.push('设备：' + state.category);
  if (state.type && state.type !== '全部类型') parts.push('类型：' + state.type);
  return parts.length ? parts.join(' · ') : '全部公告';
}

// ===== 渲染公告列表 + 分页 =====
export function renderList() {
  const list = getFiltered();
  const listEl = document.getElementById('list');
  const pageEl = document.getElementById('pagination');
  const total = list.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  if (state.page > totalPages) state.page = totalPages;

  const start = (state.page - 1) * PAGE_SIZE;
  const pageItems = list.slice(start, start + PAGE_SIZE);

  // 元信息
  setText('resultMeta', '共 ' + total + ' 条');
  const meta = state.keyword.trim()
    ? '全局搜索：' + state.keyword.trim()
    : describeFilters();
  setText('activeCat', meta);

  listEl.innerHTML = '';
  if (total === 0) {
    listEl.innerHTML = '<div class="text-center text-slate-400 py-20">未找到相关公告</div>';
    pageEl.innerHTML = '';
    return;
  }

  pageItems.forEach(function (a) {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-xl border border-slate-200 px-5 py-4 cursor-pointer ' +
      'hover:border-blue-300 hover:shadow-md transition';
    card.innerHTML =
      '<div class="flex items-start justify-between gap-4">' +
        '<h3 class="text-[15px] font-semibold text-slate-800 leading-snug">' + escapeHtml(a.title) + '</h3>' +
        '<span class="shrink-0 text-xs font-medium px-2 py-1 rounded ' + typeBadgeClass(a.type) + '">' + escapeHtml(a.type) + '</span>' +
      '</div>' +
      '<div class="mt-3 flex flex-wrap items-center gap-2 text-xs">' +
        '<span class="px-2 py-0.5 rounded ' + regionBadgeClass(a.region) + '">' + escapeHtml(a.region) + '</span>' +
        '<span class="px-2 py-0.5 rounded bg-slate-100 text-slate-600">' + escapeHtml(a.category) + '</span>' +
        '<span class="ml-auto font-semibold text-rose-600">' + escapeHtml(fmtMoney(a.budget)) + '</span>' +
        '<span class="text-slate-400">' + escapeHtml(a.publishDate) + '</span>' +
      '</div>';
    card.addEventListener('click', function () { openModal(a); });
    listEl.appendChild(card);
  });

  // 分页
  pageEl.innerHTML = '';
  if (totalPages > 1) {
    pageEl.appendChild(makePageBtn('上一页', state.page - 1, state.page === 1));
    buildPageNumbers(totalPages).forEach(function (p) {
      if (p === '…') {
        const span = document.createElement('span');
        span.className = 'px-3 py-1.5 text-slate-400';
        span.textContent = '…';
        pageEl.appendChild(span);
      } else {
        pageEl.appendChild(makePageBtn(String(p), p, false, p === state.page));
      }
    });
    pageEl.appendChild(makePageBtn('下一页', state.page + 1, state.page === totalPages));
  }
}

function makePageBtn(label, targetPage, disabled, active) {
  const b = document.createElement('button');
  b.textContent = label;
  b.className = 'min-w-[36px] px-3 py-1.5 rounded-lg text-sm transition ' +
    (disabled ? 'text-slate-300 cursor-not-allowed '
    : active ? 'bg-sky-600 text-white font-semibold '
      : 'text-slate-600 hover:bg-sky-50');
  if (!disabled) {
    b.addEventListener('click', function () {
      state.page = targetPage;
      renderList();
      const listEl = document.getElementById('list');
      if (listEl) listEl.scrollTop = 0;
    });
  }
  return b;
}

// 生成页码序列（多页时折叠中间）
function buildPageNumbers(totalPages) {
  const cur = state.page;
  const pages = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (cur > 3) pages.push('…');
    const s = Math.max(2, cur - 1), e = Math.min(totalPages - 1, cur + 1);
    for (let j = s; j <= e; j++) pages.push(j);
    if (cur < totalPages - 2) pages.push('…');
    pages.push(totalPages);
  }
  return pages;
}

// 数据加载失败时的友好提示（不白屏）
export function showFatal(msg) {
  const listEl = document.getElementById('list');
  if (listEl) {
    listEl.innerHTML = '<div class="text-center text-rose-500 py-20">数据加载失败：' +
      escapeHtml(msg) + '<br>请点击「刷新」重试。</div>';
  }
}
