# Commit Harmonizer
[![Tests](https://github.com/aisevim/commit-harmonizer-action/workflows/Tests/badge.svg)](https://github.com/aisevim/commit-harmonizer-action)
[![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/aisevim/commit-harmonizer-action)](https://github.com/aisevim/commit-harmonizer-action/tags)

Enforce [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) format for **Commit** and **PR titles** with clear error output

> [!NOTE]
> Regular expressions (regex) are chosen for commit message validation due to their capability to precisely identify error positions. Unlike Conventional Commits Parser, regex provides detailed error localization, facilitating immediate and exact feedback on commit message errors. 

## Inputs

| Input            | Description                         | Required | Default                            |
| ---------------- | ----------------------------------- | -------- | ---------------------------------- |
| `github-token`   | Token for repository access         | true     |                                    |
| `check-pr-title` | Enable PR title checking            | false    | true                               |
| `check-commits`  | Enable last commit message checking | false    | true                               |
| `bypass-checks`  | A regex to bypass checks            | false    | `^wip\|Wip\|Merge\|Revert\|revert` |

## Usage

### On PR Title Edit and Last Commit Change

```yaml
name: Pull Request Message Checker

on:
  pull_request:
    types:
      - edited
      - opened
      - synchronize
      - reopened

jobs:
  check-commit:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Check Commit Message
        uses: aisevim/commit-harmonizer-action
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
```

### On PR Title Edit

```yaml
name: Pull Request Title Checker

on:
  pull_request:
    types:
      - edited


jobs:
  check-commit:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Check Commit Message
        uses: aisevim/commit-harmonizer-action
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          check-commits: false
```

### On Last Commit Change and disable bypass

```yaml
name: Pull Request Commit Message Checker

on:
  pull_request:
    types:
      - opened
      - synchronize
      - reopened


jobs:
  check-commit:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Check Commit Message
        uses: aisevim/commit-harmonizer-action
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          check-pr-title: false
          bypass-checks: ".+"
```

## Outputs Examples

![Log example-1](resources/output1.jpg) 

![Log example-2](resources/output2.jpg) 

![Log example-3](resources/output3.jpg) 

## License

This project is licensed under the [MIT License](LICENSE).


## Release Notes

See [CHANGELOG.md](CHANGELOG.md) for details on each release.