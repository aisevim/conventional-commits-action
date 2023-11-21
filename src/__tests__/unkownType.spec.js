import { expect, test, describe } from 'vitest'
import { rulesConfig } from '../rules'

const regexUnknownType = rulesConfig.find(rule => rule.id === 'UnknownType')?.regex

describe('Unkown type', () => {
  test("not", () => {
    expect("Update documentation".match(regexUnknownType)?.groups?.position).toBeUndefined()
    expect("docs documentation".match(regexUnknownType)?.groups?.position).toBeUndefined()
    expect("docs() documentation".match(regexUnknownType)?.groups?.position).toBeUndefined()
    expect("docs(foo) documentation".match(regexUnknownType)?.groups?.position).toBeUndefined()
    expect("docs () documentation".match(regexUnknownType)?.groups?.position).toBeUndefined()
    expect("docs (foo) documentation".match(regexUnknownType)?.groups?.position).toBeUndefined()

    expect("docs: Update documentation".match(regexUnknownType)?.groups?.position).toBeUndefined()
    expect("docs!: Update documentation".match(regexUnknownType)?.groups?.position).toBeUndefined()
    expect("docs(foo): Update documentation".match(regexUnknownType)?.groups?.position).toBeUndefined()
    expect("docs(foo)!: Update documentation".match(regexUnknownType)?.groups?.position).toBeUndefined()
    expect("docs()!: Update documentation".match(regexUnknownType)?.groups?.position).toBeUndefined()
    expect("docs()!: Update documentation".match(regexUnknownType)?.groups?.position).toBeUndefined()

    expect(" docs: Update documentation".match(regexUnknownType)?.groups?.position).toBeUndefined()
    expect(" docs!: Update documentation".match(regexUnknownType)?.groups?.position).toBeUndefined()
    expect(" docs(foo): Update documentation".match(regexUnknownType)?.groups?.position).toBeUndefined()
    expect(" docs(foo)!: Update documentation".match(regexUnknownType)?.groups?.position).toBeUndefined()
    expect(" docs()!: Update documentation".match(regexUnknownType)?.groups?.position).toBeUndefined()

    expect("docs:".match(regexUnknownType)?.groups?.position).toBeUndefined()
    expect("docs!:".match(regexUnknownType)?.groups?.position).toBeUndefined()
    expect("docs !:".match(regexUnknownType)?.groups?.position).toBeUndefined()
    expect("docs! :".match(regexUnknownType)?.groups?.position).toBeUndefined()
    expect("docs ! :".match(regexUnknownType)?.groups?.position).toBeUndefined()
    expect("docs(foo):".match(regexUnknownType)?.groups?.position).toBeUndefined()
    expect("docs(foo)!:".match(regexUnknownType)?.groups?.position).toBeUndefined()

    expect("docs: ".match(regexUnknownType)?.groups?.position).toBeUndefined()
    expect("docs!: ".match(regexUnknownType)?.groups?.position).toBeUndefined()
    expect("docs !: ".match(regexUnknownType)?.groups?.position).toBeUndefined()
    expect("docs! : ".match(regexUnknownType)?.groups?.position).toBeUndefined()
    expect("docs ! : ".match(regexUnknownType)?.groups?.position).toBeUndefined()
    expect("docs(foo): ".match(regexUnknownType)?.groups?.position).toBeUndefined()
    expect("docs(foo)!: ".match(regexUnknownType)?.groups?.position).toBeUndefined()
  })
  
  test("match", () => {
    expect("foo(): Update documentation".match(regexUnknownType)?.groups?.position).toBe('foo')
    expect(" foo(): Update documentation".match(regexUnknownType)?.groups?.position).toBe('foo')
    expect(" foo (): Update documentation".match(regexUnknownType)?.groups?.position).toBe('foo')
    expect("foodocs(): Update documentation".match(regexUnknownType)?.groups?.position).toBe('foodocs')
    expect(" foodocs(): Update documentation".match(regexUnknownType)?.groups?.position).toBe('foodocs')
    expect("foodocs (): Update documentation".match(regexUnknownType)?.groups?.position).toBe('foodocs')
    expect(" foodocs (): Update documentation".match(regexUnknownType)?.groups?.position).toBe('foodocs')

    expect("foo():".match(regexUnknownType)?.groups?.position).toBe('foo')
    expect(" foo():".match(regexUnknownType)?.groups?.position).toBe('foo')
    expect(" foo ():".match(regexUnknownType)?.groups?.position).toBe('foo')
    expect("foodocs():".match(regexUnknownType)?.groups?.position).toBe('foodocs')
    expect(" foodocs():".match(regexUnknownType)?.groups?.position).toBe('foodocs')
    expect("foodocs ():".match(regexUnknownType)?.groups?.position).toBe('foodocs')
    expect(" foodocs ():".match(regexUnknownType)?.groups?.position).toBe('foodocs')

    expect("foo:".match(regexUnknownType)?.groups?.position).toBe('foo')
    expect(" foo:".match(regexUnknownType)?.groups?.position).toBe('foo')
    expect(" foo :".match(regexUnknownType)?.groups?.position).toBe('foo')
    expect("foodocs:".match(regexUnknownType)?.groups?.position).toBe('foodocs')
    expect(" foodocs:".match(regexUnknownType)?.groups?.position).toBe('foodocs')
    expect("foodocs :".match(regexUnknownType)?.groups?.position).toBe('foodocs')
    expect(" foodocs :".match(regexUnknownType)?.groups?.position).toBe('foodocs')
  })
})
