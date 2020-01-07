const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

const appAliases = {
  '@app': resolveApp('src/app'),
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
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndex: resolveApp('src/app/index.js'),
  appServerIndex: resolveApp('src/server/index.js'),
}

module.exports.appAliases = appAliases
module.exports.moduleFileExtensions = moduleFileExtensions
