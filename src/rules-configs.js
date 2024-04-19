export const rulesConfig = [
  {
    id: 'MaxCharacters',
    regex: /.{72}(?<position>.+)/d,
    color: 'red',
    errorMessage: 'Commit summary must be under 72 characters.',
  },
  {
    id: 'EmptyCommit',
    regex: /^(?<position>)$/d,
    color: 'white',
    errorMessage: 'Empty commit message.',
  },
  {
    id: 'MissingDescription',
    regex: /^(?:.+)?(?:\((?:[-A-Za-z0-9_ ]+|)\))?!?:(?<position>(?:\s+)?)$/d,
    color: 'white',
    errorMessage: 'Missing commit description.',
  },
  {
    id: 'MissingSpace',
    regex: /^(?:chore|docs|feat|fix|perf|refactor|style|test|build)?(.+)?:(?<position>(?!\s))(.+)?/d,
    color: 'white',
    errorMessage: 'Space after the colon is required.',
  },
  {
    id: 'MissingType',
    regex: /^(\W+)?(?<position>:)/d,
    color: 'yellow',
    errorMessage: 'Missing commit type.',
  },
  {
    id: 'MissingColon',
    regex: /^(?!$)(?!.*:).*(?<position>)$/d,
    color: 'white',
    errorMessage: 'Colon is missing in the commit message structure.',
  },
  {
    id: 'CharacterAfterScopeBeforeColon',
    regex: /^(?:chore|docs|feat|fix|perf|refactor|style|test|build)(?:.+)?(?:(?:\([-A-Za-z0-9_ ]+\)|\(\))(?:!)?)(?<position>.+)?:(.+)?/d,
    color: 'yellow',
    errorMessage: 'Unexpected character before the colon in the commit message.',
  },
  {
    id: 'EmptyScope',
    regex: /^(?:.+)?(?<position>\(\))(?:(?:.+)?!)?(?:.+)?:(.+)?/d,
    color: 'magenta',
    errorMessage: 'Empty commit scope provided.',
  },
  {
    id: 'CharacterBetweenTypeAndScope',
    regex: /^(?:chore|docs|feat|fix|perf|refactor|style|test|build)(?<position>.+)(?:(?:\([-A-Za-z0-9_ ]*\))|(\(\)))(.+)?:(.+)?/d,
    color: 'cyan',
    errorMessage: 'Unexpected character between commit type and scope.',
  },
  {
    id: 'CharacterBetweenTypeAndColon',
    regex: /^(?:chore|docs|feat|fix|perf|refactor|style|test|build)(?!(?:.*)(\([-A-Za-z0-9_ ]+\)|\(\)))(?:!?|!?(?<position>.+)):(?:.+)?/d,
    color: 'blue',
    errorMessage: 'Unexpected character between commit type and colon.',
  },
  {
    id: 'UnknownType',
    regex: /^(?!(?:chore|docs|feat|fix|perf|refactor|style|test|build))(\s+)?\b(?!(?:chore|docs|feat|fix|perf|refactor|style|test|build)\b)(?<position>[-A-Za-z0-9_ ]+)\b(?=.*:)/d,
    color: 'blue',
    errorMessage: 'Unrecognized commit type used.',
  },
  {
    id: 'LeadingTrailingSpace',
    regex: /^(?<position>\s+)(.+)?:(.+)?/d,
    color: 'cyan',
    errorMessage: 'Avoid leading or trailing spaces in the commit message.',
  },
]
