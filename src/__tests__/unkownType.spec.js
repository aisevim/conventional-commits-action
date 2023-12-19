import { expect, test, describe } from 'vitest'

import { checkCommitMessages } from '../checker'
import { rulesConfig } from '../rules'

const regexUnknownType = rulesConfig.find(rule => rule.id === 'UnknownType')?.regex

describe('The type is unkown, need to be `chore|docs|feat|fix|perf|refactor|style|test`', () => {
  test('Should generate a valid output, with the arrow centered on the invalid type.', () => {
    const [, log] = checkCommitMessages(`feas: some feat`)
    expect(log).toMatchInlineSnapshot(`
      "
      feas: some feat
        ↑
        ┆
        ╵--- Unrecognized commit type used.

      "
    `)
  })

  describe.concurrent('Some cases are deliberately ignored to anticipate a possible problem in the rendering.', () => {
    test.concurrent('Should not match', () => {
      // Deliberately ignored
      expect('Update documentation'.match(regexUnknownType)?.groups?.position).toBeUndefined()
      expect('docs documentation'.match(regexUnknownType)?.groups?.position).toBeUndefined()
      expect('docs() documentation'.match(regexUnknownType)?.groups?.position).toBeUndefined()
      expect('docs(foo) documentation'.match(regexUnknownType)?.groups?.position).toBeUndefined()
      expect('docs () documentation'.match(regexUnknownType)?.groups?.position).toBeUndefined()
      expect('docs (foo) documentation'.match(regexUnknownType)?.groups?.position).toBeUndefined()

      // Need to be ignored
      expect('docs: Update documentation'.match(regexUnknownType)?.groups?.position).toBeUndefined()
      expect('docs!: Update documentation'.match(regexUnknownType)?.groups?.position).toBeUndefined()
      expect('docs(foo): Update documentation'.match(regexUnknownType)?.groups?.position).toBeUndefined()
      expect('docs(foo)!: Update documentation'.match(regexUnknownType)?.groups?.position).toBeUndefined()
      expect('docs()!: Update documentation'.match(regexUnknownType)?.groups?.position).toBeUndefined()
      expect('docs()!: Update documentation'.match(regexUnknownType)?.groups?.position).toBeUndefined()

      expect(' docs: Update documentation'.match(regexUnknownType)?.groups?.position).toBeUndefined()
      expect(' docs!: Update documentation'.match(regexUnknownType)?.groups?.position).toBeUndefined()
      expect(' docs(foo): Update documentation'.match(regexUnknownType)?.groups?.position).toBeUndefined()
      expect(' docs(foo)!: Update documentation'.match(regexUnknownType)?.groups?.position).toBeUndefined()
      expect(' docs()!: Update documentation'.match(regexUnknownType)?.groups?.position).toBeUndefined()

      expect('docs:'.match(regexUnknownType)?.groups?.position).toBeUndefined()
      expect('docs!:'.match(regexUnknownType)?.groups?.position).toBeUndefined()
      expect('docs !:'.match(regexUnknownType)?.groups?.position).toBeUndefined()
      expect('docs! :'.match(regexUnknownType)?.groups?.position).toBeUndefined()
      expect('docs ! :'.match(regexUnknownType)?.groups?.position).toBeUndefined()
      expect('docs(foo):'.match(regexUnknownType)?.groups?.position).toBeUndefined()
      expect('docs(foo)!:'.match(regexUnknownType)?.groups?.position).toBeUndefined()

      expect('docs: '.match(regexUnknownType)?.groups?.position).toBeUndefined()
      expect('docs!: '.match(regexUnknownType)?.groups?.position).toBeUndefined()
      expect('docs !: '.match(regexUnknownType)?.groups?.position).toBeUndefined()
      expect('docs! : '.match(regexUnknownType)?.groups?.position).toBeUndefined()
      expect('docs ! : '.match(regexUnknownType)?.groups?.position).toBeUndefined()
      expect('docs(foo): '.match(regexUnknownType)?.groups?.position).toBeUndefined()
      expect('docs(foo)!: '.match(regexUnknownType)?.groups?.position).toBeUndefined()

      expect(''.match(regexUnknownType)?.groups?.position).toBeUndefined()
    })
  })

  describe.concurrent('Some cases are deliberately included to add rules to the rendering.', () => {
    test.concurrent('Get the unexpected characters', () => {
      expect('foo(): Update documentation'.match(regexUnknownType)?.groups?.position).toBe('foo')
      expect(' foo(): Update documentation'.match(regexUnknownType)?.groups?.position).toBe('foo')
      expect(' foo (): Update documentation'.match(regexUnknownType)?.groups?.position).toBe('foo')
      expect('foodocs(): Update documentation'.match(regexUnknownType)?.groups?.position).toBe('foodocs')
      expect(' foodocs(): Update documentation'.match(regexUnknownType)?.groups?.position).toBe('foodocs')
      expect('foodocs (): Update documentation'.match(regexUnknownType)?.groups?.position).toBe('foodocs')
      expect(' foodocs (): Update documentation'.match(regexUnknownType)?.groups?.position).toBe('foodocs')

      expect('foo():'.match(regexUnknownType)?.groups?.position).toBe('foo')
      expect(' foo():'.match(regexUnknownType)?.groups?.position).toBe('foo')
      expect(' foo ():'.match(regexUnknownType)?.groups?.position).toBe('foo')
      expect('foodocs():'.match(regexUnknownType)?.groups?.position).toBe('foodocs')
      expect(' foodocs():'.match(regexUnknownType)?.groups?.position).toBe('foodocs')
      expect('foodocs ():'.match(regexUnknownType)?.groups?.position).toBe('foodocs')
      expect(' foodocs ():'.match(regexUnknownType)?.groups?.position).toBe('foodocs')

      expect('foo:'.match(regexUnknownType)?.groups?.position).toBe('foo')
      expect(' foo:'.match(regexUnknownType)?.groups?.position).toBe('foo')
      expect(' foo :'.match(regexUnknownType)?.groups?.position).toBe('foo')
      expect('foodocs:'.match(regexUnknownType)?.groups?.position).toBe('foodocs')
      expect(' foodocs:'.match(regexUnknownType)?.groups?.position).toBe('foodocs')
      expect('foodocs :'.match(regexUnknownType)?.groups?.position).toBe('foodocs')
      expect(' foodocs :'.match(regexUnknownType)?.groups?.position).toBe('foodocs')
    })
  })
})
