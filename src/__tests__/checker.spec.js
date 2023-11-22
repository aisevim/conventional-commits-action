import { expect, test, describe } from 'vitest'
import { checkCommitMessages } from '../checker'

describe('Generated Logs', () => {
  test("1 match on no description", () => {
		const [, log] = checkCommitMessages(`docs : Update documentation`);
		expect(log).toMatchSnapshot()
  })

	test("2 match on no description", () => {
		const [, log] = checkCommitMessages(`docs(): `);
		expect(log).toMatchSnapshot()
  })

	test("3 match on no description", () => {
		const [, log] = checkCommitMessages(`docs() : `);
		expect(log).toMatchSnapshot()
  })

	test("4 match on no description", () => {
		const [, log] = checkCommitMessages(`docs () : `);
		expect(log).toMatchSnapshot()
  })

	test("5 match on no description", () => {
		const [, log] = checkCommitMessages(`docs () : `);
		expect(log).toMatchSnapshot()
  })

	test("colon missing", () => {
		const [, log] = checkCommitMessages(`Update documentation`);
		expect(log).toMatchSnapshot()
  })

	test("space before", () => {
		const [, log] = checkCommitMessages(` docs: Update documentation`);
		expect(log).toMatchSnapshot()

		const [, log2] = checkCommitMessages(` docs:`);
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
