module.exports = {
    preset: "ts-jest",
    transform: { '^.+\\.ts': 'ts-jest' },
    testMatch: ['**/*.test.ts'],
    clearMocks: true,
    testEnvironment: 'node',
    moduleNameMapper: {
        "^axios$": "axios/dist/node/axios.cjs"
    }
}
