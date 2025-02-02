import { addPath, getInput, setOutput } from '@actions/core'
import { homedir } from 'os'
import { join } from 'path'
import { install } from '@easy-install/easy-install'

install(
  {
    url: getInput('url'),
    version: getInput('version'),
    name: getInput('name'),
  },
  join(homedir(), '.easy-setup'),
).then((output) => {
  for (const { installDir } of output) {
    if (installDir) {
      addPath(installDir)
      console.log(`easy-setup: addPath`, installDir)
    }
    setOutput('install-dir', installDir)
  }
})
