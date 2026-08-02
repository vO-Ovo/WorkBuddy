// 粤东医疗设备招标信息汇总平台 — 应用入口（装配各模块）
//
// 仅负责「接线」：初始化数据、渲染、绑定交互、启动自动刷新。
// 业务细节分散在对应模块，本文件保持薄。

import { state } from './state.js';
import { refreshDataFromGlobals, loadData } from './data.js';
import { renderNav, renderList, showFatal } from './render.js';
import { setupSearch } from './search.js';
import { closeModal } from './modal.js';
import { startAutoRefresh } from './autoRefresh.js';

// 统一的数据重载 + 重渲染（手动刷新 / 自动刷新共用）
async function reloadAndRender() {
  const ok = await loadData();
  if (ok) {
    state.page = 1;
    renderNav();
    renderList();
  } else {
    showFatal('数据加载失败，请稍后重试');
  }
}

function init() {
  // 首屏数据必须可用，否则后续绑定无意义
  try {
    refreshDataFromGlobals();
  } catch (e) {
    showFatal(e.message);
    return;
  }

  renderNav();
  renderList();
  setupSearch();

  // 刷新按钮：重新拉取最新数据文件
  const refreshBtn = document.getElementById('refreshBtn');
  if (refreshBtn) {
    refreshBtn.dataset.label = refreshBtn.innerHTML;
    refreshBtn.addEventListener('click', async function () {
      refreshBtn.disabled = true;
      refreshBtn.innerHTML = '刷新中…';
      await reloadAndRender();
      refreshBtn.disabled = false;
      refreshBtn.innerHTML = refreshBtn.dataset.label;
    });
  }

  // 自动刷新（弹窗打开期间由 modal 层暂停）
  startAutoRefresh(reloadAndRender);

  // 弹窗关闭：按钮 / 点击遮罩 / Esc
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalBackdrop').addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
