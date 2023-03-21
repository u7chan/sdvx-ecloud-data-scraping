import * as cheerio from 'cheerio'
import { MusicDetail, Music, MusicInitial, SdvxData, SdvxType } from './types'
import { envs } from './envs'
import { fileUtils } from './fileUtils'
import { sdvxHttpClient } from './sdvxHttpClient'

const parseCheerioDom = (html: string): cheerio.CheerioAPI => {
  return cheerio.load(html)
}

const parseMusicList = ($: cheerio.CheerioAPI): MusicInitial[] => {
  return $('div.music')
    .map((_, el) => {
      const info = $(el).find('div.info > p')
      return {
        title: $(info[0]).text(),
        artist: $(info[1]).text(),
        pack: $(info[2]).text(),
        detailUrl: $(el).find('a.detail_pop').attr('href'),
        tags: $(el)
          .find('.genre')
          .toArray()
          .map((it) => $(it).text()),
      } as MusicInitial
    })
    .toArray()
}

const fetchDetailFormUrl = async ({ detailUrl, ...music }: MusicInitial): Promise<Music> => {
  const $ = parseCheerioDom(await sdvxHttpClient.fetchHtml(detailUrl))
  const details = $('div.cat')
    .map((_, el) => {
      const jacket = $(el).find('div.jk img').first().attr('src')
      const difficulty = $(el).find('p').first()
      return {
        level: Number(difficulty.html()),
        difficulty: difficulty.attr('class')?.toUpperCase() || '',
        jacket: `${jacket}`,
      } as MusicDetail
    })
    .toArray()
  return {
    ...music,
    details,
  }
}

const sdvxMusicAnalysis = async (path: string): Promise<Music[]> => {
  const $ = parseCheerioDom(await sdvxHttpClient.fetchPageHtml(path, 1))
  const maxPage = Number($('select#search_page > option').last().val())
  const result: Music[] = []
  for (let i = 1; i <= maxPage; ++i) {
    const dom = parseCheerioDom(await sdvxHttpClient.fetchPageHtml(path, i))
    const list = parseMusicList(dom)
    for (let j = 0; j < list.length; ++j) {
      const data: MusicInitial = list[j]
      const r = await fetchDetailFormUrl(data)
      result.push(r)
    }
    console.log(`🤖  Processing... ${i}/${maxPage}`)
  }
  return result
}

const sdvxTypeToPath = (type: SdvxType) => {
  switch (type) {
    case 'arcade':
      return envs.ARCADE_PATH
    case 'eacloud':
      return envs.EA_CLOUD_PATH
  }
}

const execute = async (type: SdvxType): Promise<SdvxData> => {
  return {
    baseUrl: envs.BASE_URL,
    lastUpdated: new Date().toLocaleString(),
    type,
    data: await sdvxMusicAnalysis(sdvxTypeToPath(type)),
  }
}

const main = async () => {
  const type: SdvxType = process.argv[2] ? 'arcade' : 'eacloud'
  console.log(`🔨  Mode: ${type}`)
  const data = await execute(type)
  fileUtils.saveJSON(type, data)
  console.log(`🍻  Exported.`)
}

main()
