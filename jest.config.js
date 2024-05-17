module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**'
  ],
  coverageDirectory: 'coverage',
  roots: ['<rootDir>/tests'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageThreshold: {
    global: {
      lines: 80
    }
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/src/infra/db' // Adicionando o caminho completo da pasta que deseja ignorar
  ],
  coverageReporters: [
    //   'clover',
    //   'json',
    'html',
    'json-summary',
    'text',
    'text-summary'
    //   'lcov',
  ]
}
