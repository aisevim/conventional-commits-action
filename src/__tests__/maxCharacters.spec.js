import { expect, test, describe } from 'vitest'

import { processCommitMessage } from '../commit-log-processor'
import { rulesConfig } from '../rules-configs'

const regexMaxCharacters = rulesConfig.find(rule => rule.id === 'MaxCharacters')?.regex

describe('The commit message summary be no longer than 50 characters.', () => {
  test('Should generate a valid Output, with the arrow centered on the invalid characters', () => {
    const [, log] = processCommitMessage(`feat: Update documentation with a very long commit message that will be invalid`, false)
    expect(log).toMatchInlineSnapshot(`
      "
      feat: Update documentation with a very long commit message that will be invalid
                                                                      ↑
                                                                      ┆
                                                                      ╵--- Commit summary must be under 50 characters.

      "
    `)
  })

  test.concurrent('Should not match, when the text have 50 characters', () => {
    expect('Have 50 characters in this text, Have 50 character'.match(regexMaxCharacters)?.groups?.position).toBeUndefined()
  })

  test.concurrent('Should match, when the text have 51 characters', () => {
    expect('Have 51 characters in this text, Have 51 character_'.match(regexMaxCharacters)?.groups?.position).toBe('_')
  })
})
