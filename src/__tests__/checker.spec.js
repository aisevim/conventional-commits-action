import { expect, test, describe } from 'vitest'

import { checkCommitMessages } from '../checker'

describe.concurrent('Generated Logs', () => {
  test.concurrent('1 match on no description', () => {
    const [, log] = checkCommitMessages(`docs : Update documentation`)
    expect(log).toMatchSnapshot()
  })

  test.concurrent('2 match on no description', () => {
    const [, log] = checkCommitMessages(`docs(): `)
    expect(log).toMatchSnapshot()
  })

  test.concurrent('3 match on no description', () => {
    const [, log] = checkCommitMessages(`docs() : `)
    expect(log).toMatchSnapshot()
  })

  test.concurrent('4 match on no description', () => {
    const [, log] = checkCommitMessages(`docs () : `)
    expect(log).toMatchSnapshot()
  })

  test.concurrent('5 match on no description', () => {
    const [, log] = checkCommitMessages(`docs () :`)
    expect(log).toMatchSnapshot()
  })

  test.concurrent('colon missing', () => {
    const [, log] = checkCommitMessages(`Update documentation`)
    expect(log).toMatchSnapshot()
  })

  test.concurrent('space before', () => {
    const [, log] = checkCommitMessages(` docs: Update documentation`)
    expect(log).toMatchSnapshot()

    const [, log2] = checkCommitMessages(` docs:`)
    expect(log2).toMatchSnapshot()
  })
})

describe.concurrent('Has Errors', () => {
  test.concurrent('return true on error', () => {
    const [hasError] = checkCommitMessages(`docs: `)
    expect(hasError).toBeTruthy()

    const [hasError2] = checkCommitMessages(``)
    expect(hasError2).toBeTruthy()
  })

  test.concurrent('return false on valid', () => {
    const [hasError] = checkCommitMessages(`docs: fooo`)
    expect(hasError).toBeFalsy()
  })
})
