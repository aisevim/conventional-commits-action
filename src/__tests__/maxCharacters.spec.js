import { expect, test, describe } from 'vitest'

import { checkCommitMessages } from '../checker'
import { rulesConfig } from '../rules'

const regexMaxCharacters = rulesConfig.find(rule => rule.id === 'MaxCharacters')?.regex

describe('The commit message summary be no longer than 50 characters.', () => {
  test('Should generate a valid Output, with the arrow centered on the invalid characters', () => {
    const [, log] = checkCommitMessages(`feat: Update documentation with a very long commit message that will be invalid`)
    expect(log).toMatchInlineSnapshot(`
      "
      feat: Update documentation with a very long commit message that will be invalid
                                                                      ↑
                                                                      ┆
                                                                      ╵--- The commit message summary be no longer than 50 characters.

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
