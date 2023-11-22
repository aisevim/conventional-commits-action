import { expect, test, describe } from 'vitest'
import { rulesConfig } from '../rules'

const regexMissingSpace = rulesConfig.find(rule => rule.id === 'MissingSpace')?.regex

describe('Missing Space', () => {
  test("not", () => {
    expect("docs: ".match(regexMissingSpace)?.groups?.position).toBeUndefined()
    expect("docs: Update documentation".match(regexMissingSpace)?.groups?.position).toBeUndefined()
    expect("docs!: Update documentation".match(regexMissingSpace)?.groups?.position).toBeUndefined()
    expect("docs(foo): ".match(regexMissingSpace)?.groups?.position).toBeUndefined()
    expect("docs(foo): Update documentation".match(regexMissingSpace)?.groups?.position).toBeUndefined()
    expect("docs(foo)!: Update documentation".match(regexMissingSpace)?.groups?.position).toBeUndefined()

    expect(" ".match(regexMissingSpace)?.groups?.position).toBeUndefined()
    expect(": ".match(regexMissingSpace)?.groups?.position).toBeUndefined()
    expect(": Update documentation".match(regexMissingSpace)?.groups?.position).toBeUndefined()
  })
  
  test("match", () => {
    expect("docs:".match(regexMissingSpace)?.groups?.position).toBe("")
    expect("docs:!".match(regexMissingSpace)?.groups?.position).toBe("")
    
    expect("docs:Update documentation".match(regexMissingSpace)?.groups?.position).toBe("")
    expect("docs!:Update documentation".match(regexMissingSpace)?.groups?.position).toBe("")
    
    expect("docs(foo):Update documentation".match(regexMissingSpace)?.groups?.position).toBe("")
    expect("docs(foo)!:Update documentation".match(regexMissingSpace)?.groups?.position).toBe("")
    
    expect("docs(foo):".match(regexMissingSpace)?.groups?.position).toBe("")
    expect("docs(foo)!:".match(regexMissingSpace)?.groups?.position).toBe("")
  })
})
