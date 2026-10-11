// Lists every {{TODO: ...}} placeholder left in src/, with file and line.
// Templates (files starting with "_") are skipped.
import { readdir, readFile } from 'node:fs/promises';
import { basename, join, relative } from 'node:path';

const root = join(import.meta.dirname, '..');
const TODO = /\{\{TODO:[^}]*\}\}/g;
let count = 0;

const files = (await readdir(join(root, 'src'), { recursive: true, withFileTypes: true }))
  .filter((entry) => entry.isFile() && !basename(entry.name).startsWith('_'))
  .map((entry) => join(entry.parentPath, entry.name))
  .sort();

for (const file of files) {
  const lines = (await readFile(file, 'utf8')).split('\n');
  lines.forEach((line, i) => {
    for (const [todo] of line.matchAll(TODO)) {
      console.log(`${relative(root, file).replaceAll('\\', '/')}:${i + 1}  ${todo}`);
      count++;
    }
  });
}

console.log(`\n${count} placeholder${count === 1 ? '' : 's'} left.`);
