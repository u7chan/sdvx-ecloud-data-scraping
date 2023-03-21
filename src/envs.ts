import * as dotenv from 'dotenv'

dotenv.config()

export const envs = {
  BASE_URL: process.env.BASE_URL || '',
  ARCADE_PATH: process.env.ARCADE_PATH || '',
  EA_CLOUD_PATH: process.env.EA_CLOUD_PATH || '',
  OUTPUT_DIR: process.env.OUTPUT_DIR || '',
  OUTPUT_FILE: process.env.OUTPUT_FILE || '',
  OUTPUT_IMAGE_DIR: process.env.OUTPUT_IMAGE_DIR || '',
}
