import * as path from 'node:path'

import { dependencies, name } from '../package.json'

const ignoredExternals = new Set([
  '@actions/workflow-parser',
  '@actions/languageserver',
])

await Bun.build({
  entrypoints: [path.join(import.meta.dir, '../index.js')],
  target: 'node',
  minify: true,
  format: 'cjs',
  outdir: path.join(import.meta.dir, '../bin/'),
  naming: name,
  external: Object.keys(dependencies).filter((x) => !ignoredExternals.has(x)),
})
