import { Sequelize } from 'sequelize-typescript';

import { configDatabaseOptions } from './config';

export const createSequelizeInstance = () => {
  return new Sequelize({ ...configDatabaseOptions() });
};
