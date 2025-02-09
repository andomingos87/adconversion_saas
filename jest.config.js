module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: ['**/teste/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
} 