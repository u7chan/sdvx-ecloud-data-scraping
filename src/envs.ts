import * as dotenv from 'dotenv';

dotenv.config();

export const envs = {
  BASE_URL: process.env.BASE_URL || '',
  INDEX_PATH: process.env.INDEX_PATH || '',
};
