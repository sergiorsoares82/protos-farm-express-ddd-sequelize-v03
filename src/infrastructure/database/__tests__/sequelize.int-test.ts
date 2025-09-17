import type { Sequelize } from 'sequelize-typescript';

import { createSequelizeInstance } from '../sequelize';

describe('Sequelize Integration Test', () => {
  let sequelizeInst: Sequelize;

  beforeAll(async () => {
    process.env.NODE_ENV = 'integration';
    process.env.DB_DIALECT = 'postgres';
    process.env.DB_HOST = 'localhost';
    process.env.POSTGRES_PORT = '5434';
    process.env.POSTGRES_USER = 'integration_user';
    process.env.POSTGRES_PASSWORD = 'integration_password';
    process.env.POSTGRES_DB = 'integration_db';

    sequelizeInst = createSequelizeInstance();

    try {
      await sequelizeInst.authenticate();
      console.log(
        '�� Conexão com o banco de dados de teste estabelecida com sucesso!',
      );
    } catch (error) {
      console.error('❌ Erro ao conectar ao banco de dados de teste:', error);
      // Lançar o erro para que o `beforeAll` falhe e os testes não continuem
      throw error;
    }
  }, 10000);

  afterAll(async () => {
    if (sequelizeInst) {
      await sequelizeInst.close();
      console.log('😴 Conexão com o banco de dados de teste fechada.');
    }
  });

  it('should be defined and connected', async () => {
    expect(sequelizeInst).toBeDefined();
    expect(sequelizeInst.getDialect()).toBe('postgres');
    expect(sequelizeInst.options.dialect).toBe('postgres');
    expect(sequelizeInst.options.host).toBe('localhost');
    expect(sequelizeInst.options.port).toBe(5434);
    expect(sequelizeInst.options.username).toBe('integration_user');
    expect(sequelizeInst.options.password).toBe('integration_password');
    expect(sequelizeInst.options.database).toBe('integration_db');
    expect(await sequelizeInst.authenticate()).toBeUndefined();
  });
});
