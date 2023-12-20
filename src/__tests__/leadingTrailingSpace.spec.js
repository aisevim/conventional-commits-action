import { expect, test, describe } from 'vitest'

import { processCommitMessage } from '../commit-log-processor'
import { rulesConfig } from '../rules-configs'

const regexLeadingTrailingSpace = rulesConfig.find(rule => rule.id === 'LeadingTrailingSpace')?.regex

describe('No space before the commit', () => {
  test('Should generate a valid Output, the arrow is positioned on beggining', () => {
    const [, log] = processCommitMessage(`     feat: some feat`, false)
    expect(log).toMatchInlineSnapshot(`
      "
           feat: some feat
        ↑
        ┆
        ╵--- Avoid leading or trailing spaces in the commit message.

      "
    `)
  })

  describe.concurrent('Some cases are deliberately ignored to anticipate a possible problem in the rendering.', () => {
    test.concurrent('Should not match', () => {
      // Deliberately ignored
      expect(''.match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()

      // Need to be ignored
      expect('Update documentation'.match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()
      expect('docs documentation'.match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()
      expect('docs() documentation'.match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()
      expect('docs(foo) documentation'.match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()
      expect('docs () documentation'.match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()
      expect('docs (foo) documentation'.match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()

      expect(' Update documentation'.match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()
      expect(' docs documentation'.match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()
      expect(' docs() documentation'.match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()
      expect(' docs(foo) documentation'.match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()
      expect(' docs () documentation'.match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()
      expect(' docs (foo) documentation'.match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()

      expect('docs: Update documentation'.match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()
      expect('docs!: Update documentation'.match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()
      expect('docs(foo): Update documentation'.match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()
      expect('docs(foo)!: Update documentation'.match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()
      expect('docs(): Update documentation'.match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()
      expect('docs()!: Update documentation'.match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()
    })
  })


  test.concurrent('Get the unexpected characters', () => {
    expect(' docs:'.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(' docs!:'.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(' docs():'.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(' docs()!:'.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(' docs(foo):'.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(' docs(foo)!:'.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')

    expect(' foo:'.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(' foo!:'.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(' foo():'.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(' foo()!:'.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(' foo(foo):'.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(' foo(foo)!:'.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')

    expect(' :'.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(' !:'.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(' ():'.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(' ()!:'.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(' (foo):'.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(' (foo)!:'.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')

    expect('     docs(foo): Update documentation'.match(regexLeadingTrailingSpace)?.groups?.position).toBe('     ')
    expect('     docs(foo)!: Update documentation'.match(regexLeadingTrailingSpace)?.groups?.position).toBe('     ')
  })
})
