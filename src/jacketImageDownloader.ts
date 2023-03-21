import { FileOpenError, fileUtils } from './fileUtils'
import { SdvxType } from './types'

const main = async () => {
  const type: SdvxType = process.argv[2] ? 'arcade' : 'eacloud'
  console.log(`🔨  Mode: ${type}`)
  const data = fileUtils.readJSON(type)
  // TODO
  console.log(`📥  Downloaded.`)
}

main().catch((e) => {
  if (e instanceof FileOpenError) {
    console.error(`🚫  ${e.message}`)
  } else {
    throw e
  }
})
