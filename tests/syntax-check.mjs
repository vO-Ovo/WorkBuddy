#!/usr/bin/env node
/**
 * ESM 语法校验：对 src/ 下所有 .js 模块执行 `node --check`。
 *
 * 为什么不用 `for f in src/*.js` 的 shell 循环：
 *   该脚本跨平台（Windows / macOS / Linux CI 一致），且项目声明了 "type": "module"，
 *   因此 src/*.js 会被 node 当作 ES Module 解析，import/export 语法可被正确校验。
 *
 * 退出码：0 = 全部通过；1 = 存在语法错误。
 */
import { execFileSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = join(__dirname, '..', 'src');

const files = readdirSync(srcDir)
  .filter((f) => f.endsWith('.js'))
  .sort();

if (!files.length) {
  console.error('未在 src/ 找到任何 .js 模块');
  process.exit(1);
}

let allOk = true;
console.log('\n[ESM 语法校验] ' + srcDir + '\n');
for (const f of files) {
  const p = join(srcDir, f);
  try {
    execFileSync(process.execPath, ['--check', p], { stdio: 'pipe' });
    console.log('  ✓ ' + f);
  } catch (e) {
    allOk = false;
    console.error('  ✗ ' + f + ' 语法错误');
    if (e.stdout) process.stdout.write(e.stdout.toString());
    if (e.stderr) process.stderr.write(e.stderr.toString());
  }
}

if (!allOk) {
  console.error('\nESM 语法校验未通过');
  process.exit(1);
}
console.log('\n全部通过 ✅');
process.exit(0);
