import { expect, test, describe } from 'vitest'
import { rulesConfig } from '../rules'

const regexMissingColon = rulesConfig.find(rule => rule.id === 'MissingColon')?.regex

describe('Missing Colon', () => {
  test("not", () => {
    expect("docs: Update documentation".match(regexMissingColon)?.groups?.position).toBeUndefined()
    expect("docs!: Update documentation".match(regexMissingColon)?.groups?.position).toBeUndefined()
    expect("docs(foo): Update documentation".match(regexMissingColon)?.groups?.position).toBeUndefined()
    expect("docs(foo)!: Update documentation".match(regexMissingColon)?.groups?.position).toBeUndefined()
    expect("".match(regexMissingColon)?.groups?.position).toBeUndefined()
    expect(":".match(regexMissingColon)?.groups?.position).toBeUndefined()
  })
  
  test("match", () => {
    expect("Update documentation".match(regexMissingColon)?.groups?.position).toBe('')
    expect("docs documentation".match(regexMissingColon)?.groups?.position).toBe('')
    expect("docs() documentation".match(regexMissingColon)?.groups?.position).toBe('')
    expect("docs(foo) documentation".match(regexMissingColon)?.groups?.position).toBe('')
    expect("docs () documentation".match(regexMissingColon)?.groups?.position).toBe('')
    expect("docs (foo) documentation".match(regexMissingColon)?.groups?.position).toBe('')
    expect(" ".match(regexMissingColon)?.groups?.position).toBe('')
  })
})
