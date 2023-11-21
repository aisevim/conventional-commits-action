import core from "@actions/core"
import github from "@actions/github"

import { checkCommitMessages } from "./checker.js"

async function run() {
  try {
    const octokit = github.getOctokit(core.getInput('github-token')); // Tu dois fournir un token d'accès GitHub
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
      let text = ''

      if(github.context.payload.action === 'edited') {
        text = github.context.payload.pull_request?.title;
      } else {
        const commitsInfo = await getCommits(page)
        const commitInfo = commitsInfo?.at(-1)
        text = commitInfo?.commit?.message
      }
      const [isCommitInvalid, log] = checkCommitMessages(text)

      if (text && isCommitInvalid) {
        core.setFailed('The commit message does not adhere to the expected format.');
        core.warning(log);
        core.info(`Conventional Commits provide a standardized format for commit messages, enabling better collaboration among developers, automating the release process, and generating comprehensive changelogs.

The structure of a Conventional Commit message typically follows this format:
<type>(<scope>): <description>

<body>
<footer>

<type>: Describes the kind of change introduced (e.g., feat for a new feature, fix for a bug fix).
<scope> (optional): Indicates the specific part of the codebase affected by the change.
<description>: Briefly explains the change introduced in the commit.
<body> (optional): Provides additional context, details, or reasoning behind the change.
<footer> (optional): Includes information like issue tracker references or breaking changes.`);
      }
    }

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
