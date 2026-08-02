// 粤东医疗设备招标信息汇总平台 — 自动刷新控制
//
// 页面每 AUTO_REFRESH_MS 重新拉取一次最新数据。为避免在弹窗阅读时被打断，
// 由 modal 层在打开/关闭时调用 pause/resume 暂停与恢复。

import { AUTO_REFRESH_MS } from './constants.js';
import { loadData } from './data.js';

let autoRefreshTimer = null;

// 注册自动刷新回调（通常在 main.js 初始化时调用一次）。
export function startAutoRefresh(tick) {
  if (autoRefreshTimer) return;
  autoRefreshTimer = setInterval(tick, AUTO_REFRESH_MS);
}

// 暂停自动刷新（打开详情弹窗时调用）。
export function pauseAutoRefresh() {
  if (autoRefreshTimer) {
    clearInterval(autoRefreshTimer);
    autoRefreshTimer = null;
  }
}

// 恢复自动刷新（关闭详情弹窗时调用）。
export function resumeAutoRefresh() {
  if (!autoRefreshTimer) {
    autoRefreshTimer = setInterval(() => { loadData(); }, AUTO_REFRESH_MS);
  }
}
