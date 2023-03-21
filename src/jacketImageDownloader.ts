import { FileOpenError, fileUtils } from './fileUtils'
import { sdvxHttpClient } from './sdvxHttpClient'
import { Music, SdvxData, SdvxType } from './types'

const downloader = async (type: SdvxType, baseUrl: string, music: Music[]) => {
  const jacketUrls = music
    .map(({ details }) => details.map(({ jacket }) => jacket))
    .flatMap((it) => it)
    .map((it) => `${baseUrl}${it}`)

  for (let i = 0; i < jacketUrls.length; ++i) {
    const fileName = `${jacketUrls[i].split('=')[1]}.png`
    const data = await sdvxHttpClient.fetchBinary(jacketUrls[i])
    fileUtils.saveBinary(type, fileName, data)
    console.log(`🤖  Processing... ${i + 1}/${jacketUrls.length}`)
  }
}

const main = async () => {
  const type: SdvxType = process.argv[2] ? 'arcade' : 'eacloud'
  console.log(`🔨  Mode: ${type}`)
  const { baseUrl, data } = JSON.parse(fileUtils.readJSON(type)) as SdvxData
  downloader(type, baseUrl, data)
  console.log(`📥  Downloaded.`)
}

main().catch((e) => {
  if (e instanceof FileOpenError) {
    console.error(`🚫  ${e.message}`)
  } else {
    throw e
  }
})
