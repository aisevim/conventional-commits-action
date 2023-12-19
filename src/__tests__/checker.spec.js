import { expect, test, describe } from 'vitest'

import { checkCommitMessages } from '../checker'

describe('Generated Logs with only 1 error, focus on priorization', () => {
  test('Should have only 1 error and ignore others when a 1 or more characters is asigned without colon', () => {
    const [, log] = checkCommitMessages(`docs`)
    expect(log).toMatchInlineSnapshot(`
      "
      docs
          ↑
          ┆
          ╵--- Colon is missing in the commit message structure.

      "
    `)
  })

  test('Should have only 1 error and ignore others, colon priorized', () => {
    const [, log] = checkCommitMessages(` docs `)
    expect(log).toMatchInlineSnapshot(`
      "
       docs 
            ↑
            ┆
            ╵--- Colon is missing in the commit message structure.

      "
    `)
  })
})


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

describe('Generate Logs with colors/style', () => {
  test('Should return 5 errors in colors', () => {
    const [, log] = checkCommitMessages(`docs () :`, 1)
    expect(log).toMatchInlineSnapshot(`
      "
      docs[2m[3m[4m[36m [39m[24m[23m[22m[2m[3m[4m[35m([39m[24m[23m[22m[2m[3m[4m[35m)[39m[24m[23m[22m[2m[3m[4m[33m [39m[24m[23m[22m:
          [36m↑[39m [35m↑[39m[33m↑[39m [37m↑[39m
          [36m┆[39m [35m┆[39m[33m┆[39m [37m┆[39m
          [36m┆[39m [35m┆[39m[33m┆[39m [37m┆[39m[37m-[39m[37m-[39m[37m-[39m [37mMissing or empty commit description.[39m
          [36m┆[39m [35m┆[39m[33m┆[39m [37m┆[39m
          [36m┆[39m [35m┆[39m[33m┆[39m [37m╵[39m[37m-[39m[37m-[39m[37m-[39m [37mSpace after the colon is required.[39m
          [36m┆[39m [35m┆[39m[33m┆[39m
          [36m┆[39m [35m┆[39m[33m╵[39m[33m-[39m[33m-[39m[33m-[39m [33mUnexpected character before the colon in the commit message.[39m
          [36m┆[39m [35m┆[39m
          [36m┆[39m [35m╵[39m[35m-[39m[35m-[39m[35m-[39m [35mEmpty commit scope provided.[39m
          [36m┆[39m
          [36m╵[39m[36m-[39m[36m-[39m[36m-[39m [36mUnexpected character between commit type and scope.[39m

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
