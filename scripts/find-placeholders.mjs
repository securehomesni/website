#!/usr/bin/env node
/**
 * Lists every placeholder still in the project, so nothing ships by accident.
 * Run: npm run placeholders
 *
 * It finds:
 *  - lines containing "PLACEHOLDER" (comments in code, config and content)
 *  - content files with `placeholder: true` in their frontmatter
 *  - bracketed copy such as [Business name] in Markdown and Astro files
 */
import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const dirs = ['src', 'public', 'functions', 'astro.config.mjs'];
const exts = /\.(astro|ts|mjs|md|mdx|svg|css)$/;
const bracketed = /\[(?!\s*\]|x\]|\^)[A-Z0-9£][^\]\n]{1,60}\](?!\()/; // [Copy like this], not [links](...)

async function* walk(path) {
  let entries;
  try {
    entries = await readdir(path, { withFileTypes: true });
  } catch {
    yield path; // a single file
    return;
  }
  for (const e of entries) {
    if (e.name === 'node_modules' || e.name.startsWith('.')) continue;
    const full = join(path, e.name);
    if (e.isDirectory()) yield* walk(full);
    else yield full;
  }
}

let total = 0;
for (const dir of dirs) {
  for await (const file of walk(join(root, dir))) {
    if (!exts.test(file) || file.endsWith('find-placeholders.mjs')) continue;
    const lines = (await readFile(file, 'utf8')).split('\n');
    const hits = [];
    lines.forEach((line, i) => {
      if (/PLACEHOLDER|placeholder:\s*true/.test(line) || (/\.(md|astro)$/.test(file) && bracketed.test(line))) {
        hits.push(`  ${String(i + 1).padStart(4)}  ${line.trim().slice(0, 110)}`);
      }
    });
    if (hits.length) {
      total += hits.length;
      console.log(`\n${relative(root, file)}`);
      console.log(hits.join('\n'));
    }
  }
}

console.log(total ? `\n${total} placeholder line(s) found.` : '\nNo placeholders left. Ready to launch.');
