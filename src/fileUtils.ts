import fs from 'fs'
import { envs } from './envs'
import { SdvxType, SdvxData } from './types'

const OUTPUT_DIR = envs.OUTPUT_DIR
const OUTPUT_PATH = `${OUTPUT_DIR}${envs.OUTPUT_FILE}`
const OUTPUT_IMAGE_DIR = envs.OUTPUT_IMAGE_DIR

export class FileOpenError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'FileOpenError'
  }
}

const mkdir = (path: string) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true })
  }
}

export const fileUtils = {
  saveJSON: (type: SdvxType, data: SdvxData) => {
    mkdir(OUTPUT_DIR)
    const filePath = OUTPUT_PATH.replace('%s', type)
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), { encoding: 'utf-8' })
  },
  readJSON: (type: SdvxType): string => {
    const filePath = OUTPUT_PATH.replace('%s', type)
    if (!fs.existsSync(filePath)) {
      throw new FileOpenError(`File not found: ${filePath}`)
    }
    return fs.readFileSync(filePath, { encoding: 'utf-8' })
  },
  saveBinary: (type: SdvxType, fileName: string, data: ArrayBuffer) => {
    const rootDir = `${OUTPUT_IMAGE_DIR}${type}/`
    mkdir(rootDir)
    const filePath = `${rootDir}${fileName}`
    fs.writeFileSync(filePath, Buffer.from(data), 'binary')
  },
}
