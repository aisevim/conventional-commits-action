export const regexSpaceAfterScopeBeforeColon = /^(?:build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|release)(?:.+)?(?:(?:\([-A-Za-z0-9_ ]+\)|\(\))!?)(?<position>(?!\!)(?:\s+)(?:\!)?(?:\s+)?):(?:\s)?(.+)?$/;

export const regexCharacterAfterScopeBeforeColon = /^(?:build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|release)(?:.+)?(?:(?:\([-A-Za-z0-9_ ]+\)|\(\))(?:\!)?)(?!\!)(?<position>\S+):(?:\s)?.+$/;

export const regexSpaceBetweenTypeAndScope = /^(?:build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|release)(?<position>\s+)(?:\((?:[-A-Za-z0-9_ ]+|)\))(?:\!)?:\s.+$/

export const regexCharacterBetweenTypeAndScope = /^(?:build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|release)(?<position>\S+)(?:\((?:[-A-Za-z0-9_ ]+|)\))(?:\!)?:\s.+$/

export const regexEmptyScope = /^(?:build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|release)(?:\s*)?(?<position>\(\))(?:(?:\s)?\!)?(?:\s*)?:\s*.+$/

export const regexEmptyDescription = /^(?:build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|release)(?:\((?:[-A-Za-z0-9_ ]+|)\))?!?:(?<position>\s*$)/;

export const regexLeadingTrailingSpace = /^(?<position>\s+)|$/;

export const regexUnknownType = /^(?!build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|release)(.*)*$/;

export const regexDefault = /^(?!(wip|Merge?.+|Revert?.+)|(build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|release)(\([-A-Za-z0-9_ ]+\))?!?: ).+/

export const regexByPass = /^(wip|Merge?.+|Revert?.+)/
