export type Input = {
  repo: string
  version?: string
}

export type Output = {
  version: string
  dir: string
  downloadUrl: string
}

export type Asset = {
  name: string
  browser_download_url: string
}

export type Release = {
  assets: Asset[]
}
