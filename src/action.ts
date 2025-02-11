import { addPath, getInput, setOutput } from '@actions/core'
import { homedir } from 'os'
import { join } from 'path'
import { addGithubPath, hasPath, isGithub } from 'crud-path'
import { install, addExecutePermission } from '@easy-install/easy-install'

install(
  {
    url: getInput('url'),
    version: getInput('version'),
    name: getInput('name'),
  },
  join(homedir(), '.easy-setup'),
).then((output) => {
  for (const files of Object.values(output)) {
    for (const item of files) {
      const { installDir } = item
      if (installDir && !hasPath(installDir)) {
        addPath(installDir)
        if (isGithub()) {
          addGithubPath(installDir)
        }
      }
    }
    if (files.length === 1 && files[0].installPath) {
      const first = files[0].installPath
      if (first) {
        addExecutePermission(first)
      }
    }
  }
})