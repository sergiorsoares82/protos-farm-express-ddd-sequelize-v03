import express from 'express';

import { sequelize } from './infrastructure/database/sequelize';
const app = express();

async function startDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

async function startServer() {
  await startDatabase();

  app.get('/', (req, res) => {
    res.send('Hello, World Changed!');
  });

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}

startServer();
