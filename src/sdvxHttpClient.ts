import axios from 'axios'
import { envs } from './envs'

axios.defaults.baseURL = envs.BASE_URL

export const sdvxHttpClient = {
  fetchHtml: async (url: string): Promise<string> => {
    const { data: html } = await axios.get(url)
    return html
  },
  fetchPageHtml: async (url: string, pageIndex: number): Promise<string> => {
    const body = { page: pageIndex }
    const { data: html } = await axios.post(url, body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    return html
  },
  fetchBinary: async (url: string): Promise<ArrayBuffer> => {
    const { data } = await axios.get(url, { responseType: 'arraybuffer' })
    return data
  },
}
