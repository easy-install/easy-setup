import { addPath, getInput, setOutput } from "@actions/core"
import { homedir } from "os"
import { join } from "path"
import { install } from "steal-cli"

install(
  {
    url: getInput("url"),
    version: getInput("version"),
    bin: getInput("bin"),
  },
  join(homedir(), "easy-setup"),
).then(({ installDir, version, downloadUrl }) => {
  addPath(installDir)
  setOutput("version", version)
  setOutput("download-url", downloadUrl)
  setOutput("install-dir", installDir)
})
