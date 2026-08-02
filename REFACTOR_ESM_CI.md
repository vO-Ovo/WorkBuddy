# ESM 模块化拆分 + 最小 CI 落地概览

> 作者：Senior Developer（高级开发工程师）
> 对应需求：将 `js/app.js` 拆成原生 ESM 模块，并搭建最小 CI（自动跑数据门禁 + 语法校验）。

## 一、做了什么

### 1. 代码从 IIFE 单文件 → 原生 ESM 多模块
原 `js/app.js`（约 430 行 IIFE）按职责拆分为 `src/` 下 9 个 ES Module：

| 模块 | 职责 |
|---|---|
| `src/constants.js` | 命名常量 + 分类法（单一事实来源）：`PAGE_SIZE`、`SEARCH_DEBOUNCE_MS`、`AUTO_REFRESH_MS`、`REGIONS`、`TYPES`、`CATEGORIES`、`categoryMatch` |
| `src/utils.js` | 纯函数：`escapeHtml`、`setText`、`fmtMoney`、`typeBadgeClass`、`regionBadgeClass`、`DATE_RE`、`debounce` |
| `src/state.js` | 共享运行时状态（模块单例）：`state`（筛选态）、`store`（数据 + 焦点记录） |
| `src/data.js` | 数据桥接层 + 校验归一化：`normalizeData`、`refreshDataFromGlobals`、`loadData` |
| `src/autoRefresh.js` | 自动刷新控制：`startAutoRefresh` / `pause` / `resume` |
| `src/modal.js` | 详情弹窗（无障碍焦点陷阱、打开暂停自动刷新） |
| `src/render.js` | 导航 / 列表 / 分页渲染 + `showFatal` |
| `src/search.js` | 搜索交互（防抖） |
| `src/main.js` | 应用入口，薄装配层 |

**关键设计**：共享状态收敛到 `state.js` 模块单例，不再把变量挂到 `window`（消除全局污染 H3）。`js/data.js` 仍由定时任务以经典 `<script>` 注入 `window.ANNOUNCEMENTS`，`src/data.js` 作为桥接层读取——自动化写入格式不变。

### 2. 入口与文档切换
- `index.html`：`<script src="js/app.js">` → `<script type="module" src="src/main.js">`
- 删除遗留 `js/app.js`
- `README.md`：运行方式改为「需起静态服务」；目录结构、门禁引用同步更新
- `TEAM_STANDARDS.md`：门禁脚本与参考实现引用同步

### 3. 工程化 + 最小 CI
- `package.json`：`"type": "module"` + `scripts`（`test` / `check` / `serve`）
- `tests/validate-data.cjs`：原门禁逻辑不变，改 `.cjs` 明确 CommonJS（兼容 type:module）
- `tests/syntax-check.mjs`：跨平台对所有 `src/*.js` 跑 `node --check`
- `.github/workflows/ci.yml`：ubuntu + node 20，依次跑「数据质量门禁」与「ESM 语法校验」，失败即阻断合并

## 二、验证结果（全绿）
- 数据门禁：`node tests/validate-data.cjs` → 57 条全部通过 ✅
- ESM 语法：`node tests/syntax-check.mjs` → 9 个模块全部通过 ✅
- **模块装配冒烟测试**：用最小 DOM/window 桩实际 `import` 整图并执行 `init()` 无异常 ✅

> 冒烟测试当场抓到一个真实跨模块 bug：`src/data.js` 误从 `./constants.js` 导入 `DATE_RE`（实际定义在 `./utils.js`），ESM 装配报 `does not provide an export named 'DATE_RE'`，已修正。这印证了「`node --check` 只查语法、不查跨模块引用，必须实际 import 跑一遍」。

## 三、重要权衡（请团队知悉）
- **ESM 牺牲了「双击打开」**：原生 ES Module 需经 http(s) 加载，`file://` 双击会因 CORS 失败。本地预览请起服务：
  ```bash
  python3 -m http.server 8080   # 然后开 http://localhost:8080
  # 或：npm run serve
  ```
- **对外分享链接不受影响**：`*.sandbox.cloudstudio.club` 本身是 http，直接打开即可。
- **回退方案（未执行，仅说明）**：若日后必须恢复「双击打开」，可改回多文件 classic IIFE（每个文件包一层 IIFE），代价是失去 ESM 的静态依赖清晰度。

## 四、后续建议（团队提升）
1. 把 `.github/workflows/ci.yml` 接入仓库的 PR 保护规则，门禁不通过不允许合并。
2. 本地加 Git pre-commit 钩子跑 `node tests/validate-data.cjs`，脏数据不入库。
3. 下一步工程化：引入 Vite + Tailwind 生产构建，替换 Tailwind Play CDN（M4 红线），CI 再串一步构建。
