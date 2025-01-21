import path from "path"
import { Repo } from "./repo"
import { download, extractTo } from "./tool"
import type { Input, Output } from "./type"
import { homedir, tmpdir } from "os"
export async function setup(input: Input): Promise<Output> {
  const { repo, version = "latest" } = input
  const url = await new Repo(repo).getAssetUrl(version)
  const name = url.split("/").at(-1)!
  const downloadPath = path.join(tmpdir(), name)
  const installDir = path.join(homedir(), "easy-setup")
  await download(url, downloadPath)
  await extractTo(downloadPath, installDir)
  return {
    version,
    dir: installDir,
    downloadUrl: url,
  }
}
