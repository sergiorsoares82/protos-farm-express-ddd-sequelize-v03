import { sequelize } from './sequelize';

describe('Sample Test', () => {
  it('should pass', () => {
    const database = sequelize;
    expect(database).toBeDefined();
  });
});
