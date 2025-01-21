import { addPath, getInput, setOutput } from "@actions/core"
import { setup } from "./setup"

setup({
  repo: getInput("repo"),
  version: getInput("version"),
}).then(({ dir, version, downloadUrl }) => {
  addPath(dir)
  setOutput("version", version)
  setOutput("download-url", downloadUrl)
  setOutput("dir", dir)
})
