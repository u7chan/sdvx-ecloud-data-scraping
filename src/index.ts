import axios from 'axios';
import * as cheerio from 'cheerio';
import * as dotenv from 'dotenv';

dotenv.config();

const main = async () => {
  const { data: html } = await axios.get(process.env.BASE_URL || '');
  const $ = cheerio.load(html);
  const maxPage = $('select#search_page > option').last().val();
  console.log('#', { maxPage });
};

main();
