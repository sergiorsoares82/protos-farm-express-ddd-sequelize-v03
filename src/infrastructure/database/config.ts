import dotenv from 'dotenv';
import type { Dialect } from 'sequelize';

process.env.DOTENV_CLI_QUIET = '1';

const cwd = process.cwd();
let envFileName = '.env';
if (process.env.NODE_ENV) {
  envFileName = `.env.${process.env.NODE_ENV}`;
}

dotenv.config({
  path: `${cwd}/.env/${envFileName}`,
});

export const configDatabaseOptions = () => {
  if (
    (!process.env.DB_DIALECT || process.env.DB_DIALECT === 'sqlite') &&
    process.env.NODE_ENV === 'test'
  ) {
    return {
      dialect: 'sqlite' as Dialect,
      storage: ':memory:',
      logging: false,
    };
  } else {
    return {
      dialect: (process.env.DB_DIALECT as Dialect) || 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.POSTGRES_PORT
        ? Number(process.env.POSTGRES_PORT)
        : undefined,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    };
  }
};

console.log('config(): ', configDatabaseOptions());
