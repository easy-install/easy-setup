# easy-setup

Download, install, and setup in GitHub Actions.

The `ei` executable is installed with the official installer when it is not
already available — PowerShell on Windows, `sh` on Linux and macOS — and every
entry of the `url` input is then passed to the `ei` command line.

## Usage

```yaml
- uses: easy-install/easy-setup@v1
  with:
    url: https://github.com/denoland/deno
  env:
    # need for https://api.github.com/repos/denoland/deno/releases/latest
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

```yaml
- uses: easy-install/easy-setup@v1
  with:
    url: |-
      https://github.com/denoland/deno
      https://github.com/ahaoboy/easy-install/raw/refs/heads/main/dist-manifest/node.json
      https://github.com/ahaoboy/easy-install/raw/refs/heads/main/dist-manifest/bun.json
```

Each line is one `ei` command, and its arguments are split on spaces, so `ei`
flags such as `--name` and `--alias` can be used:

```yaml
- uses: easy-install/easy-setup@v1
  with:
    url: |-
      quickjs-ng/quickjs --name qjs --alias qjs-ng
      denoland/deno
```
