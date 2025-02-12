import { getInput, } from '@actions/core'
import { homedir } from 'os'
import { join } from 'path'
import { install, addOutputToPath } from '@easy-install/easy-install'

install(
  {
    url: getInput('url'),
    version: getInput('version'),
    name: getInput('name'),
  },
  join(homedir(), '.easy-setup'),
).then(addOutputToPath)