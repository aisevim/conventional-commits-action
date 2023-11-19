import { expect, test, describe } from 'vitest'
import { regexUnknownType } from '../regex'

describe('Unkown type', () => {
  test("not", () => {
    expect("Update documentation".match(regexUnknownType)).toBeNull()
    expect("docs documentation".match(regexUnknownType)).toBeNull()
    expect("docs() documentation".match(regexUnknownType)).toBeNull()
    expect("docs(foo) documentation".match(regexUnknownType)).toBeNull()
    expect("docs () documentation".match(regexUnknownType)).toBeNull()
    expect("docs (foo) documentation".match(regexUnknownType)).toBeNull()

    expect("docs: Update documentation".match(regexUnknownType)).toBeNull()
    expect("docs!: Update documentation".match(regexUnknownType)).toBeNull()
    expect("docs(foo): Update documentation".match(regexUnknownType)).toBeNull()
    expect("docs(foo)!: Update documentation".match(regexUnknownType)).toBeNull()
    expect("docs()!: Update documentation".match(regexUnknownType)).toBeNull()
    expect("docs()!: Update documentation".match(regexUnknownType)).toBeNull()

    expect(" docs: Update documentation".match(regexUnknownType)).toBeNull()
    expect(" docs!: Update documentation".match(regexUnknownType)).toBeNull()
    expect(" docs(foo): Update documentation".match(regexUnknownType)).toBeNull()
    expect(" docs(foo)!: Update documentation".match(regexUnknownType)).toBeNull()
    expect(" docs()!: Update documentation".match(regexUnknownType)).toBeNull()

    expect("docs:".match(regexUnknownType)).toBeNull()
    expect("docs!:".match(regexUnknownType)).toBeNull()
    expect("docs !:".match(regexUnknownType)).toBeNull()
    expect("docs! :".match(regexUnknownType)).toBeNull()
    expect("docs ! :".match(regexUnknownType)).toBeNull()
    expect("docs(foo):".match(regexUnknownType)).toBeNull()
    expect("docs(foo)!:".match(regexUnknownType)).toBeNull()

    expect("docs: ".match(regexUnknownType)).toBeNull()
    expect("docs!: ".match(regexUnknownType)).toBeNull()
    expect("docs !: ".match(regexUnknownType)).toBeNull()
    expect("docs! : ".match(regexUnknownType)).toBeNull()
    expect("docs ! : ".match(regexUnknownType)).toBeNull()
    expect("docs(foo): ".match(regexUnknownType)).toBeNull()
    expect("docs(foo)!: ".match(regexUnknownType)).toBeNull()
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
