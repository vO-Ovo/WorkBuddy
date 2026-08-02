# 团队前端技术规范与提升路径

> 作者：Senior Developer（高级开发工程师）
> 适用：本团队所有前端 / 全栈成员
> 目的：把「能跑」和「能交付」之间的差距，变成一份可执行的清单与学习路径。
> 配套文件：`codereview.md`（本项目评审）、`tests/validate-data.cjs`（数据质量门禁）、`src/`（原生 ESM 业务模块，参考实现）。

---

## 一、���心原则（先记这几条）

1. **输入不可信**：用户输⼊、后端返回、自动化抓取的数据，一律视为不可信，先校验再使用。
2. **不信任任何 HTML 拼接**：动态数据进 DOM 前必须转义，或用 `textContent` / `createElement`。
3. **模块有边界**：代码要能安全地与其他代码共存（IIFE / ESM / 组件作用域）。
4. **重复即债务**：出现第二份相似逻辑时，立刻抽成函数 / 常量 / 模块。
5. **文档与测试是功能的一部分**：PR 必须同步文档；自动化产物必须有校验闸门。

---

## 二、JavaScript 编码规范（强制）

| 规则 | 做法 | 反例 |
|---|---|---|
| 作用域隔离 | 业务代码包进 IIFE / ESM，不裸写全局 `var` | `var state = {...` 顶层暴露 |
| 常量命名 | 魔法数字 / 字符串提取为 `const PAGE_SIZE = 10` | `slice(0, 10)`、`5*60*1000` 散落 |
| 防 XSS | `escapeHtml()` 或 `textContent` | `el.innerHTML = '<b>' + data + '</b>'` |
| 数据校验 | 加载 / 接口返回即校验，给安全默认值 | 直接 `a.publishDate.localeCompare(...)` |
| 去重逻辑 | 共用函数，不复制粘贴 | 刷新按钮与自动刷新各写一遍 |
| 防抖 | 搜索 / 滚动 / resize 类高频事件加防抖 | 每次 `input` 全量重渲染 |
| 错误处理 | 关键路径 `try/catch` + 友好提示 | 出错直接白屏 |
| 分类法 | 枚举集中为常量，导航 / 校验共用 | 导航写 `'彩超/超声设备'`，数据写 `'彩超·超声设备'` |

### 附：标准 `escapeHtml`
```js
function escapeHtml(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
```

---

## 三、前端安全底线（红线，违反即打回）

- 绝不把**任何外部 / 动态内容**直接拼进 `innerHTML`、`outerHTML`、`document.write`。
- `href` / `src` 中的 URL 必须白名单校验协议（`^https?:\/\/`），禁止 `javascript:`。
- 第三方 SDK / CDN 脚本要固定版本并评估来源；开发用 CDN（如 Tailwind Play CDN）**不得用于生产**。
- 表单 / 接口参数做类型与范围校验，前端校验是体验层，**不能替代后端校验**。

---

## 四、代码评审清单（每个 PR 必过）

评审人对照勾选，任一项不通过则打回：

- [ ] 是否存在动态数据拼 HTML 而未转义？（H1）
- [ ] 外部 / 自动化数据是否做了校验与兜底？（H2）
- [ ] 是否新增了全局变量 / 全局函数？（H3）
- [ ] 是否有可抽出的重复逻辑？（M1）
- [ ] 魔法数字 / 字符串是否常量化？（L1）
- [ ] 高频事件是否防抖 / 节流？（M3）
- [ ] 新增交互是否满足基本无障碍（label / aria / 键盘可达）？（M5）
- [ ] 是否同步更新了相关文档 / README？（L2）
- [ ] 自动化写入的数据是否过了 `tests/validate-data.cjs` 门禁？（L3）
- [ ] 是否引入了生产环境不该用的 dev-only 依赖？（M4）

---

## 五、数据质量门禁（立即落地）

本仓库提供 `tests/validate-data.cjs`，校验 `data.js` 的：id 唯一、标题非空、region/type 枚举合法、budget 为非负数字、publishDate 为 `YYYY-MM-DD`、sourceUrl 为 http(s)。

```bash
# 本地校验
node tests/validate-data.cjs

# 接入 Git pre-commit（示例，.git/hooks/pre-commit）
node tests/validate-data.cjs || exit 1

# 接入 CI（失败即阻断合并）
- run: node tests/validate-data.cjs
```

> 定时自动化在写入 `data.js` 后、**重新部署前**，必须跑一次该校验；不通过则告警并中止发布。

---

## 六、Definition of Done（完成定义）

一条需求算「做完」，当且仅当：
1. 功能实现并通过自测；
2. 通过 `tests/validate-data.js`（若涉及数据）；
3. 代码通过第四节评审清单；
4. 相关文档 / README 已同步；
5. 无障碍与基础安全已自查；
6. 已提交 PR 并由至少一名同事评审通过。

---

## 七、团队技术提升学习路径

按阶段推进，每阶段给出「学什么 + 怎么练」：

**阶段 1 · 夯实基础（1–2 周）**
- 作用域 / 闭包 / 原型 / 事件循环；`const`/`let` vs `var`；ESModule。
- 练习：以本项目的 `src/` ESM 模块为范例，尝试把任一业务逻辑再拆出独立模块（如数据解析 / 渲染 / 校验）。

**阶段 2 · 安全与健壮性（2–3 周）**
- XSS / CSRF 原理与防御；输入校验；错误处理；防御性编程。
- 练习：给团队现有项目做一次安全扫描，列出所有 `innerHTML` 拼接点并修复。

**阶段 3 · 可测试性（3–4 周）**
- 单元测试（Vitest / Jest）、纯函数抽取、测试金字塔。
- 练习：为 `getFiltered` / `normalizeData` 这类纯逻辑补单测。

**阶段 4 · 代码评审文化（持续）**
- 建立 PR 评审机制；每人每周至少评审 1 个他人 PR。
- 练习：用本仓库的「评审清单」互相评审，记录共性问题。

**阶段 5 · 架构与工程化（1–2 月）**
- 构建工具（Vite / Tailwind 生产构建）、CI/CD、组件化、状态管理。
- 练习：把 Tailwind CDN 替换为生产构建产物，接入 CI 自动构建与部署。

---

## 八、本周可立即落地的 5 件事

1. **全员过一遍 `codereview.md`**，对照本项目找自己代码里的同类问题。
2. **挂上数据门禁**：`node tests/validate-data.cjs` 接入 pre-commit 与定时任务。
3. **建立 Git 仓库 + PR 评审**，用第四节清单作为评审模板。
4. **修一处 XSS / 兜底**：拿本项目 `src/utils.js` 的 `escapeHtml` 与 `src/data.js` 的 `normalizeData` 作范例。
5. **排期去掉 Tailwind CDN**：列入下个迭代的工程化待办（M4）。

---

> 技术提升不是「学更多框架」，而是**把这几条底线变成肌肉记忆**。坚持一个季度，团队代码质量会有质的变化。
