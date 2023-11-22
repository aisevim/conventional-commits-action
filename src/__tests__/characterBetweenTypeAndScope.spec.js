import { expect, test, describe } from 'vitest'
import { rulesConfig } from '../rules'

const regexCharacterBetweenTypeAndScope = rulesConfig.find(rule => rule.id === 'CharacterBetweenTypeAndScope')?.regex

describe('Character Between Type And Scope', () => {
  test("not", () => {
    expect("Update documentation".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()
    expect("docs documentation".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()
    expect("docs() documentation".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()
    expect("docs(foo) documentation".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()
    expect("docs () documentation".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()
    expect("docs (foo) documentation".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()

    expect("docs: Update documentation".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()
    expect("docs!: Update documentation".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()
    expect("docs(foo): Update documentation".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()
    expect("docs(foo)!: Update documentation".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()
    expect("docs(): Update documentation".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()
    expect("docs()!: Update documentation".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()

    expect(" docs: Update documentation".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()
    expect(" docs!: Update documentation".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()
    expect(" docs (foo): Update documentation".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()
    expect(" docs (foo)!: Update documentation".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()
    expect(" docs (): Update documentation".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()
    expect(" docs ()!: Update documentation".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()

    expect("docs:".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()
    expect("docs!:".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()
    expect("docs(foo):".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()
    expect("docs(foo)!:".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()
    expect("docs():".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()
    expect("docs()!:".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()

    expect("".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBeUndefined()
  })
  
  test("match", () => {
    expect("docs (foo): Update documentation".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe(' ')
    expect("docsfoo(foo): Update documentation".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe('foo')
    expect("docs  foo  (foo): Update documentation".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe('  foo  ')
    
    expect("docs (foo)!: Update documentation".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe(' ')
    expect("docsfoo(foo)!: Update documentation".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe('foo')
    expect("docs  foo  (foo)!: Update documentation".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe('  foo  ')
    
    expect("docs (foo)foo: Update documentation".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe(' ')
    expect("docsfoo(foo)foo: Update documentation".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe('foo')
    expect("docs  foo  (foo)foo: Update documentation".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe('  foo  ')
    
    expect("docs (foo)foo:".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe(' ')
    expect("docsfoo(foo)foo:".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe('foo')
    expect("docs  foo  (foo)foo:".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe('  foo  ')

    // Empty scope
    expect("docs (): Update documentation".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe(' ')
    expect("docsfoo(): Update documentation".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe('foo')
    expect("docs  foo  (): Update documentation".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe('  foo  ')
    
    expect("docs ()!: Update documentation".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe(' ')
    expect("docsfoo()!: Update documentation".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe('foo')
    expect("docs  foo  ()!: Update documentation".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe('  foo  ')
    
    expect("docs ()foo: Update documentation".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe(' ')
    expect("docsfoo()foo: Update documentation".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe('foo')
    expect("docs  foo  ()foo: Update documentation".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe('  foo  ')
    
    expect("docs ()foo:".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe(' ')
    expect("docsfoo()foo:".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe('foo')
    expect("docs  foo  ()foo:".match(regexCharacterBetweenTypeAndScope)?.groups?.position).toBe('  foo  ')
  })
})
