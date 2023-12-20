import { expect, test, describe } from 'vitest'

import { ignoreByRegex } from '../utils'

describe('ignoreByRegex', () => {
  test('Should get only text', () => {
    const array = [
      { text: 'feat: valid' },
      { text: 'Merge is ignored' },
      { text: 'docs(: valid' },
      { text: 'valid wip' },
      { text: 'wip is ignored' },
    ]
    const regex = '^wip|Merge|Revert|revert'

    expect(ignoreByRegex(array, regex)).toEqual([
      { text: 'feat: valid' },
      { text: 'docs(: valid' },
      { text: 'valid wip' },
    ])
  })
})
