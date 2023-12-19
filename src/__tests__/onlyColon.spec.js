import { expect, test, describe } from 'vitest'

import { rulesConfig } from '../rules'

const regexOnlyColon = rulesConfig.find(rule => rule.id === 'OnlyColon')?.regex

describe.concurrent('Only Colon', () => {
  test.concurrent('not', () => {
    expect('docs: Update documentation'.match(regexOnlyColon)).toBeNull()
    expect('docs!: Update documentation'.match(regexOnlyColon)).toBeNull()
    expect('docs(foo): Update documentation'.match(regexOnlyColon)).toBeNull()
    expect('docs(foo)!: Update documentation'.match(regexOnlyColon)).toBeNull()
    expect(''.match(regexOnlyColon)).toBeNull()
  })

  test.concurrent('match', () => {
    expect(':'.match(regexOnlyColon)?.groups?.position).toBe(':')
  })
})
