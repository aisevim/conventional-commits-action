import { expect, test, describe } from 'vitest'
import { rulesConfig } from '../rules'

const regexEmptyCommit = rulesConfig.find(rule => rule.id === 'EmptyCommit')?.regex

describe('Empty Commit', () => {
  test("not", () => {
    expect("docs: Update documentation".match(regexEmptyCommit)).toBeNull()
    expect("docs!: Update documentation".match(regexEmptyCommit)).toBeNull()
    expect("docs(foo): Update documentation".match(regexEmptyCommit)).toBeNull()
    expect("docs(foo)!: Update documentation".match(regexEmptyCommit)).toBeNull()
    expect(" ".match(regexEmptyCommit)).toBeNull()
  })
  
  test("match", () => {
    expect("".match(regexEmptyCommit)?.groups?.position).toBe('')
  })
})
