import { createSequelizeInstance } from '../sequelize';

describe('Sample Test', () => {
  it('should pass', async () => {
    const database = createSequelizeInstance();
    expect(database).toBeDefined();
    expect(database.getDialect()).toBe('sqlite');
    expect(database.options.dialect).toBe('sqlite');
    expect(database.options.host).toBeUndefined();
    expect(database.options.port).toBeUndefined();
    expect(database.options.username).toBeUndefined();
    expect(database.options.password).toBeUndefined();
    expect(database.options.database).toBeUndefined();
    expect(await database.authenticate()).toBeUndefined();
  });
});
