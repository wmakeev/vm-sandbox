'use strict'

const vm = require('vm')

const RUN_OPTIONS = { timeout: 5000, displayErrors: false }

const CONTEXT_OPTIONS = {
  /** @type {'afterEvaluate'} */
  microtaskMode: 'afterEvaluate'
}

const USE_STRICT_REGEX = /^(\s+)?["']use strict/gm

const USE_STRICT = "'use strict';\n"

const EMPTY_CONTEXT = vm.createContext(Object.freeze({}))

const COMMON_CONTEXT = vm.createContext(
  Object.freeze({
    Buffer,
    URL,
    URLSearchParams,
    TextDecoder,
    TextEncoder,
    console,
    queueMicrotask,
    setTimeout,
    setImmediate,
    setInterval,
    clearTimeout,
    clearImmediate,
    clearInterval
  })
)

/**
 * Create vm context
 * @param {vm.Context?} context
 * @param {boolean} preventEscape
 */
const createContext = (context = null, preventEscape = false) => {
  if (context === null) return EMPTY_CONTEXT
  return vm.createContext(context, preventEscape ? CONTEXT_OPTIONS : {})
}

class VmSandbox {
  /**
   * Create sandbox
   * @param {string} name Script file name
   * @param {string} src Script source
   * @param {{ context?: vm.Context }} options
   */
  constructor(name, src, options = {}) {
    const isStrict = USE_STRICT_REGEX.test(src)

    const code = (!isStrict ? USE_STRICT : '') + src

    const lineOffset = isStrict ? 0 : -1

    this.name = name

    const scriptOptions = { filename: name, ...options, lineOffset }

    this.script = new vm.Script(code, scriptOptions)

    this.context = options.context
      ? createContext(options.context)
      : createContext()

    this.exports = this.script.runInContext(this.context, RUN_OPTIONS)
  }
}

/**
 * Create sandbox
 * @param {string} name
 * @param {string} src
 * @param {{ context?: vm.Context }} options
 * @returns
 */
const createScript = (name, src, options = {}) =>
  new VmSandbox(name, src, options)

module.exports = {
  createContext,
  VmSandbox,
  createScript,
  EMPTY_CONTEXT,
  COMMON_CONTEXT
}
