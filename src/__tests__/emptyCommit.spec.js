import { expect, test, describe } from 'vitest'

import { checkCommitMessages } from '../checker'
import { rulesConfig } from '../rules'

const regexEmptyCommit = rulesConfig.find(rule => rule.id === 'EmptyCommit')?.regex

describe('The commit is required', () => {
  test('Should generate a valid Output, the arrow is positioned on beggining', () => {
    const [, log] = checkCommitMessages(``)
    expect(log).toMatchInlineSnapshot(`
      "

      ↑
      ┆
      ╵--- Empty commit message.

      "
    `)
  })

  test.concurrent('Should not match', () => {
    expect('docs: Update documentation'.match(regexEmptyCommit)).toBeNull()
    expect('docs!: Update documentation'.match(regexEmptyCommit)).toBeNull()
    expect('docs(foo): Update documentation'.match(regexEmptyCommit)).toBeNull()
    expect('docs(foo)!: Update documentation'.match(regexEmptyCommit)).toBeNull()
    expect(' '.match(regexEmptyCommit)).toBeNull()
  })

  test.concurrent('Should match', () => {
    expect(''.match(regexEmptyCommit)?.groups?.position).toBe('')
  })
})
