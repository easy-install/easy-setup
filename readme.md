# easy-setup

Download, install, and setup in GitHub Actions.

## Usage

```yaml
- uses: ahaoboy/easy-setup@v1
  with:
    repo: https://github.com/denoland/deno
    version: latest
  env:
    # need for https://api.github.com/repos/denoland/deno/releases/latest
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

```yaml
- uses: ahaoboy/easy-setup@v1
  with:
    repo: https://github.com/ahaoboy/easy-install
    version: latest
    name: ei
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
