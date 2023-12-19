import { expect, test, describe } from 'vitest'

import { rulesConfig } from '../rules'

const regexEmptyCommit = rulesConfig.find(rule => rule.id === 'EmptyCommit')?.regex

describe.concurrent('Empty Commit', () => {
  test.concurrent('not', () => {
    expect('docs: Update documentation'.match(regexEmptyCommit)).toBeNull()
    expect('docs!: Update documentation'.match(regexEmptyCommit)).toBeNull()
    expect('docs(foo): Update documentation'.match(regexEmptyCommit)).toBeNull()
    expect('docs(foo)!: Update documentation'.match(regexEmptyCommit)).toBeNull()
    expect(' '.match(regexEmptyCommit)).toBeNull()
  })

  test.concurrent('match', () => {
    expect(''.match(regexEmptyCommit)?.groups?.position).toBe('')
  })
})
