import { configDatabaseOptions } from '../config';

describe('ConfigDatabase Unit Test', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules(); // Clear the cache
    process.env = { ...originalEnv }; // Make a copy
  });

  afterAll(() => {
    process.env = originalEnv; // Restore original environment
  });

  it('should return sqlite in-memory config when DB_DIALECT is not set and NODE_ENV is test', () => {
    process.env.NODE_ENV = 'test';
    delete process.env.DB_DIALECT;

    const config = configDatabaseOptions();

    expect(config).toEqual({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
    });
  });

  it('should return sqlite in-memory config when DB_DIALECT is sqlite and NODE_ENV is test', () => {
    process.env.NODE_ENV = 'test';
    process.env.DB_DIALECT = 'sqlite';

    const config = configDatabaseOptions();

    expect(config).toEqual({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
    });
  });

  it('should return postgres config when DB_DIALECT is postgres and NODE_ENV is not test', () => {
    process.env.NODE_ENV = 'development';
    process.env.DB_DIALECT = 'postgres';
    process.env.DB_HOST = 'localhost';
    process.env.POSTGRES_PORT = '5432';
    process.env.POSTGRES_USER = 'user';
    process.env.POSTGRES_PASSWORD = 'password';
    process.env.POSTGRES_DB = 'database';

    const config = configDatabaseOptions();

    expect(config).toEqual({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'database',
    });
  });

  it('should return default postgres config when DB_DIALECT is not set and NODE_ENV is not test', () => {
    process.env.NODE_ENV = 'development';
    delete process.env.DB_DIALECT;
    process.env.DB_HOST = 'localhost';
    process.env.POSTGRES_PORT = '5432';
    process.env.POSTGRES_USER = 'user';
    process.env.POSTGRES_PASSWORD = 'password';
    process.env.POSTGRES_DB = 'database';

    const config = configDatabaseOptions();

    expect(config).toEqual({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'database',
    });
  });

  it('should return default postgres config with some undefined values when env vars are missing', () => {
    process.env.NODE_ENV = 'production';
    process.env.DB_DIALECT = 'postgres';
    delete process.env.DB_HOST;
    delete process.env.POSTGRES_PORT;
    delete process.env.POSTGRES_USER;
    delete process.env.POSTGRES_PASSWORD;
    delete process.env.POSTGRES_DB;

    const config = configDatabaseOptions();

    expect(config).toEqual({
      dialect: 'postgres',
      host: 'localhost',
      port: undefined,
      username: undefined,
      password: undefined,
      database: undefined,
    });
  });

  it('should handle undefined DB_PORT gracefully', () => {
    process.env.NODE_ENV = 'development';
    process.env.DB_DIALECT = 'postgres';
    process.env.DB_HOST = 'localhost';
    process.env.POSTGRES_PORT = 'not-a-number'; // Ensure POSTGRES_PORT is not a number
    process.env.POSTGRES_USER = 'user';
    process.env.POSTGRES_PASSWORD = 'password';
    process.env.POSTGRES_DB = 'database';

    const config = configDatabaseOptions();

    expect(config).toEqual({
      dialect: 'postgres',
      host: 'localhost',
      port: undefined,
      username: 'user',
      password: 'password',
      database: 'database',
    });
  });
});
