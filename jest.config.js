module.exports = { 
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**'
  ],
  coverageDirectory: 'coverage',
  roots: ['<rootDir>/tests'],
  preset: "ts-jest", 
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: ["./src/**"],
  coverageThreshold: {
    "global": {
      "lines": 90
    }
  },
  coveragePathIgnorePatterns: [
    "<rootDir>/src/infra/db" // Adicionando o caminho completo da pasta que deseja ignorar
  ]
};
