module.exports = {
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    moduleNameMapper: {
      '\\.(css|less)$': 'identity-obj-proxy',
      '^@chakra-ui/react$': '<rootDir>/node_modules/@chakra-ui/react/dist/cjs/index.cjs',
      '^@chakra-ui/utils$': '<rootDir>/node_modules/@chakra-ui/utils/dist/index.cjs',
    },
    testEnvironment: 'jsdom',
  };