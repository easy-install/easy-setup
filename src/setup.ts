import path from "path"
import { Repo } from "./repo"
import { download, extractTo } from "./tool"
import type { Input, Output } from "./type"
import { homedir, } from "os"

export async function setup(input: Input): Promise<Output> {
  const { repo, version = "latest", bin } = input
  const url = await new Repo(repo).getAssetUrl(bin, version)
  const installDir = path.join(homedir(), "easy-setup")
  const downloadPath = await download(url)
  await extractTo(downloadPath, installDir)
  return {
    version,
    installDir: installDir,
    downloadUrl: url,
  }
}
