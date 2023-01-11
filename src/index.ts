import axios from 'axios';
import fs from 'fs';
import * as cheerio from 'cheerio';
import { MusicDetail, Music, MusicInitial } from './types';
import { envs } from './envs';

const OUTPUT_DIR = 'dist';
const OUTPUT_PATH = `${OUTPUT_DIR}/output.json`;

axios.defaults.baseURL = envs.BASE_URL;

const fetchHtml = async (url: string): Promise<string> => {
  const { data: html } = await axios.get(url);
  return html;
};

const fetchIndex = async (url: string, pageIndex: number): Promise<string> => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  const body = { page: pageIndex };
  const { data: html } = await axios.post(url, body, {
    headers,
  });
  return html;
};

const parseCheerioDom = (html: string): cheerio.CheerioAPI => {
  return cheerio.load(html);
};

const parseMusicList = ($: cheerio.CheerioAPI): MusicInitial[] => {
  return $('div.music')
    .map((_, el) => {
      const info = $(el).find('div.info > p');
      return {
        title: $(info[0]).text(),
        artist: $(info[1]).text(),
        pack: $(info[2]).text(),
        detailUrl: $(el).find('a.detail_pop').attr('href'),
        tags: $(el)
          .find('.genre')
          .toArray()
          .map((it) => $(it).text()),
      } as MusicInitial;
    })
    .toArray();
};

const fetchDetailFormUrl = async ({
  detailUrl,
  ...music
}: MusicInitial): Promise<Music> => {
  const $ = parseCheerioDom(await fetchHtml(detailUrl));
  const details = $('div.cat')
    .map((_, el) => {
      const jacket = $(el).find('div.jk img').first().attr('src');
      const difficulty = $(el).find('p').first();
      return {
        level: Number(difficulty.html()),
        difficulty: difficulty.attr('class')?.toUpperCase() || '',
        jacket: `${jacket}`,
      } as MusicDetail;
    })
    .toArray();
  return {
    ...music,
    details,
  };
};

const main = async () => {
  const $ = parseCheerioDom(await fetchIndex(envs.INDEX_PATH, 0));
  const maxPage = Number($('select#search_page > option').last().val());
  const result: Music[] = [];
  for (let i = 1; i <= maxPage; ++i) {
    const dom = parseCheerioDom(await fetchIndex(envs.INDEX_PATH, i));
    const musicPromise = parseMusicList(dom).map((it) =>
      fetchDetailFormUrl(it)
    );
    for (let j = 0; j < musicPromise.length; ++j) {
      const music = await musicPromise[j];
      result.push(music);
    }
    console.log(`processing... ${i}/${maxPage}`);
  }
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(result, null, 2));
};

main();
