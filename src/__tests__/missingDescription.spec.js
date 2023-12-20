import { expect, test, describe } from 'vitest'

import { processCommitMessage } from '../commit-log-processor'
import { rulesConfig } from '../rules-configs'

const regexMissingDescription = rulesConfig.find(rule => rule.id === 'MissingDescription')?.regex

describe('A description is required after the space (<= after the scope)', () => {
  test('Should generate a valid Output, the arrow is positioned after colon', () => {
    const [, log] = processCommitMessage(`feat: `, false)
    expect(log).toMatchInlineSnapshot(`
      "
      feat: 
           ↑
           ┆
           ╵--- Missing commit description.

      "
    `)
  })

  describe.concurrent('Some cases are deliberately ignored to anticipate a possible problem in the rendering.', () => {
    test.concurrent('Should not match', () => {
      // Deliberately ignored
      expect(''.match(regexMissingDescription)?.groups?.position).toBeUndefined()

      // Need to be ignored
      expect('Update documentation'.match(regexMissingDescription)?.groups?.position).toBeUndefined()
      expect('docs documentation'.match(regexMissingDescription)?.groups?.position).toBeUndefined()
      expect('docs() documentation'.match(regexMissingDescription)?.groups?.position).toBeUndefined()
      expect('docs(foo) documentation'.match(regexMissingDescription)?.groups?.position).toBeUndefined()
      expect('docs () documentation'.match(regexMissingDescription)?.groups?.position).toBeUndefined()
      expect('docs (foo) documentation'.match(regexMissingDescription)?.groups?.position).toBeUndefined()

      expect('docs: Update documentation'.match(regexMissingDescription)?.groups?.position).toBeUndefined()
      expect('docs: Update documentation'.match(regexMissingDescription)?.groups?.position).toBeUndefined()
      expect('docs : Update documentation'.match(regexMissingDescription)?.groups?.position).toBeUndefined()
      expect('docs foo: Update documentation'.match(regexMissingDescription)?.groups?.position).toBeUndefined()
      expect('docs!: Update documentation'.match(regexMissingDescription)?.groups?.position).toBeUndefined()
      expect('docs!: Update documentation'.match(regexMissingDescription)?.groups?.position).toBeUndefined()
      expect('docs! : Update documentation'.match(regexMissingDescription)?.groups?.position).toBeUndefined()
      expect('docs! foo: Update documentation'.match(regexMissingDescription)?.groups?.position).toBeUndefined()

      expect('docs(): Update documentation'.match(regexMissingDescription)?.groups?.position).toBeUndefined()
      expect('docs(): Update documentation'.match(regexMissingDescription)?.groups?.position).toBeUndefined()
      expect('docs() : Update documentation'.match(regexMissingDescription)?.groups?.position).toBeUndefined()
      expect('docs() foo: Update documentation'.match(regexMissingDescription)?.groups?.position).toBeUndefined()
      expect('docs()!: Update documentation'.match(regexMissingDescription)?.groups?.position).toBeUndefined()
      expect('docs()!: Update documentation'.match(regexMissingDescription)?.groups?.position).toBeUndefined()
      expect('docs()! : Update documentation'.match(regexMissingDescription)?.groups?.position).toBeUndefined()
      expect('docs()! foo: Update documentation'.match(regexMissingDescription)?.groups?.position).toBeUndefined()
    })
  })


  describe.concurrent('Support the match when a space is not exist', () => {
    test.concurrent('Should match', () => {
      expect('docs:'.match(regexMissingDescription)?.groups?.position).toBe('')
      expect('docs :'.match(regexMissingDescription)?.groups?.position).toBe('')
      expect('docs foo:'.match(regexMissingDescription)?.groups?.position).toBe('')
      expect('docs():'.match(regexMissingDescription)?.groups?.position).toBe('')
      expect('docs() :'.match(regexMissingDescription)?.groups?.position).toBe('')
      expect('docs() foo:'.match(regexMissingDescription)?.groups?.position).toBe('')
      expect('docs(foo):'.match(regexMissingDescription)?.groups?.position).toBe('')
      expect('docs(foo) :'.match(regexMissingDescription)?.groups?.position).toBe('')
      expect('docs(foo) foo:'.match(regexMissingDescription)?.groups?.position).toBe('')

      expect('docs!:'.match(regexMissingDescription)?.groups?.position).toBe('')
      expect('docs !:'.match(regexMissingDescription)?.groups?.position).toBe('')
      expect('docs foo!:'.match(regexMissingDescription)?.groups?.position).toBe('')
      expect('docs()!:'.match(regexMissingDescription)?.groups?.position).toBe('')
      expect('docs() !:'.match(regexMissingDescription)?.groups?.position).toBe('')
      expect('docs() foo!:'.match(regexMissingDescription)?.groups?.position).toBe('')
      expect('docs(foo)!:'.match(regexMissingDescription)?.groups?.position).toBe('')
      expect('docs(foo) !:'.match(regexMissingDescription)?.groups?.position).toBe('')
      expect('docs(foo) foo!:'.match(regexMissingDescription)?.groups?.position).toBe('')

      expect('docs! :'.match(regexMissingDescription)?.groups?.position).toBe('')
      expect('docs! foo:'.match(regexMissingDescription)?.groups?.position).toBe('')
      expect('docs()!:'.match(regexMissingDescription)?.groups?.position).toBe('')
      expect('docs()! :'.match(regexMissingDescription)?.groups?.position).toBe('')
      expect('docs()! foo:'.match(regexMissingDescription)?.groups?.position).toBe('')
      expect('docs(foo)!:'.match(regexMissingDescription)?.groups?.position).toBe('')
      expect('docs(foo)! :'.match(regexMissingDescription)?.groups?.position).toBe('')
      expect('docs(foo)! foo:'.match(regexMissingDescription)?.groups?.position).toBe('')
      expect(':'.match(regexMissingDescription)?.groups?.position).toBe('')
    })
  })
})
