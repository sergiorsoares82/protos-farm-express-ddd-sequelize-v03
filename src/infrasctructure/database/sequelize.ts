import dotenv from 'dotenv';
import type { Dialect } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

const cwd = process.cwd();
let envFileName = '.env';
if (process.env.NODE_ENV) {
  envFileName = `.env.${process.env.NODE_ENV}`;
}

dotenv.config({
  path: `${cwd}/.env/${envFileName}`,
});

const config = () => {
  if (!process.env.DB_DIALECT || process.env.DB_DIALECT === 'sqlite') {
    return {
      dialect: 'sqlite' as Dialect,
      storage: ':memory:',
      logging: false,
    };
  } else {
    return {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    };
  }
};

export const sequelize = new Sequelize({ ...config() });
