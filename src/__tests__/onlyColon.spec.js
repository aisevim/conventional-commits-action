import { expect, test, describe } from 'vitest'
import { rulesConfig } from '../rules'

const regexOnlyColon = rulesConfig.find(rule => rule.id === 'OnlyColon')?.regex

describe('Only Colon', () => {
  test("not", () => {
    expect("docs: Update documentation".match(regexOnlyColon)).toBeNull()
    expect("docs!: Update documentation".match(regexOnlyColon)).toBeNull()
    expect("docs(foo): Update documentation".match(regexOnlyColon)).toBeNull()
    expect("docs(foo)!: Update documentation".match(regexOnlyColon)).toBeNull()
    expect("".match(regexOnlyColon)).toBeNull()
  })
  
  test("match", () => {
    expect(":".match(regexOnlyColon)?.groups?.position).toBe(':')
  })
})
