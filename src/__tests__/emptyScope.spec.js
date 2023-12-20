import { expect, test, describe } from 'vitest'

import { processCommitMessage } from '../commit-log-processor'
import { rulesConfig } from '../rules-configs'

const regexEmptyScope = rulesConfig.find(rule => rule.id === 'EmptyScope')?.regex

describe('The scope need to have characters', () => {
  test('Should generate a valid Output, the arrow is positioned on parenthesis', () => {
    const [, log] = processCommitMessage(`feat(): some feat`, false)
    expect(log).toMatchInlineSnapshot(`
      "
      feat(): some feat
           ↑
           ┆
           ╵--- Empty commit scope provided.

      "
    `)
  })

  describe.concurrent('Some cases are deliberately ignored to anticipate a possible problem in the rendering.', () => {
    test.concurrent('Should not match', () => {
      // Deliberately ignored
      expect('():'.match(regexEmptyScope)?.groups?.position).toBeUndefined()
      expect('(): '.match(regexEmptyScope)?.groups?.position).toBeUndefined()

      // Need to be ignored
      expect('Update documentation'.match(regexEmptyScope)?.groups?.position).toBeUndefined()
      expect('docs documentation'.match(regexEmptyScope)?.groups?.position).toBeUndefined()
      expect('docs() documentation'.match(regexEmptyScope)?.groups?.position).toBeUndefined()
      expect('docs(foo) documentation'.match(regexEmptyScope)?.groups?.position).toBeUndefined()
      expect('docs () documentation'.match(regexEmptyScope)?.groups?.position).toBeUndefined()
      expect('docs (foo) documentation'.match(regexEmptyScope)?.groups?.position).toBeUndefined()

      expect('foo(): Update documentation'.match(regexEmptyScope)?.groups?.position).toBeUndefined()
      expect('foo()!: Update documentation'.match(regexEmptyScope)?.groups?.position).toBeUndefined()
      expect('foo (): Update documentation'.match(regexEmptyScope)?.groups?.position).toBeUndefined()
      expect('foo ()!: Update documentation'.match(regexEmptyScope)?.groups?.position).toBeUndefined()
      expect('foo () : Update documentation'.match(regexEmptyScope)?.groups?.position).toBeUndefined()
      expect('foo () !: Update documentation'.match(regexEmptyScope)?.groups?.position).toBeUndefined()
    })
  })

  test.concurrent('Should match', () => {
    expect('docs(): Update documentation'.match(regexEmptyScope)?.groups?.position).toBe('()')
    expect('docs()!: Update documentation'.match(regexEmptyScope)?.groups?.position).toBe('()')

    expect('docs (): Update documentation'.match(regexEmptyScope)?.groups?.position).toBe('()')
    expect('docs ()!: Update documentation'.match(regexEmptyScope)?.groups?.position).toBe('()')
    expect('docs foo(): Update documentation'.match(regexEmptyScope)?.groups?.position).toBe('()')
    expect('docs foo()!: Update documentation'.match(regexEmptyScope)?.groups?.position).toBe('()')

    expect('docs() : Update documentation'.match(regexEmptyScope)?.groups?.position).toBe('()')
    expect('docs() !: Update documentation'.match(regexEmptyScope)?.groups?.position).toBe('()')
    expect('docs() foo: Update documentation'.match(regexEmptyScope)?.groups?.position).toBe('()')
    expect('docs() foo!: Update documentation'.match(regexEmptyScope)?.groups?.position).toBe('()')
  })
})
