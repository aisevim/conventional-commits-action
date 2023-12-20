import { expect, test, describe } from 'vitest'

import { processCommitMessage } from '../commit-log-processor'
import { rulesConfig } from '../rules-configs'

const regexMissingType = rulesConfig.find(rule => rule.id === 'MissingType')?.regex

describe('Return specific rules when the commit contain only `:` character, ignore all other cases', () => {
  test('Should generate a valid Output', () => {
    const [, log] = processCommitMessage(`: description`, false)
    expect(log).toMatchInlineSnapshot(`
      "
      : description
      ↑
      ┆
      ╵--- Missing commit type.

      "
    `)
  })

  test.concurrent('Should not match', () => {
    expect('docs: Update documentation'.match(regexMissingType)).toBeNull()
    expect('docs!: Update documentation'.match(regexMissingType)).toBeNull()
    expect('docs(foo): Update documentation'.match(regexMissingType)).toBeNull()
    expect('docs(foo)!: Update documentation'.match(regexMissingType)).toBeNull()
    expect(''.match(regexMissingType)).toBeNull()
  })

  test.concurrent('Should match', () => {
    expect(':'.match(regexMissingType)?.groups?.position).toBe(':')
    expect('():'.match(regexMissingType)?.groups?.position).toBe(':')
  })
})
