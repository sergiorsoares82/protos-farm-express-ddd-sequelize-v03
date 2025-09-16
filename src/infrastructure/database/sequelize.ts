import { Sequelize } from 'sequelize-typescript';

import { configDatabaseOptions } from './config';

export const sequelize = new Sequelize({ ...configDatabaseOptions() });
