declare namespace NodeJS {
  interface ProcessEnv {
    BASE_URL: string | undefined;
    TOP_PAGE: string | undefined;
    NODE_ENV: 'development' | 'production' | 'test';
  }
}
