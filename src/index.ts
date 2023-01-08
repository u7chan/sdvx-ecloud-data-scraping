import * as dotenv from 'dotenv';
dotenv.config();

console.log(`Hello`, { url: process.env.BASE_URL });
