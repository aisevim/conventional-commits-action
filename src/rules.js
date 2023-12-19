export const rulesConfig = [
  {
    id: 'EmptyCommit',
    regex: /^(?<position>)$/d,
    errorMessage: 'Empty commit message.',
  },
  {
    id: 'OnlyColon',
    regex: /^(?<position>:)$/d,
    errorMessage: 'Missing commit type and description.',
  },
  {
    id: 'EmptyDescription',
    regex: /^(?:build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|release)(?:.+)?(?:\((?:[-A-Za-z0-9_ ]+|)\))?!?:(?<position>(?:\s+)?)$/d,
    errorMessage: 'Missing or empty commit description.',
  },
  {
    id: 'MissingColon',
    regex: /^(?!$)(?!.*:).*(?<position>)$/d,
    errorMessage: 'Colon is missing in the commit message structure.',
  },
  {
    id: 'MissingSpace',
    regex: /^(?:build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|release)(.+)?:(?<position>(?!\s))(.+)?/d,
    errorMessage: 'Space after the colon is required.',
  },
  {
    id: 'LeadingTrailingSpace',
    regex: /^(?<position>\s+)(?:build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|release)(.+)?:(.+)?/d,
    errorMessage: 'Avoid leading or trailing spaces in the commit message.',
  },
  {
    id: 'UnknownType',
    regex: /^(?!(?:build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|release))(\s+)?\b(?!(?:build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|release)\b)(?<position>[-A-Za-z0-9_ ]+)\b(?=.*:)/d,
    errorMessage: 'Unrecognized commit type used.',
  },
  {
    id: 'CharacterAfterScopeBeforeColon',
    regex: /^(?:build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|release)(?:.+)?(?:(?:\([-A-Za-z0-9_ ]+\)|\(\))(?:!)?)(?<position>.+)?:(.+)?/d,
    errorMessage: 'Unexpected character before the colon in the commit message.',
  },
  {
    id: 'EmptyScope',
    regex: /^(?:build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|release)(?:.+)?(?<position>\(\))(?:(?:.+)?!)?(?:.+)?:(.+)?/d,
    errorMessage: 'Empty commit scope provided.',
  },
  {
    id: 'CharacterBetweenTypeAndScope',
    regex: /^(?:build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|release)(?<position>.+)(?:(?:\([-A-Za-z0-9_ ]*\))|(\(\)))(.+)?:(.+)?/d,
    errorMessage: 'Unexpected character between commit type and scope.',
  },
  {
    id: 'CharacterBetweenTypeAndColon',
    regex: /^(?:build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|release)(?!(?:.*)(\([-A-Za-z0-9_ ]+\)|\(\)))(?:!?|!?(?<position>.+)):(?:.+)?/d,
    errorMessage: 'Unexpected character between commit type and colon.',
  },
]
