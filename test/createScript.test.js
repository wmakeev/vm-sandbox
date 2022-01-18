'use strict'

const test = require('tape')
const { createScript } = require('../src')

test('createScript #1', t => {
  const src = `
    const { mult, round } = api

    const radius = 12

    const s = round(mult(mult(2, PI), radius))

    s
  `

  const script = createScript('script', src, {
    context: {
      api: {
        // @ts-expect-error should be numbers
        mult: (a, b) => a * b,
        round: Math.round
      },
      PI: Math.PI
    }
  })

  t.equals(script.exports, 75)

  t.end()
})
