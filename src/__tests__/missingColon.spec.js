import { expect, test, describe } from 'vitest'

import { processCommitMessage } from '../commit-log-processor'
import { rulesConfig } from '../rules-configs'

const regexMissingColon = rulesConfig.find(rule => rule.id === 'MissingColon')?.regex

describe('A Colon is required after type or scope and before space', () => {
  test('Should generate a valid Output, the arrow is positionned in ending', () => {
    const [, log] = processCommitMessage(`feat some feat`, false)
    expect(log).toMatchInlineSnapshot(`
      "
      feat some feat
                    ↑
                    ┆
                    ╵--- Colon is missing in the commit message structure.

      "
    `)
  })

  describe.concurrent('Some cases are deliberately ignored to anticipate a possible problem in the rendering.', () => {
    test.concurrent('Should not match', () => {
      // Deliberately ignored
      expect(''.match(regexMissingColon)?.groups?.position).toBeUndefined()
      expect(':'.match(regexMissingColon)?.groups?.position).toBeUndefined()

      // Need to be ignored
      expect('docs: Update documentation'.match(regexMissingColon)?.groups?.position).toBeUndefined()
      expect('docs!: Update documentation'.match(regexMissingColon)?.groups?.position).toBeUndefined()
      expect('docs(foo): Update documentation'.match(regexMissingColon)?.groups?.position).toBeUndefined()
      expect('docs(foo)!: Update documentation'.match(regexMissingColon)?.groups?.position).toBeUndefined()
    })
  })

  test.concurrent('Should match', () => {
    expect('Update documentation'.match(regexMissingColon)?.groups?.position).toBe('')
    expect('docs documentation'.match(regexMissingColon)?.groups?.position).toBe('')
    expect('docs() documentation'.match(regexMissingColon)?.groups?.position).toBe('')
    expect('docs(foo) documentation'.match(regexMissingColon)?.groups?.position).toBe('')
    expect('docs () documentation'.match(regexMissingColon)?.groups?.position).toBe('')
    expect('docs (foo) documentation'.match(regexMissingColon)?.groups?.position).toBe('')

    expect(' '.match(regexMissingColon)?.groups?.position).toBe('')
  })
})
