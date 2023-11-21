export const rulesConfig = [
  {
    id: 'EmptyDescription',
    regex: /^(?:build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|release)(?:.+)?(?:\((?:[-A-Za-z0-9_ ]+|)\))?!?:(?<position>(?:\s+)?)$/d,
    errorMessage: 'The commit message has an empty description.'
  },
  {
    id: 'Missing Colon',
    regex: /^(?!.*:).*(?<position>)$/d,
    errorMessage: 'Missing Colon',
  },
  {
    id: 'Missing Space',
    regex: /^(?:build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|release)(.+)?:(?<position>(?!\s))(.+)?/d,
    errorMessage: 'The commit message should have a space after the colon.',
  },
  {
    id: 'LeadingTrailingSpace',
    regex: /^(?<position>\s+)(?:build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|release)(.+)?:(.+)?/d,
    errorMessage: 'The commit message should not have leading/trailing spaces.',
    fix: true,
  },
  {
    id: 'UnknownType',
    regex: /^(?!(?:build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|release))(\s+)?\b(?!(?:build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|release)\b)(?<position>[-A-Za-z0-9_ ]+)\b(?=.*:)/d,
    errorMessage: 'The commit type is unknown or misspelled.',
  },
  {
    id: 'SpaceAfterScopeBeforeColon',
    regex: /^(?:build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|release)(?:.+)?(?:(?:\([-A-Za-z0-9_ ]+\)|\(\))!?)(?<position>(?:\s+)(?:\!)?(?:\s+)?):(?:\s)?(?:.+)?/d,
    errorMessage: 'The commit message should not have spaces before the colon.',
    fix: true,
  },
  {
    id: 'CharacterAfterScopeBeforeColon',
    regex: /^(?:build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|release)(?:.+)?(?:(?:\([-A-Za-z0-9_ ]+\)|\(\))(?:\!)?)(?!\!)(?<position>\S+):(?:\s)?(.+)?/d,
    errorMessage: 'The commit message contains an invalid character before the colon.',
    fix: true,
  },
  {
    id: 'EmptyScope',
    regex: /^(?:build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|release)(?:.+)?(?<position>\(\))(?:(?:.+)?\!)?(?:.+)?:(?:\s)?(.+)?/d,
    errorMessage: 'The commit message has an empty scope.'
  },
  {
    id: 'SpaceBetweenTypeAndScope',
    regex: /^(?:build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|release)(?<position>\s+)(?:(?:\([-A-Za-z0-9_ ]+\))|(\(\)))(?:.+)?:(?:\s)?(.+)?/d,
    errorMessage: 'The commit message should not have a space between the type and the scope.'
  },
  {
    id: 'CharacterBetweenTypeAndScope',
    regex: /^(?:build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|release)(?<position>\S+)(?:(?:\([-A-Za-z0-9_ ]+\))|(\(\)))(?:.+)?:(?:\s)?(.+)?/d,
    errorMessage: 'The commit message contains an invalid character between the type and the scope.'
  },
];
