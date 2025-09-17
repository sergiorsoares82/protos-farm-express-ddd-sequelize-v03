import type { Config } from 'jest';

const config: Config = {
  transform: {
    '^.+.(t|j)sx?$': '@swc/jest',
  },
  transformIgnorePatterns: ['/node_modules/'],
  testEnvironment: 'node',
  testMatch: [
    '**/__tests__/**/*.int-test.ts',
    '**/__tests__/**/*.int-spec.ts',
    '**/?(*.int-)+(spec|test).ts',
  ],
  testPathIgnorePatterns: [
    '/node_modules/', // Ignora a pasta node_modules
    '/dist/', // Ignora a pasta de build
    '.unit.test.ts', // Exclui explicitamente arquivos de teste de integração
    '.e2e.test.ts', // Exclui explicitamente arquivos de teste e2e
  ],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/*.integration.test.ts', // Exclui integração da cobertura se estiver na mesma pasta
    '!src/**/*.e2e.test.ts',
  ],
};

export default config;
