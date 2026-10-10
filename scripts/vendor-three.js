import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const buildDirectory = dirname(require.resolve('three'));
const packageDirectory = resolve(buildDirectory, '..');
const vendorDirectory = join(dirname(fileURLToPath(import.meta.url)), '..', 'vendor');

mkdirSync(vendorDirectory, { recursive: true });
copyFileSync(join(buildDirectory, 'three.module.js'), join(vendorDirectory, 'three.module.js'));
copyFileSync(join(buildDirectory, 'three.core.js'), join(vendorDirectory, 'three.core.js'));
copyFileSync(join(packageDirectory, 'LICENSE'), join(vendorDirectory, 'THREE-LICENSE.txt'));