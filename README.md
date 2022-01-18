# vm-sandbox

[![npm](https://img.shields.io/npm/v/@wmakeev/vm-sandbox.svg?maxAge=1800&style=flat-square)](https://www.npmjs.com/package/@wmakeev/vm-sandbox)

> JavaScript code sandbox based on node.js `vm` module. Use for better testing and code isolation.

Inspired by [metavm](https://github.com/metarhia/metavm)

## Install

```bash
npm install @wmakeev/vm-sandbox
```

## Using

```js
const src = `
  const { mult, round } = api

  const radius = 12

  const s = round(mult(mult(2, PI), radius))

  s
`

const script = createScript('myScript', src, {
  context: {
    api: {
      mult: (a, b) => a * b,
      round: Math.round
    },
    PI: Math.PI
  }
})

console.log(script.exports) // 75
```
