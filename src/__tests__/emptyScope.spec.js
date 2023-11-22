import { expect, test, describe } from 'vitest'
import { rulesConfig } from '../rules'

const regexEmptyScope = rulesConfig.find(rule => rule.id === 'EmptyScope')?.regex

describe('Empty Scope', () => {
  test("not", () => {
    expect("Update documentation".match(regexEmptyScope)?.groups?.position).toBeUndefined()
    expect("docs documentation".match(regexEmptyScope)?.groups?.position).toBeUndefined()
    expect("docs() documentation".match(regexEmptyScope)?.groups?.position).toBeUndefined()
    expect("docs(foo) documentation".match(regexEmptyScope)?.groups?.position).toBeUndefined()
    expect("docs () documentation".match(regexEmptyScope)?.groups?.position).toBeUndefined()
    expect("docs (foo) documentation".match(regexEmptyScope)?.groups?.position).toBeUndefined()

    expect("docs: Update documentation".match(regexEmptyScope)?.groups?.position).toBeUndefined()
    expect("docs!: Update documentation".match(regexEmptyScope)?.groups?.position).toBeUndefined()
    expect("docs(foo): Update documentation".match(regexEmptyScope)?.groups?.position).toBeUndefined()
    expect("docs(foo)!: Update documentation".match(regexEmptyScope)?.groups?.position).toBeUndefined()

    expect(" docs: Update documentation".match(regexEmptyScope)?.groups?.position).toBeUndefined()
    expect(" docs!: Update documentation".match(regexEmptyScope)?.groups?.position).toBeUndefined()
    expect(" docs(foo): Update documentation".match(regexEmptyScope)?.groups?.position).toBeUndefined()
    expect(" docs(foo)!: Update documentation".match(regexEmptyScope)?.groups?.position).toBeUndefined()

    expect("foo(): Update documentation".match(regexEmptyScope)?.groups?.position).toBeUndefined()
    expect("foo()!: Update documentation".match(regexEmptyScope)?.groups?.position).toBeUndefined()
    expect("foo (): Update documentation".match(regexEmptyScope)?.groups?.position).toBeUndefined()
    expect("foo ()!: Update documentation".match(regexEmptyScope)?.groups?.position).toBeUndefined()
    expect("foo () : Update documentation".match(regexEmptyScope)?.groups?.position).toBeUndefined()
    expect("foo () !: Update documentation".match(regexEmptyScope)?.groups?.position).toBeUndefined()
  })
  
  test("match", () => {
    expect("docs(): Update documentation".match(regexEmptyScope)?.groups?.position).toBe('()')
    expect("docs()!: Update documentation".match(regexEmptyScope)?.groups?.position).toBe('()')

    expect("docs (): Update documentation".match(regexEmptyScope)?.groups?.position).toBe('()')
    expect("docs ()!: Update documentation".match(regexEmptyScope)?.groups?.position).toBe('()')
    expect("docs foo(): Update documentation".match(regexEmptyScope)?.groups?.position).toBe('()')
    expect("docs foo()!: Update documentation".match(regexEmptyScope)?.groups?.position).toBe('()')

    expect("docs() : Update documentation".match(regexEmptyScope)?.groups?.position).toBe('()')
    expect("docs() !: Update documentation".match(regexEmptyScope)?.groups?.position).toBe('()')
    expect("docs() foo: Update documentation".match(regexEmptyScope)?.groups?.position).toBe('()')
    expect("docs() foo!: Update documentation".match(regexEmptyScope)?.groups?.position).toBe('()')
  })
})
