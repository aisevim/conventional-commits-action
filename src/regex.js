export const regexSpaceAfterScopeBeforeColon = /^(?:build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|release)(?:.+)?(?:(?:\([-A-Za-z0-9_ ]+\)|\(\))!?)(?<position>(?:\s+)(?:\!)?(?:\s+)?):(?:\s)?(?:.+)?/d;

export const regexCharacterAfterScopeBeforeColon = /^(?:build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|release)(?:.+)?(?:(?:\([-A-Za-z0-9_ ]+\)|\(\))(?:\!)?)(?!\!)(?<position>\S+):(?:\s)?(.+)?/d;

export const regexSpaceBetweenTypeAndScope = /^(?:build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|release)(?<position>\s+)(?:(?:\([-A-Za-z0-9_ ]+\))|(\(\)))(?:.+)?:(?:\s)?(.+)?/d

export const regexCharacterBetweenTypeAndScope = /^(?:build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|release)(?<position>\S+)(?:(?:\([-A-Za-z0-9_ ]+\))|(\(\)))(?:.+)?:(?:\s)?(.+)?/d

export const regexEmptyScope = /^(?:build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|release)(?:.+)?(?<position>\(\))(?:(?:.+)?\!)?(?:.+)?:(?:\s)?(.+)?/d

export const regexEmptyDescription = /^(?:build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|release)(?:.+)?(?:\((?:[-A-Za-z0-9_ ]+|)\))?!?:(?<position>(?:\s+)?)$/d

export const regexLeadingTrailingSpace = /^(?<position>\s+)(?:build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|release)(.+)?:(.+)?/d

export const regexUnknownType = /^(?!(?:build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|release))(\s+)?\b(?!(?:build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|release)\b)(?<position>[-A-Za-z0-9_ ]+)\b(?=.*:)/d;
