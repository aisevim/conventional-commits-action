import { expect, test, describe } from 'vitest'

import { processCommitMessage } from '../commit-log-processor'
import { rulesConfig } from '../rules-configs'

const regexCharacterBetweenTypeAndScope = rulesConfig.find(rule => rule.id === 'CharacterBetweenTypeAndScope')?.regex

describe('Characters between type and scope are not allowed', () => {
  test('Should generate a valid Output, with the arrow centered on the invalid characters', () => {
    const [, log] = processCommitMessage(`feat asd  (foo): some feat`, false)
    expect(log).toMatchInlineSnapshot(`
      "
      feat asd  (foo): some feat
             ↑
             ┆
             ╵--- Unexpected character between commit type and scope.

      "
    `)
  })

  describe.concurrent('Some cases are deliberately ignored to anticipate a possible problem in the rendering.', () => {
    test.concurrent('Should not match', () => {
      expect('Update documentation'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()
      expect('docs documentation'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()
      expect('docs() documentation'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()
      expect('docs(foo) documentation'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()
      expect('docs () documentation'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()
      expect('docs (foo) documentation'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()

      expect('docs: Update documentation'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()
      expect('docs!: Update documentation'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()
      expect('docs(foo): Update documentation'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()
      expect('docs(foo)!: Update documentation'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()
      expect('docs(): Update documentation'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()
      expect('docs()!: Update documentation'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()

      expect(' docs: Update documentation'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()
      expect(' docs!: Update documentation'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()
      expect(' docs (foo): Update documentation'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()
      expect(' docs (foo)!: Update documentation'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()
      expect(' docs (): Update documentation'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()
      expect(' docs ()!: Update documentation'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()

      expect('docs:'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()
      expect('docs!:'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()
      expect('docs(foo):'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()
      expect('docs(foo)!:'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()
      expect('docs():'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()
      expect('docs()!:'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()

      expect(''.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()
    })
  })

  test.concurrent('Get the unexpected characters', () => {
    expect('docs (foo): Update documentation'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe(' ')
    expect('docsfoo(foo): Update documentation'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe('foo')
    expect('docs  foo  (foo): Update documentation'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe('  foo  ')

    expect('docs (foo)!: Update documentation'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe(' ')
    expect('docsfoo(foo)!: Update documentation'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe('foo')
    expect('docs  foo  (foo)!: Update documentation'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe('  foo  ')

    expect('docs (foo)foo: Update documentation'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe(' ')
    expect('docsfoo(foo)foo: Update documentation'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe('foo')
    expect('docs  foo  (foo)foo: Update documentation'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe('  foo  ')

    expect('docs (foo)foo:'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe(' ')
    expect('docsfoo(foo)foo:'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe('foo')
    expect('docs  foo  (foo)foo:'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe('  foo  ')

    // Empty scope
    expect('docs (): Update documentation'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe(' ')
    expect('docsfoo(): Update documentation'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe('foo')
    expect('docs  foo  (): Update documentation'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe('  foo  ')

    expect('docs ()!: Update documentation'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe(' ')
    expect('docsfoo()!: Update documentation'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe('foo')
    expect('docs  foo  ()!: Update documentation'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe('  foo  ')

    expect('docs ()foo: Update documentation'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe(' ')
    expect('docsfoo()foo: Update documentation'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe('foo')
    expect('docs  foo  ()foo: Update documentation'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe('  foo  ')

    expect('docs ()foo:'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe(' ')
    expect('docsfoo()foo:'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe('foo')
    expect('docs  foo  ()foo:'.match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe('  foo  ')
  })
})
