import core from "@actions/core"
import github from "@actions/github"

import { checkCommitMessages } from "./checkCommitMessages"

async function run() {
  try {
    const octokit = github.getOctokit(core.getInput('github-token')); // Tu dois fournir un token d'accès GitHub
    const commitRegex = new RegExp(core.getInput('commit-regex'));
    const maxCommitsPerPage = 100
    let page = 1
    let commits = []

    async function getCommits(page) {
      const commitsInfo = await octokit.rest.pulls.listCommits({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        pull_number: github.context.payload.pull_request?.number,
        per_page: maxCommitsPerPage,
        page
      });

      commits.push(...commitsInfo.data)

      if (commitsInfo.length === maxCommitsPerPage) {
        page++
        commits.push(...(await getCommits(page)))
      }

      return commits
    }

    if (github.context.eventName === 'pull_request') {
      const commitsInfo = await getCommits(page)
      const commitInfo = commitsInfo?.at(-1)
      const commitMessage = commitInfo?.commit?.message
      const [isCommitInvalid, log] = checkCommitMessages(commitMessage)

      if (commitMessage && isCommitInvalid) {
        core.setFailed('The commit message does not adhere to the expected format.');
        core.warning(log);
      }
    }

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
