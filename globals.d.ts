declare namespace NodeJS {
  interface ProcessEnv {
    BASE_URL: string | undefined;
    NODE_ENV: 'development' | 'production' | 'test';
  }
}
