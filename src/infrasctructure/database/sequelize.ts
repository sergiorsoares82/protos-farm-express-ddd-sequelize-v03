import type { Dialect } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

const config = {
  dialect:
    process.env.NODE_ENV === 'test'
      ? ('sqlite' as Dialect)
      : ('postgres' as Dialect),
};

export const sequelize = new Sequelize(config);
