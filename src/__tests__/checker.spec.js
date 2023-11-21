import { expect, test, describe } from 'vitest'
import { checkCommitMessages } from '../checker'

describe('Generated Logs', () => {
  test("1 match on no description", () => {
		const [, log] = checkCommitMessages(`docs: `);
		expect(log).toMatchSnapshot()

		const [, log2] = checkCommitMessages(` docs: `);
		expect(log2).toMatchSnapshot()
  })

	test("2 match on no description, no scope description", () => {
		const [, log] = checkCommitMessages(`docs(): `);
		expect(log).toMatchSnapshot()
  })

	test("3 match on no description, no scope description, no space before scope and colon", () => {
		const [, log] = checkCommitMessages(`docs() : `);
		expect(log).toMatchSnapshot()
  })

	test("4 match on no description, no scope description, no space before scope and colon, no space after type and before scope", () => {
		const [, log] = checkCommitMessages(`docs () : `);
		expect(log).toMatchSnapshot()
  })

	test("with match on the same position", () => {
		const [, log] = checkCommitMessages(`docs:`);
		expect(log).toMatchSnapshot()

		const [, log2] = checkCommitMessages(`docsfoo()foo:`);
		expect(log2).toMatchSnapshot()
  })
})

describe('Has Errors', () => {
  test("return true on error", () => {
		const [hasError] = checkCommitMessages(`docs: `);
    expect(hasError).toBeTruthy()

		const [hasError2] = checkCommitMessages(``);
    expect(hasError2).toBeTruthy()
  })

	test("return false on valid", () => {
		const [hasError] = checkCommitMessages(`docs: fooo`);
    expect(hasError).toBeFalsy()
  })
})
