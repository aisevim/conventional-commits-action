import core from '@actions/core'
import github from '@actions/github';

import { REGEX_COMMIT } from './const';

try {
  const commitMessage = github.context.payload.head_commit.message;
	const commitRegex = core.getInput('commit-regex') || REGEX_COMMIT;

  if (!commitRegex.test(commitMessage)) {
    core.setFailed('The commit message does not adhere to the expected format.');
    core.warning('The commit message should have the format:\n');
    core.warning('<type> [<optional scope>]: <description>\n');
    core.warning('body\n');
    core.warning('footer');
  }
} catch (error) {
  core.setFailed(error.message);
}
