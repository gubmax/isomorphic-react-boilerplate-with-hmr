const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

const appAliases = {
  '@components': resolveApp('src/client/components'),
  '@hooks': resolveApp('src/client/hooks'),
  '@utils': resolveApp('src/utils'),
  '@config': resolveApp('config'),
}

const moduleFileExtensions = [
  '.web.mjs',
  '.mjs',
  '.web.js',
  '.js',
  '.web.ts',
  '.ts',
  '.web.tsx',
  '.tsx',
  '.json',
  '.web.jsx',
  '.jsx',
]

module.exports = {
  appPath: resolveApp('.'),
  appDist: resolveApp('dist'),
  appSrc: resolveApp('src'),
  appServerDist: resolveApp('dist/server'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appClientIndex: resolveApp('src/client/index.js'),
  appServerIndex: resolveApp('src/server/index.js'),
}

module.exports.appAliases = appAliases
module.exports.moduleFileExtensions = moduleFileExtensions
