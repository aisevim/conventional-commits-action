import { expect, test, describe } from 'vitest'

import { checkCommitMessages } from '../checker'
import { rulesConfig } from '../rules'

const regexCharacterAfterScopeBeforeColon = rulesConfig.find(rule => rule.id === 'CharacterAfterScopeBeforeColon')?.regex

describe('No character between scope and colon', () => {
  test('Should generate a valid Output, with the arrow centered on the invalid characters', () => {
    const [, log] = checkCommitMessages(`feat(foo)  asdas : some feat`)
    expect(log).toMatchInlineSnapshot(`
      "
      feat(foo)  asdas : some feat
                   ↑
                   ┆
                   ╵--- Unexpected character before the colon in the commit message.

      "
    `)
  })

  test.concurrent('Should not match', () => {
    expect('Update documentation'.match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()
    expect('docs documentation'.match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()
    expect('docs() documentation'.match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()
    expect('docs(foo) documentation'.match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()
    expect('docs () documentation'.match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()
    expect('docs (foo) documentation'.match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()

    expect('docs: Update documentation'.match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()
    expect('docs!: Update documentation'.match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()
    expect('docs(foo): Update documentation'.match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()
    expect('docs(foo)!: Update documentation'.match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()
    expect('docs(): Update documentation'.match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()
    expect('docs()!: Update documentation'.match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()

    expect(' docs: Update documentation'.match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()
    expect(' docs!: Update documentation'.match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()
    expect(' docs(foo) : Update documentation'.match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()
    expect(' docs(foo)! : Update documentation'.match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()
    expect(' docs() : Update documentation'.match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()
    expect(' docs() foo: Update documentation'.match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()
    expect(' docs()! : Update documentation'.match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()

    expect('docs:'.match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()
    expect('docs!:'.match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()
    expect('docs(foo):'.match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()
    expect('docs(foo)!:'.match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()
    expect('docs():'.match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()
    expect('docs()!:'.match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()

    expect(''.match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()
  })

  test.concurrent('Should match', () => {
    expect('docs(foo) : Update documentation'.match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBe(' ')
    expect('docs(foo)foo: Update documentation'.match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBe('foo')
    expect('docs(foo)  foo  : Update documentation'.match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBe('  foo  ')

    expect('docs(foo)! : Update documentation'.match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBe(' ')
    expect('docs(foo)!foo: Update documentation'.match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBe('foo')
    expect('docs(foo)!  foo  : Update documentation'.match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBe('  foo  ')

    expect('docs(foo) !: Update documentation'.match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBe(' !')
    expect('docs(foo)foo!: Update documentation'.match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBe('foo!')
    expect('docs(foo)  foo  !: Update documentation'.match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBe('  foo  !')

    // Empty scope
    expect('docs() : Update documentation'.match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBe(' ')
    expect('docs()foo: Update documentation'.match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBe('foo')
    expect('docs()  foo  : Update documentation'.match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBe('  foo  ')

    expect('docs()! : Update documentation'.match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBe(' ')
    expect('docs()!foo: Update documentation'.match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBe('foo')
    expect('docs()!  foo  : Update documentation'.match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBe('  foo  ')

    expect('docs() !: Update documentation'.match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBe(' !')
    expect('docs()foo!: Update documentation'.match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBe('foo!')
    expect('docs()  foo  !: Update documentation'.match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBe('  foo  !')
  })
})
