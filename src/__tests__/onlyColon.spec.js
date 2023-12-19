import { expect, test, describe } from 'vitest'

import { checkCommitMessages } from '../checker'
import { rulesConfig } from '../rules'

const regexOnlyColon = rulesConfig.find(rule => rule.id === 'OnlyColon')?.regex

describe('Return specific rules when the commit contain only `:` character, ignore all other cases', () => {
  test('Should generate a valid Output', () => {
    const [, log] = checkCommitMessages(`:`)
    expect(log).toMatchInlineSnapshot(`
      "
      :
      ↑
      ┆
      ╵--- Missing commit type and description.

      "
    `)
  })

  test.concurrent('Should not match', () => {
    expect('docs: Update documentation'.match(regexOnlyColon)).toBeNull()
    expect('docs!: Update documentation'.match(regexOnlyColon)).toBeNull()
    expect('docs(foo): Update documentation'.match(regexOnlyColon)).toBeNull()
    expect('docs(foo)!: Update documentation'.match(regexOnlyColon)).toBeNull()
    expect(''.match(regexOnlyColon)).toBeNull()
  })

  test.concurrent('Should match', () => {
    expect(':'.match(regexOnlyColon)?.groups?.position).toBe(':')
  })
})
