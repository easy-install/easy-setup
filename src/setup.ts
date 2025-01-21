import path from "path"
import { Repo } from "./repo"
import { extractTo } from "./tool"
import type { Input, Output } from "./type"
import { homedir } from "os"
import tc from "@actions/tool-cache"

export async function setup(input: Input): Promise<Output> {
  const { repo, version = "latest" } = input
  const url = await new Repo(repo).getAssetUrl(version)
  const installDir = path.join(homedir(), "easy-setup")
  const downloadPath = await tc.downloadTool(url)
  await extractTo(downloadPath, installDir)
  return {
    version,
    installDir: installDir,
    downloadUrl: url,
  }
}
