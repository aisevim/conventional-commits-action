# Conventional Commit Checker

This GitHub Action checks commit messages against the conventional commit format.

## Inputs

### `commit-regex`

Regex pattern for commit message validation.

Default: `'^(wip|Merge?.+|Revert?.+)|(build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|release)(\([-A-Za-z0-9_ ]+\))?!?: .+'`

## Usage

```yaml
name: Pull Request Commit Message Checker

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  check-commit:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v2

      - name: Check Commit Message
        uses: aisevim/conventional-commit-checker@v1
        with:
          commit-regex: '^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([a-z]+\))?: .+'
```
