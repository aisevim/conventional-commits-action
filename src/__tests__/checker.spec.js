import { expect, test, describe } from 'vitest'

import { checkCommitMessages } from '../checker'

describe('Generated Logs with multiple errors', () => {
  test('Should have 2 errors', () => {
    const [, log] = checkCommitMessages(`docs(): `)
    expect(log).toMatchInlineSnapshot(`
      "
      docs(): 
           ↑ ↑
           ┆ ┆
           ┆ ╵--- Missing or empty commit description.
           ┆
           ╵--- Empty commit scope provided.

      "
    `)
  })

  test('Should have 3 errors', () => {
    const [, log] = checkCommitMessages(`docs() : `)
    expect(log).toMatchInlineSnapshot(`
      "
      docs() : 
           ↑↑ ↑
           ┆┆ ┆
           ┆┆ ╵--- Missing or empty commit description.
           ┆┆
           ┆╵--- Unexpected character before the colon in the commit message.
           ┆
           ╵--- Empty commit scope provided.

      "
    `)
  })

  test('Should have 4 errors', () => {
    const [, log] = checkCommitMessages(`docs () : `)
    expect(log).toMatchInlineSnapshot(`
      "
      docs () : 
          ↑ ↑↑ ↑
          ┆ ┆┆ ┆
          ┆ ┆┆ ╵--- Missing or empty commit description.
          ┆ ┆┆
          ┆ ┆╵--- Unexpected character before the colon in the commit message.
          ┆ ┆
          ┆ ╵--- Empty commit scope provided.
          ┆
          ╵--- Unexpected character between commit type and scope.

      "
    `)
  })

  test('Should return 5 errors', () => {
    const [, log] = checkCommitMessages(`docs () :`)
    expect(log).toMatchInlineSnapshot(`
      "
      docs () :
          ↑ ↑↑ ↑
          ┆ ┆┆ ┆
          ┆ ┆┆ ┆--- Missing or empty commit description.
          ┆ ┆┆ ┆
          ┆ ┆┆ ╵--- Space after the colon is required.
          ┆ ┆┆
          ┆ ┆╵--- Unexpected character before the colon in the commit message.
          ┆ ┆
          ┆ ╵--- Empty commit scope provided.
          ┆
          ╵--- Unexpected character between commit type and scope.

      "
    `)
  })
})

describe.concurrent('Return programticly boolean to know de commit validation', () => {
  test.concurrent('Should return `true` when commit is invalid', () => {
    const [hasError] = checkCommitMessages(`docs: `)
    expect(hasError).toBeTruthy()

    const [hasError2] = checkCommitMessages(``)
    expect(hasError2).toBeTruthy()
  })

  test.concurrent('Should return `false` when commit is valid', () => {
    const [hasError] = checkCommitMessages(`docs: fooo`)
    expect(hasError).toBeFalsy()
  })
})
