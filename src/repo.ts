import { getAssetNames } from "./tool"
import { Release } from "./type"
import * as fs from "fs"
import tc from "@actions/tool-cache"
export class Repo {
  name: string
  owner: string
  constructor(url: string) {
    const regex = /https:\/\/github\.com\/([^\/]+)\/([^\/]+)/
    const match = url.match(regex)
    if (!match) {
      throw new Error("Invalid github repo url")
    }
    this.owner = match[1]
    this.name = match[2]
  }
  getReleasesApiUrl(tag = "latest") {
    if (tag === "latest") {
      return `https://api.github.com/repos/${this.owner}/${this.name}/releases/latest`
    }
    return `https://api.github.com/repos/${this.owner}/${this.name}/releases/tags/${tag}`
  }
  async getRelease(tag = "latest"): Promise<Release> {
    const url = this.getReleasesApiUrl(tag)
    const tmpPath = await tc.downloadTool(url)
    const json = fs.readFileSync(tmpPath, "utf-8")
    return JSON.parse(json) as Release
  }
  async getAssetUrl(
    bin = this.name,
    tag = "latest",
    os = process.platform,
    arch = process.arch,
  ) {
    const releases = await this.getRelease(tag)
    const names = getAssetNames(bin, os, arch)
    const asset = releases.assets.find((asset) => {
      return names.some((i) => asset.name.startsWith(i))
    })
    if (!asset) {
      throw new Error(`No asset found for ${bin} ${tag} ${os} ${arch}`)
    }
    return asset.browser_download_url
  }
}
