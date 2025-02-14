import { getMultilineInput } from '@actions/core'
import { homedir } from 'os'
import { join } from 'path'
import { addOutputToPath, install } from '@easy-install/easy-install'

const urlList = getMultilineInput('url')
const versionList = getMultilineInput('version')
const nameList = getMultilineInput('name')

async function main() {
  for (let i = 0; i < urlList.length; i++) {
    const url = urlList[i]
    const version = versionList[i]
    const name = nameList[i]
    await install(
      {
        url,
        version,
        name,
      },
      join(homedir(), '.easy-setup'),
    ).then(addOutputToPath)
  }
}

main()
