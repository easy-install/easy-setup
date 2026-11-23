#!/usr/bin/env bash
#
# Runs `ei` for every entry of the `url` input. Each line is a single `ei`
# invocation whose arguments are split on whitespace, for example:
#   quickjs-ng/quickjs --name qjs --alias qjs-ng

set -euo pipefail

find_ei() {
  local ei_dir="${EI_DIR:-$HOME/.ei}"

  case "$ei_dir" in
    "~/"*) ei_dir="$HOME/${ei_dir#\~/}" ;;
  esac

  if command -v ei >/dev/null 2>&1; then
    command -v ei
  elif [[ -x "$ei_dir/ei" ]]; then
    printf '%s\n' "$ei_dir/ei"
  else
    echo "Error: ei was not found, run the install step first" >&2
    return 1
  fi
}

main() {
  local ei
  ei="$(find_ei)"
  echo "ei: $ei"

  local input="${INPUT_URL:-}"
  if [[ -z "$(printf '%s' "$input" | tr -d '[:space:]')" ]]; then
    echo "Error: Input required and not supplied: url" >&2
    exit 1
  fi

  # One `ei` command line per entry: newlines or commas separate the commands.
  local commands
  commands="$(
    printf '%s\n' "$input" |
      tr ',' '\n' |
      sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//' |
      sed '/^$/d'
  )"
  if [[ -z "$commands" ]]; then
    echo "Error: Input required and not supplied: url" >&2
    exit 1
  fi

  local line
  local -a args
  while IFS= read -r line; do
    read -r -a args <<<"$line"
    echo "→ Running: ei ${args[*]}"
    "$ei" "${args[@]}"
  done <<<"$commands"
}

main "$@"
