import { expect, test, describe } from 'vitest'

import { processCommitMessage } from '../commit-log-processor'
import { rulesConfig } from '../rules-configs'

const regexEmptyDescription = rulesConfig.find(rule => rule.id === 'EmptyDescription')?.regex

describe('A description is required after the space (<= after the scope)', () => {
  test('Should generate a valid Output, the arrow is positioned after colon', () => {
    const [, log] = processCommitMessage(`feat: `, false)
    expect(log).toMatchInlineSnapshot(`
      "
      feat: 
           ↑
           ┆
           ╵--- Missing or empty commit description.

      "
    `)
  })

  describe.concurrent('Some cases are deliberately ignored to anticipate a possible problem in the rendering.', () => {
    test.concurrent('Should not match', () => {
      // Deliberately ignored
      expect(':'.match(regexEmptyDescription)?.groups?.position).toBeUndefined()
      expect(''.match(regexEmptyDescription)?.groups?.position).toBeUndefined()

      // Need to be ignored
      expect('Update documentation'.match(regexEmptyDescription)?.groups?.position).toBeUndefined()
      expect('docs documentation'.match(regexEmptyDescription)?.groups?.position).toBeUndefined()
      expect('docs() documentation'.match(regexEmptyDescription)?.groups?.position).toBeUndefined()
      expect('docs(foo) documentation'.match(regexEmptyDescription)?.groups?.position).toBeUndefined()
      expect('docs () documentation'.match(regexEmptyDescription)?.groups?.position).toBeUndefined()
      expect('docs (foo) documentation'.match(regexEmptyDescription)?.groups?.position).toBeUndefined()

      expect('docs: Update documentation'.match(regexEmptyDescription)?.groups?.position).toBeUndefined()
      expect('docs: Update documentation'.match(regexEmptyDescription)?.groups?.position).toBeUndefined()
      expect('docs : Update documentation'.match(regexEmptyDescription)?.groups?.position).toBeUndefined()
      expect('docs foo: Update documentation'.match(regexEmptyDescription)?.groups?.position).toBeUndefined()
      expect('docs!: Update documentation'.match(regexEmptyDescription)?.groups?.position).toBeUndefined()
      expect('docs!: Update documentation'.match(regexEmptyDescription)?.groups?.position).toBeUndefined()
      expect('docs! : Update documentation'.match(regexEmptyDescription)?.groups?.position).toBeUndefined()
      expect('docs! foo: Update documentation'.match(regexEmptyDescription)?.groups?.position).toBeUndefined()

      expect('docs(): Update documentation'.match(regexEmptyDescription)?.groups?.position).toBeUndefined()
      expect('docs(): Update documentation'.match(regexEmptyDescription)?.groups?.position).toBeUndefined()
      expect('docs() : Update documentation'.match(regexEmptyDescription)?.groups?.position).toBeUndefined()
      expect('docs() foo: Update documentation'.match(regexEmptyDescription)?.groups?.position).toBeUndefined()
      expect('docs()!: Update documentation'.match(regexEmptyDescription)?.groups?.position).toBeUndefined()
      expect('docs()!: Update documentation'.match(regexEmptyDescription)?.groups?.position).toBeUndefined()
      expect('docs()! : Update documentation'.match(regexEmptyDescription)?.groups?.position).toBeUndefined()
      expect('docs()! foo: Update documentation'.match(regexEmptyDescription)?.groups?.position).toBeUndefined()
    })
  })


  describe.concurrent('Support the match when a space is not exist', () => {
    test.concurrent('Should match', () => {
      expect('docs:'.match(regexEmptyDescription)?.groups?.position).toBe('')
      expect('docs :'.match(regexEmptyDescription)?.groups?.position).toBe('')
      expect('docs foo:'.match(regexEmptyDescription)?.groups?.position).toBe('')
      expect('docs():'.match(regexEmptyDescription)?.groups?.position).toBe('')
      expect('docs() :'.match(regexEmptyDescription)?.groups?.position).toBe('')
      expect('docs() foo:'.match(regexEmptyDescription)?.groups?.position).toBe('')
      expect('docs(foo):'.match(regexEmptyDescription)?.groups?.position).toBe('')
      expect('docs(foo) :'.match(regexEmptyDescription)?.groups?.position).toBe('')
      expect('docs(foo) foo:'.match(regexEmptyDescription)?.groups?.position).toBe('')

      expect('docs!:'.match(regexEmptyDescription)?.groups?.position).toBe('')
      expect('docs !:'.match(regexEmptyDescription)?.groups?.position).toBe('')
      expect('docs foo!:'.match(regexEmptyDescription)?.groups?.position).toBe('')
      expect('docs()!:'.match(regexEmptyDescription)?.groups?.position).toBe('')
      expect('docs() !:'.match(regexEmptyDescription)?.groups?.position).toBe('')
      expect('docs() foo!:'.match(regexEmptyDescription)?.groups?.position).toBe('')
      expect('docs(foo)!:'.match(regexEmptyDescription)?.groups?.position).toBe('')
      expect('docs(foo) !:'.match(regexEmptyDescription)?.groups?.position).toBe('')
      expect('docs(foo) foo!:'.match(regexEmptyDescription)?.groups?.position).toBe('')

      expect('docs! :'.match(regexEmptyDescription)?.groups?.position).toBe('')
      expect('docs! foo:'.match(regexEmptyDescription)?.groups?.position).toBe('')
      expect('docs()!:'.match(regexEmptyDescription)?.groups?.position).toBe('')
      expect('docs()! :'.match(regexEmptyDescription)?.groups?.position).toBe('')
      expect('docs()! foo:'.match(regexEmptyDescription)?.groups?.position).toBe('')
      expect('docs(foo)!:'.match(regexEmptyDescription)?.groups?.position).toBe('')
      expect('docs(foo)! :'.match(regexEmptyDescription)?.groups?.position).toBe('')
      expect('docs(foo)! foo:'.match(regexEmptyDescription)?.groups?.position).toBe('')
    })
  })
})
