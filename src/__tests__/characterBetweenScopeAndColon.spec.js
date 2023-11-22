import { expect, test, describe } from 'vitest'
import { rulesConfig } from '../rules'

const regexCharacterAfterScopeBeforeColon = rulesConfig.find(rule => rule.id === 'CharacterAfterScopeBeforeColon')?.regex 

describe('Character Between Scope And Colon', () => {
  test("not", () => {
    expect("Update documentation".match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()
    expect("docs documentation".match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()
    expect("docs() documentation".match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()
    expect("docs(foo) documentation".match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()
    expect("docs () documentation".match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()
    expect("docs (foo) documentation".match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()

    expect("docs: Update documentation".match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()
    expect("docs!: Update documentation".match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()
    expect("docs(foo): Update documentation".match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()
    expect("docs(foo)!: Update documentation".match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()
    expect("docs(): Update documentation".match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()
    expect("docs()!: Update documentation".match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()

    expect(" docs: Update documentation".match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()
    expect(" docs!: Update documentation".match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()
    expect(" docs(foo) : Update documentation".match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()
    expect(" docs(foo)! : Update documentation".match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()
    expect(" docs() : Update documentation".match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()
    expect(" docs() foo: Update documentation".match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()
    expect(" docs()! : Update documentation".match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()

    expect("docs:".match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()
    expect("docs!:".match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()
    expect("docs(foo):".match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()
    expect("docs(foo)!:".match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()
    expect("docs():".match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()
    expect("docs()!:".match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()

    expect("".match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBeUndefined()
  })

  test("match", () => {
    expect("docs(foo) : Update documentation".match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBe(' ')
    expect("docs(foo)foo: Update documentation".match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBe('foo')
    expect("docs(foo)  foo  : Update documentation".match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBe('  foo  ')

    expect("docs(foo)! : Update documentation".match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBe(' ')
    expect("docs(foo)!foo: Update documentation".match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBe('foo')
    expect("docs(foo)!  foo  : Update documentation".match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBe('  foo  ')

    expect("docs(foo) !: Update documentation".match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBe(' !')
    expect("docs(foo)foo!: Update documentation".match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBe('foo!')
    expect("docs(foo)  foo  !: Update documentation".match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBe('  foo  !')

    // Empty scope
    expect("docs() : Update documentation".match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBe(' ')
    expect("docs()foo: Update documentation".match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBe('foo')
    expect("docs()  foo  : Update documentation".match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBe('  foo  ')

    expect("docs()! : Update documentation".match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBe(' ')
    expect("docs()!foo: Update documentation".match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBe('foo')
    expect("docs()!  foo  : Update documentation".match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBe('  foo  ')

    expect("docs() !: Update documentation".match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBe(' !')
    expect("docs()foo!: Update documentation".match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBe('foo!')
    expect("docs()  foo  !: Update documentation".match(regexCharacterAfterScopeBeforeColon)?.groups?.position).toBe('  foo  !')
  })
})
