# Commit Harmonizer
[![Tests](https://github.com/aisevim/commit-harmonizer-action/workflows/Tests/badge.svg)](https://github.com/aisevim/commit-harmonizer-action)
[![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/aisevim/commit-harmonizer-action)](https://github.com/aisevim/commit-harmonizer-action/tags)


## Inputs

| Input            | Description                         | Required | Default |
| ---------------- | ----------------------------------- | -------- | ------- |
| `github-token`   | Token for repository access         | true     |         |
| `check-pr-title` | Enable PR title checking            | false    | true    |
| `check-commits`  | Enable last commit message checking | false    | true    |

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
        uses: aisevim/commit-harmonizer-action@v0.2.0
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
        uses: aisevim/commit-harmonizer-action@v0.2.0
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          check-commits: false
```

### On Last Commit Change

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
        uses: aisevim/commit-harmonizer-action@v0.2.0
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          check-pr-title: false
```

## Outputs Examples

![Log example-1](resources/output1.jpg) 

![Log example-2](resources/output2.jpg) 

![Log example-3](resources/output3.jpg) 

![Log example-4](resources/output4.jpg) 

## License

This project is licensed under the [MIT License](LICENSE).


## Release Notes

See [CHANGELOG.md](CHANGELOG.md) for details on each release.