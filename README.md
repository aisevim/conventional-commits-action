# Conventional Commit Checker

This GitHub Action checks commit messages against the conventional commit format.

## Inputs

### `github token`

This action requires the `github token` for repository access.

## Usage

On last commit

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
        uses: actions/checkout@v4

      - name: Check Commit Message
        uses: aisevim/conventional-commit-checker@v1
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
```

On title or description change

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
        uses: actions/checkout@v4

      - name: Check Commit Message
        uses: aisevim/conventional-commit-checker@v1
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
```
