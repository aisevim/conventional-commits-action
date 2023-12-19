export const rulesConfig = [
  {
    id: 'MaxCharacters',
    regex: /.{50}(?<position>.+)/d,
    errorMessage: 'The commit message summary be no longer than 50 characters.',
  },
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
    regex: /^(?:chore|docs|feat|fix|perf|refactor|style|test)(?:.+)?(?:\((?:[-A-Za-z0-9_ ]+|)\))?!?:(?<position>(?:\s+)?)$/d,
    errorMessage: 'Missing or empty commit description.',
  },
  {
    id: 'MissingColon',
    regex: /^(?!$)(?!.*:).*(?<position>)$/d,
    errorMessage: 'Colon is missing in the commit message structure.',
  },
  {
    id: 'MissingSpace',
    regex: /^(?:chore|docs|feat|fix|perf|refactor|style|test)(.+)?:(?<position>(?!\s))(.+)?/d,
    errorMessage: 'Space after the colon is required.',
  },
  {
    id: 'UnknownType',
    regex: /^(?!(?:chore|docs|feat|fix|perf|refactor|style|test))(\s+)?\b(?!(?:chore|docs|feat|fix|perf|refactor|style|test)\b)(?<position>[-A-Za-z0-9_ ]+)\b(?=.*:)/d,
    errorMessage: 'Unrecognized commit type used.',
  },
  {
    id: 'LeadingTrailingSpace',
    regex: /^(?<position>\s+)(.+)?:(.+)?/d,
    errorMessage: 'Avoid leading or trailing spaces in the commit message.',
  },
  {
    id: 'CharacterAfterScopeBeforeColon',
    regex: /^(?:chore|docs|feat|fix|perf|refactor|style|test)(?:.+)?(?:(?:\([-A-Za-z0-9_ ]+\)|\(\))(?:!)?)(?<position>.+)?:(.+)?/d,
    errorMessage: 'Unexpected character before the colon in the commit message.',
  },
  {
    id: 'EmptyScope',
    regex: /^(?:chore|docs|feat|fix|perf|refactor|style|test)(?:.+)?(?<position>\(\))(?:(?:.+)?!)?(?:.+)?:(.+)?/d,
    errorMessage: 'Empty commit scope provided.',
  },
  {
    id: 'CharacterBetweenTypeAndScope',
    regex: /^(?:chore|docs|feat|fix|perf|refactor|style|test)(?<position>.+)(?:(?:\([-A-Za-z0-9_ ]*\))|(\(\)))(.+)?:(.+)?/d,
    errorMessage: 'Unexpected character between commit type and scope.',
  },
  {
    id: 'CharacterBetweenTypeAndColon',
    regex: /^(?:chore|docs|feat|fix|perf|refactor|style|test)(?!(?:.*)(\([-A-Za-z0-9_ ]+\)|\(\)))(?:!?|!?(?<position>.+)):(?:.+)?/d,
    errorMessage: 'Unexpected character between commit type and colon.',
  },
]
