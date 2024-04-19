import core from '@actions/core'
import github from '@actions/github'

import { processCommitMessage } from './commit-log-processor.js'
import { ignoreByRegex } from './utils.js'

const MAX_PER_PAGE = 100

async function run() {
  const onActions = (
    github.context.payload.action === 'edited' ||
    github.context.payload.action === 'opened' ||
    github.context.payload.action === 'synchronize' ||
    github.context.payload.action === 'reopened'
  )
  if (github.context.eventName !== 'pull_request' || !onActions) {
    return
  }

  try {
    const octokit = github.getOctokit(core.getInput('github-token'))
    const hasTitlePR = core.getInput('check-pr-title')
    const hasCommits = core.getInput('check-commits')
    const bypass = core.getInput('bypass-checks')
    const logs = []
    let text = ''

    if (hasTitlePR) {
      text = github.context.payload.pull_request?.title ?? ''
      logs.push({ text, type: 'pr-title' })
    }

    if (hasCommits) {
      const commitsInfo = await getCommits(octokit)
      const commitInfo = commitsInfo?.at(-1)
      text = commitInfo?.commit?.message ?? ''
      logs.push({ text, type: 'pr-commit' })
    }

    generateLog(ignoreByRegex(logs, bypass))
  } catch (error) {
    core.setFailed(error.message)
  }
}

async function getCommits(octokit) {
  return octokit.paginate(octokit.rest.pulls.listCommits, {
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    pull_number: github.context.payload.pull_request?.number,
    per_page: MAX_PER_PAGE,
  })
}

function generateLog(_logs) {
  let hasError = false

  _logs.forEach(({ text, type }) => {
    const [isCommitInvalid, log] = processCommitMessage(text)
    const logType = type === 'pr-title' ? 'PR title' : 'commit message'

    if (isCommitInvalid) {
      core.setFailed(`The ${ logType } does not adhere to the expected format.`)
      core.info(log)
      hasError = true
    }
  })

  if (hasError) {
    core.info(`Conventional Commits provide a standardized format for commit messages, enabling better collaboration among developers, automating the release process, and generating comprehensive changelogs.

The structure of a Conventional Commit message typically follows this format:
<type>(<scope>): <description>

<body>

<footer>

<type>: Describes the kind of change introduced (e.g., feat for a new feature, fix for a bug fix).
<scope> (optional): Indicates the specific part of the codebase affected by the change.
<description>: Briefly explains the change introduced in the commit.
<body> (optional): Provides additional context, details, or reasoning behind the change.
<footer> (optional): Includes information like issue tracker references or breaking changes.`)
  }
}

run()
