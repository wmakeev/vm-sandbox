'use strict'

const fs = require('fs')
const path = require('path')
const vm = require('./vm.js')

/**
 *
 * @param {string} filePath
 * @param {{ context?: import("vm").Context | undefined; filename?: string } | undefined} options
 * @returns
 */
const readScriptSync = (filePath, options) => {
  const src = fs.readFileSync(filePath, 'utf8')

  if (src === '') throw new SyntaxError(`File ${filePath} is empty`)

  const name =
    options && options.filename
      ? options.filename
      : path.basename(filePath, '.js')

  const script = new vm.VmSandbox(name, src, options)

  return script
}

module.exports = { readScriptSync }
