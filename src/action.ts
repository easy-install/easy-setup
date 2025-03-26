// FIXME: https://github.com/actions/toolkit/issues/1959
// import { getMultilineInput } from '@actions/core'
import { getMultilineInput } from './tool'
import { install } from '@easy-install/easy-install'
import { version } from '../package.json'

const urlList = getMultilineInput('url')
const nameList = getMultilineInput('name')

async function main() {
  console.log(`easy-setup: ${version}`)
  console.log(`nodejs: ${process.version}`);
  for (let i = 0; i < urlList.length; i++) {
    const url = urlList[i]
    const name = nameList[i]
    await install(url, name)
  }
}

main()
