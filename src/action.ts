// FIXME: https://github.com/actions/toolkit/issues/1959
// import { getMultilineInput } from '@actions/core'

/**
 * Interface for getInput options
 */
export interface InputOptions {
  /** Optional. Whether the input is required. If required and not present, will throw. Defaults to false */
  required?: boolean

  /** Optional. Whether leading/trailing whitespace will be trimmed for the input. Defaults to true */
  trimWhitespace?: boolean
}
/**
 * Gets the value of an input.
 * Unless trimWhitespace is set to false in InputOptions, the value is also trimmed.
 * Returns an empty string if the value is not defined.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
export function getInput(name: string, options?: InputOptions): string {
  const val: string =
    process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || ''
  if (options && options.required && !val) {
    throw new Error(`Input required and not supplied: ${name}`)
  }

  if (options && options.trimWhitespace === false) {
    return val
  }

  return val.trim()
}
/**
 * Gets the values of an multiline input.  Each value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string[]
 */

export function getMultilineInput(
  name: string,
  options?: InputOptions,
): string[] {
  const inputs: string[] = getInput(name, options)
    .replaceAll(",", "\n")
    .split('\n')
    .filter((x) => x !== '')

  if (options && options.trimWhitespace === false) {
    return inputs
  }

  return inputs.map((input) => input.trim())
}


import { install } from '@easy-install/easy-install'
import { version } from '../package.json'
import { exec } from 'child_process'

const urlList = getMultilineInput('url')

async function main() {
  console.log(`easy-setup: ${version}`)
  console.log(`nodejs: ${process.version}`);
  for (let i = 0; i < urlList.length; i++) {
    const url = urlList[i]
    exec(`ei ${url}`, )
  }
}

main()
