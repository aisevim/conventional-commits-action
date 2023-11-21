import { expect, test, describe } from 'vitest'
import { rulesConfig } from '../rules'

const regexLeadingTrailingSpace = rulesConfig.find(rule => rule.id === 'LeadingTrailingSpace')?.regex

describe('Leading Trailing Space', () => {
  test("not", () => {
    expect("Update documentation".match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()
    expect("docs documentation".match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()
    expect("docs() documentation".match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()
    expect("docs(foo) documentation".match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()
    expect("docs () documentation".match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()
    expect("docs (foo) documentation".match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()
    expect(" Update documentation".match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()
    expect(" docs documentation".match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()
    expect(" docs() documentation".match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()
    expect(" docs(foo) documentation".match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()
    expect(" docs () documentation".match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()
    expect(" docs (foo) documentation".match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()

    expect("docs: Update documentation".match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()
    expect("docs!: Update documentation".match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()
    expect("docs! : Update documentation".match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()
    expect("docs !: Update documentation".match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()
    expect("docs ! : Update documentation".match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()
    expect("docs(foo): Update documentation".match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()
    expect("docs(foo)!: Update documentation".match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()
    expect("docs(foo) !: Update documentation".match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()
    expect("docs(foo)! : Update documentation".match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()
    expect("docs(foo) ! : Update documentation".match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()
    expect("docs(): Update documentation".match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()
    expect("docs() : Update documentation".match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()
    expect("docs()!: Update documentation".match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()
    expect("docs() !: Update documentation".match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()
    expect("docs()! : Update documentation".match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()
    expect("docs() ! : Update documentation".match(regexLeadingTrailingSpace)?.groups?.position).toBeUndefined()
  })
  
  test("match", () => {
    expect(" docs:".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docs():".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docs()!:".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')

    expect(" docs()! :".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs() !:`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs() ! :`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docs(foo) :".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docs(foo)! :".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs(foo) !:`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs(foo) ! :`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docs(foo foo) :".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docs(foo foo)! :".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs(foo foo) !:`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs(foo foo) ! :`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docs()!foo:".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs()foo!:`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs()foo!foo:`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docs(foo)foo:".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docs(foo)!foo:".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs(foo)foo!:`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs(foo)foo!foo:`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docs(foo foo)foo:".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docs(foo foo)!foo:".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs(foo foo)foo!:`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs(foo foo)foo!foo:`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
 
    expect(" docs ()! :".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs () !:`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs () ! :`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docs (foo) :".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docs (foo)! :".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs (foo) !:`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs (foo) ! :`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docs (foo foo) :".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docs (foo foo)! :".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs (foo foo) !:`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs (foo foo) ! :`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docs ()!foo:".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs ()foo!:`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs ()foo!foo:`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docs (foo)foo:".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docs (foo)!foo:".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs (foo)foo!:`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs (foo)foo!foo:`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docs (foo foo)foo:".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docs (foo foo)!foo:".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs (foo foo)foo!:`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs (foo foo)foo!foo:`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
   
    expect(" docsfooo() :".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo()! :".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo() !:`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo() ! :`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo(foo) :".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo(foo)! :".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo(foo) !:`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo(foo) ! :`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo(foo foo) :".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo(foo foo)! :".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo(foo foo) !:`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo(foo foo) ! :`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo()foo:".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo()!foo:".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo()foo!:`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo()foo!foo:`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo(foo)foo:".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo(foo)!foo:".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo(foo)foo!:`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo(foo)foo!foo:`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo(foo foo)foo:".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo(foo foo)!foo:".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo(foo foo)foo!:`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo(foo foo)foo!foo:`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
 
    expect(" docsfooo () :".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo () :".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo ()! :".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo () !:`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo () ! :`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo (foo) :".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo (foo)! :".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo (foo) !:`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo (foo) ! :`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo (foo foo) :".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo (foo foo)! :".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo (foo foo) !:`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo (foo foo) ! :`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo ()foo:".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo ()foo:".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo ()!foo:".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo ()foo!:`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo ()foo!foo:`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo (foo)foo:".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo (foo)!foo:".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo (foo)foo!:`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo (foo)foo!foo:`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo (foo foo)foo:".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo (foo foo)!foo:".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo (foo foo)foo!:`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo (foo foo)foo!foo:`.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
 
    expect(" docs: ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docs(): ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docs()!: ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
 
    expect(" docs()! : ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs() !: `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs() ! : `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docs(foo) : ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docs(foo)! : ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs(foo) !: `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs(foo) ! : `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docs(foo foo) : ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docs(foo foo)! : ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs(foo foo) !: `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs(foo foo) ! : `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docs()!foo: ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs()foo!: `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs()foo!foo: `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docs(foo)foo: ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docs(foo)!foo: ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs(foo)foo!: `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs(foo)foo!foo: `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docs(foo foo)foo: ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docs(foo foo)!foo: ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs(foo foo)foo!: `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs(foo foo)foo!foo: `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
 
    expect(" docs ()! : ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs () !: `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs () ! : `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docs (foo) : ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docs (foo)! : ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs (foo) !: `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs (foo) ! : `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docs (foo foo) : ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docs (foo foo)! : ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs (foo foo) !: `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs (foo foo) ! : `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docs ()!foo: ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs ()foo!: `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs ()foo!foo: `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docs (foo)foo: ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docs (foo)!foo: ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs (foo)foo!: `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs (foo)foo!foo: `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docs (foo foo)foo: ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docs (foo foo)!foo: ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs (foo foo)foo!: `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docs (foo foo)foo!foo: `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
   
    expect(" docsfooo() : ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo()! : ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo() !: `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo() ! : `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo(foo) : ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo(foo)! : ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo(foo) !: `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo(foo) ! : `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo(foo foo) : ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo(foo foo)! : ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo(foo foo) !: `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo(foo foo) ! : `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo()foo: ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo()!foo: ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo()foo!: `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo()foo!foo: `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo(foo)foo: ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo(foo)!foo: ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo(foo)foo!: `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo(foo)foo!foo: `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo(foo foo)foo: ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo(foo foo)!foo: ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo(foo foo)foo!: `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo(foo foo)foo!foo: `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
 
    expect(" docsfooo () : ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo () : ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo ()! : ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo () !: `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo () ! : `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo (foo) : ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo (foo)! : ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo (foo) !: `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo (foo) ! : `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo (foo foo) : ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo (foo foo)! : ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo (foo foo) !: `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo (foo foo) ! : `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo ()foo: ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo ()foo: ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo ()!foo: ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo ()foo!: `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo ()foo!foo: `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo (foo)foo: ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo (foo)!foo: ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo (foo)foo!: `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo (foo)foo!foo: `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo (foo foo)foo: ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(" docsfooo (foo foo)!foo: ".match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo (foo foo)foo!: `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
    expect(` docsfooo (foo foo)foo!foo: `.match(regexLeadingTrailingSpace)?.groups?.position).toBe(' ')
  })
})
