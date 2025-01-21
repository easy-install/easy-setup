import { addPath, getInput, setOutput } from "@actions/core"
import { setup } from "./setup"

setup({
  repo: getInput("repo"),
  version: getInput("version"),
}).then(({ installDir, version, downloadUrl }) => {
  addPath(installDir)
  setOutput("version", version)
  setOutput("download-url", downloadUrl)
  setOutput("install-dir", installDir)
})
