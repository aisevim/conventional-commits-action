# Conventional Commit Checker

This GitHub Action verifies commit messages and PR titles against the conventional commit format.

## Inputs

| Input           | Description                                   | Required | Default |
| --------------- | --------------------------------------------  | -------- | ------- |
| `github-token`  | Token for repository access                   | true     |         |
| `has-pr-title`  | Enable PR title checking                      | false    | true    |
| `has-commits`   | Enable last commit message checking           | false    | true    |

## Usage

### On PR Open, Edit, or Sync and Last Commit

```yaml
name: Pull Request Message Checker

on:
  pull_request:
    types: [edited, opened, synchronize, reopened]

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

### On PR Title Edit

```yaml
name: Pull Request Title Checker

on:
  pull_request:
    types: [edited]


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
          has-commits: false
```

### On Last Commit Change

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
          has-pr-title: false
```

## Outputs Examples

`feat() : new feature`
```sh
feat() : new feature
     ↑↑
     ┆┆
     ┆╵--- The commit message should not have spaces before the colon.
     ┆
     ╵--- The commit message has an empty scope.
```

`feat ():`
```sh
feat ():
    ↑ ↑ ↑
    ┆ ┆ ┆
    ┆ ┆ ┆--- The commit message has an empty description.
    ┆ ┆ ┆
    ┆ ┆ ╵--- The commit message should have a space after the colon.
    ┆ ┆
    ┆ ╵--- The commit message has an empty scope.
    ┆
    ╵--- The commit message should not have a space between the type and the scope.
```

`fzeat (): new feat`
```sh
fzeat (): new feat
  ↑
  ┆
  ╵--- The commit type is unknown or misspelled.
```

## License

This project is licensed under the [MIT License](LICENSE).
