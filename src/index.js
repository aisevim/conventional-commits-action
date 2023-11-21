import core from "@actions/core"
import github from "@actions/github"

import { checkCommitMessages } from "./checker.js"

const maxCommitsPerPage = 100

async function run() {
  if (github.context.eventName !== 'pull_request') {
    return
  }

  try {
    const octokit = github.getOctokit(core.getInput('github-token'));
    const hasTitlePR = core.getInput('has-title-pr')
    const hasCommits = core.getInput('has-commits')
    const onPRTitleChange = hasTitlePR && (
      github.context.payload.action === 'edited' &&
      github.context.payload.changes?.title
    )
    const onCommitChange = hasCommits && (
      github.context.payload.action === 'opened' ||
      github.context.payload.action === 'synchronize' ||
      github.context.payload.action === 'reopened'
    )
    let page = 1
    let text = ''

    if (onPRTitleChange) {
      text = github.context.payload.pull_request?.title ?? ''
      console.log(text)
      generateLog(text, 'pr-title')
    }

    if (onCommitChange) {
      const commitsInfo = await getCommits(octokit, page)
      const commitInfo = commitsInfo?.at(-1)
      text = commitInfo?.commit?.message ?? ''
      generateLog(text, 'pr-commit')
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

async function getCommits(octokit, page) {
  let commits = []
  
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

function generateLog(text, type) {
  const [isCommitInvalid, log] = checkCommitMessages(text)
  console.log('isCommitInvalid', isCommitInvalid)
  console.log('log', log)
  const logType = type === 'pr-title' ? 'PR title' : 'commit message'

  if (isCommitInvalid) {
    core.setFailed(`The ${logType} does not adhere to the expected format.`);
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

run();
