namespace NodeJS {
  interface ProcessEnv {
    //Application
    PORT: number;

    //Database
    DB_NAME: string;
    DB_PORT: number;
    DB_HOST: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;

    //S3
    S3_SECRET_KEY: string;
    S3_ACCESS_KEY: string;
    S3_BUKET_NAME: string;
    S3_ENDPOINT: string;

    //JWT
    ACCESS_TOKEN_SECRET: string;
    REFRESH_TOKEN_SECRET: string;
  }
}
