# Commit Harmonizer

This GitHub Action verifies commit messages and PR titles against the *Conventional Commit* format.

## Inputs

| Input           | Description                                   | Required | Default |
| --------------- | --------------------------------------------  | -------- | ------- |
| `github-token`  | Token for repository access                   | true     |         |
| `has-pr-title`  | Enable PR title checking                      | false    | true    |
| `has-commits`   | Enable last commit message checking           | false    | true    |

## Usage

### On PR Open and Last Commit

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
        uses: aisevim/commit-harmonizer-action@v1
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
        uses: aisevim/commit-harmonizer-action@v1
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
        uses: aisevim/commit-harmonizer-action@v1
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
     ┆╵--- Unexpected character before the colon in the commit message.
     ┆
     ╵--- Empty commit scope provided.
```

`feat ():`
```sh
feat ():
    ↑ ↑ ↑
    ┆ ┆ ┆
    ┆ ┆ ┆--- Missing or empty commit description.
    ┆ ┆ ┆
    ┆ ┆ ╵--- Space after the colon is required.
    ┆ ┆
    ┆ ╵--- Empty commit scope provided.
    ┆
    ╵--- Unexpected character between commit type and scope.
```

`fzeat (): new feat`
```sh
fzeat (): new feat
  ↑
  ┆
  ╵--- Unrecognized commit type used.
```

## License

This project is licensed under the [MIT License](LICENSE).


## Release Notes

See [CHANGELOG.md](CHANGELOG.md) for details on each release.
