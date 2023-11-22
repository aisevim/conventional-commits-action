import { expect, test, describe } from 'vitest'
import { rulesConfig } from '../rules'

const regexCharacterBetweenTypeAndColon = rulesConfig.find(rule => rule.id === 'CharacterBetweenTypeAndColon')?.regex

describe('Character Between Type And Colon', () => {
  test("not", () => {
    expect("Update documentation".match(regexCharacterBetweenTypeAndColon)?.groups?.position).toBeUndefined()
    expect("docs documentation".match(regexCharacterBetweenTypeAndColon)?.groups?.position).toBeUndefined()
    expect("docs() documentation".match(regexCharacterBetweenTypeAndColon)?.groups?.position).toBeUndefined()
    expect("docs(foo) documentation".match(regexCharacterBetweenTypeAndColon)?.groups?.position).toBeUndefined()
    expect("docs () documentation".match(regexCharacterBetweenTypeAndColon)?.groups?.position).toBeUndefined()
    expect("docs (foo) documentation".match(regexCharacterBetweenTypeAndColon)?.groups?.position).toBeUndefined()

    expect("docs: Update documentation".match(regexCharacterBetweenTypeAndColon)?.groups?.position).toBeUndefined()
    expect("docs!: Update documentation".match(regexCharacterBetweenTypeAndColon)?.groups?.position).toBeUndefined()
    expect("docs(foo): Update documentation".match(regexCharacterBetweenTypeAndColon)?.groups?.position).toBeUndefined()
    expect("docs(foo)!: Update documentation".match(regexCharacterBetweenTypeAndColon)?.groups?.position).toBeUndefined()
    expect("docs(): Update documentation".match(regexCharacterBetweenTypeAndColon)?.groups?.position).toBeUndefined()
    expect("docs()!: Update documentation".match(regexCharacterBetweenTypeAndColon)?.groups?.position).toBeUndefined()

    expect(" docsfoo: Update documentation".match(regexCharacterBetweenTypeAndColon)?.groups?.position).toBeUndefined()
    expect(" docsfoo!: Update documentation".match(regexCharacterBetweenTypeAndColon)?.groups?.position).toBeUndefined()

    expect("".match(regexCharacterBetweenTypeAndColon)?.groups?.position).toBeUndefined()
  })
  
  test("match", () => {
    expect("docs : Update documentation".match(regexCharacterBetweenTypeAndColon)?.groups?.position).toBe(' ')
    expect("docs foo: Update documentation".match(regexCharacterBetweenTypeAndColon)?.groups?.position).toBe(' foo')
    expect("docs foo : Update documentation".match(regexCharacterBetweenTypeAndColon)?.groups?.position).toBe(' foo ')
    expect("docs! foo : Update documentation".match(regexCharacterBetweenTypeAndColon)?.groups?.position).toBe(' foo ')
    expect("docs foo !: Update documentation".match(regexCharacterBetweenTypeAndColon)?.groups?.position).toBe(' foo !')
  })
})
