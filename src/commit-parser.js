import { regexSpaceAfterScopeBeforeColon, regexSpaceBetweenTypeAndScope, regexInvalidBracesAndParentheses } from "./regex.js"

const commitMessages = [
    "feat: Add new feature",
    "feat!: Add new feature",
    "feat(asd): Add new feature",
    "feat(asd)!: Add new feature",

    // // regexSpaceAfterScopeBeforeColon
    "feat(asd) : Add new feature",
    "feat(asd)! : Add new feature",
    "feat(asd) !: Add new feature",
    "docs() : Update documentation",
    "docs()! : Update documentation",
    "docs() !: Update documentation",

    // regexSpaceBetweenTypeAndScope
    "feat (asd): Add new feature",
    "feat (asd)!: Add new feature",

    "docs() : Update documentation",
    "docs()! : Update documentation",
    `docs() !: Update documentation`,
    `docs()asdas!: Update documentation`,
    `docs()!asdasd: Update documentation`,
    `docs()asdas5!asdasd: Update documentation`,

    " fix:  Bug fix",
    "fix:  Bug fix ",
    "docs{docs: Update documentation",
    "docs{docs}: Update documentation",
    "docs[docs: Update documentation",
    " chore: Format code ",
    "Invalid commit message ",
    "chore: Add new feature",
    "fix: ",
    "docs: Update documentation",
    "feat: Add new feature: ",
    "feat(scope) Add new feature",
    " chore: Format code",
  ];
  const regexByPass = /^(wip|Merge?.+|Revert?.+)/
  
  const regexLeadingTrailingSpace = /^\s+|\s+$/;
  const regexUnknownType = /^(?!build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|release)[^:]*$/;

  commitMessages.forEach((message) => {
    console.log(message)
    // console.log(regexSpaceAfterScopeBeforeColon.exec(message));
    // console.log(message.match(regexSpaceAfterScopeBeforeColon));
    // console.log(`Leading/Trailing space: ${regexLeadingTrailingSpace.test(message)}`);
    // console.log(`Empty description: ${regexEmptyDescription.test(message)}`);
    // console.log(`Empty scope: ${regexEmptyScope.test(message)}`);
    // // console.log(`Missing colon in description: ${regexMissingColonInDescription.test(message)}`);
    // console.log(`Unknown type: ${regexUnknownType.test(message)}`);
    console.log(`Space Between Type And Scope: ${regexInvalidBracesAndParentheses.test(message)}`);
    // console.log(`Space After Scope Before Colon: ${regexSpaceAfterScopeBeforeColon.test(message)}`);
    console.log("------------");
  });
