import express from 'express';

import { sequelize } from './infrasctructure/database/sequelize';
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World Changed!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

try {
  sequelize.authenticate();
  console.log('first');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
