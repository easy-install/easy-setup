import { setup } from "./setup"

const repo = process.argv[2]
const version = process.argv[2]

if (!repo) {
  console.log("easy-setup <repo> [<version>]")
  process.exit()
}

setup({ repo, version }).then((output) => {
  console.log(output)
})
