import { expect, test, describe } from 'vitest'

import { processCommitMessage } from '../commit-log-processor'
import { rulesConfig } from '../rules-configs'

const regexCharacterBetweenTypeAndColon = rulesConfig.find(rule => rule.id === 'CharacterBetweenTypeAndColon')?.regex

describe('No Characters between type and color', () => {
  test('Should generate a valid Output, with the arrow centered on the invalid characters', () => {
    const [, log] = processCommitMessage(`feat asd    : some feat`, false)
    expect(log).toMatchInlineSnapshot(`
      "
      feat asd    : some feat
              ↑
              ┆
              ╵--- Unexpected character between commit type and colon.

      "
    `)
  })

  describe.concurrent('Some cases are deliberately ignored to anticipate a possible problem in the rendering.', () => {
    test.concurrent('Should not match', () => {
      // Deliberately ignored
      expect(' feat asd    : some feat'.match(regexCharacterBetweenTypeAndColon)?.groups?.position).toBeUndefined()
      expect(' : some feat'.match(regexCharacterBetweenTypeAndColon)?.groups?.position).toBeUndefined()

      // Need to be ignored
      expect('Update documentation'.match(regexCharacterBetweenTypeAndColon)?.groups?.position).toBeUndefined()
      expect('docs documentation'.match(regexCharacterBetweenTypeAndColon)?.groups?.position).toBeUndefined()
      expect('docs() documentation'.match(regexCharacterBetweenTypeAndColon)?.groups?.position).toBeUndefined()
      expect('docs(foo) documentation'.match(regexCharacterBetweenTypeAndColon)?.groups?.position).toBeUndefined()
      expect('docs () documentation'.match(regexCharacterBetweenTypeAndColon)?.groups?.position).toBeUndefined()
      expect('docs (foo) documentation'.match(regexCharacterBetweenTypeAndColon)?.groups?.position).toBeUndefined()

      expect('docs: Update documentation'.match(regexCharacterBetweenTypeAndColon)?.groups?.position).toBeUndefined()
      expect('docs!: Update documentation'.match(regexCharacterBetweenTypeAndColon)?.groups?.position).toBeUndefined()
      expect('docs(foo): Update documentation'.match(regexCharacterBetweenTypeAndColon)?.groups?.position).toBeUndefined()
      expect('docs(foo)!: Update documentation'.match(regexCharacterBetweenTypeAndColon)?.groups?.position).toBeUndefined()
      expect('docs(): Update documentation'.match(regexCharacterBetweenTypeAndColon)?.groups?.position).toBeUndefined()
      expect('docs()!: Update documentation'.match(regexCharacterBetweenTypeAndColon)?.groups?.position).toBeUndefined()

      expect(''.match(regexCharacterBetweenTypeAndColon)?.groups?.position).toBeUndefined()
    })
  })

  test.concurrent('Get the unexpected characters', () => {
    expect('docs : Update documentation'.match(regexCharacterBetweenTypeAndColon)?.groups?.position).toBe(' ')
    expect('docs foo: Update documentation'.match(regexCharacterBetweenTypeAndColon)?.groups?.position).toBe(' foo')
    expect('docs foo : Update documentation'.match(regexCharacterBetweenTypeAndColon)?.groups?.position).toBe(' foo ')
    expect('docs! foo : Update documentation'.match(regexCharacterBetweenTypeAndColon)?.groups?.position).toBe(' foo ')
    expect('docs foo !: Update documentation'.match(regexCharacterBetweenTypeAndColon)?.groups?.position).toBe(' foo !')
  })
})
