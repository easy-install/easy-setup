#!/usr/bin/env bash

get_input() {
  local name="$1"
  local required="${2:-false}"
  local trim_whitespace="${3:-true}"
  local var_name="INPUT_$(echo "$name" | tr '[:lower:]' '[:upper:]' | tr ' ' '_')"
  local val="${!var_name:-}"

  if [[ "$required" == "true" && -z "$val" ]]; then
    echo "Error: Input required and not supplied: $name" >&2
    exit 1
  fi

  if [[ "$trim_whitespace" == "true" ]]; then
    val="$(echo "$val" | xargs)"
  fi

  echo "$val"
}

get_multiline_input() {
  local name="$1"
  local val
  val="$(get_input "$name")"
  echo "$val" | tr ',' '\n' | sed '/^[[:space:]]*$/d'
}

main() {
  local urls
  urls=($(get_multiline_input "url"))

  for url in "${urls[@]}"; do
    echo "→ Running: ei $url"
    ei "$url"
  done
}

main "$@"
