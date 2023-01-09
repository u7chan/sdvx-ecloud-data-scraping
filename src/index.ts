import axios from 'axios';
import * as cheerio from 'cheerio';
import * as dotenv from 'dotenv';
import { MusicDetail, Music, MusicInitial } from './types';

dotenv.config();

const BASE_URL = `${process.env.BASE_URL}`;
const INDEX_URL = `${BASE_URL}${process.env.INDEX_PATH}`;

const fetchHtml = async (url: string): Promise<string> => {
  const { data: html } = await axios.get(url);
  return html;
};

const parseCheerioDom = (html: string): cheerio.CheerioAPI => {
  return cheerio.load(html);
};

const parseDetailUrls = ($: cheerio.CheerioAPI): string[] => {
  return $('a.detail_pop')
    .toArray()
    .map(({ attribs }) => `${BASE_URL}${attribs['href']}`);
};

const fetchDetailFormUrl = async (
  url: string,
  music: MusicInitial
): Promise<Music> => {
  const $ = parseCheerioDom(await fetchHtml(url));
  const details = $('div.cat')
    .map((_, el) => {
      const jacket = $(el).find('div.jk img').first().attr('src');
      const difficulty = $(el).find('p').first();
      return {
        level: Number(difficulty.html()),
        difficulty: difficulty.attr('class')?.toUpperCase() || '',
        jacket: `${BASE_URL}${jacket}`,
      } as MusicDetail;
    })
    .toArray();
  return {
    ...music,
    details,
  };
};

const main = async () => {
  const $ = parseCheerioDom(await fetchHtml(INDEX_URL));
  const maxPage = $('select#search_page > option').last().val();
  console.log('#', { maxPage });
  //fetchDetailUrls($);
  const r = await fetchDetailFormUrl(
    'https://p.eagate.573.jp/game/eacsdvx/vi/music/detail.html?music_id=h9gcpJ23dTi67XZRo2okkg',
    {
      title: 'dummy',
      artist: 'aaa',
      tags: [],
      pack: 'no',
    }
  );
  console.log('#', { r: JSON.stringify(r) });
};

main();
