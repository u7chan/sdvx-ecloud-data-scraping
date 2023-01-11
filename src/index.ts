import axios from 'axios';
import * as cheerio from 'cheerio';
import { MusicDetail, Music, MusicInitial } from './types';
import { envs } from './envs';

axios.defaults.baseURL = envs.BASE_URL;

const fetchHtml = async (url: string): Promise<string> => {
  const { data: html } = await axios.get(url);
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
  const $ = parseCheerioDom(await fetchHtml(envs.INDEX_PATH));
  const maxPage = $('select#search_page > option').last().val();
  const result = await Promise.all(
    parseMusicList($).map((it) => {
      return it;
      //return fetchDetailFormUrl(it);
    })
  );

  console.log('#', { maxPage, result });
};

main();
