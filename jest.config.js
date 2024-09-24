// module.exports = {
//   preset: 'react-native',
// };

module.exports = {
  preset: 'react-native',
  setupFiles: ['./jestSetup.js'],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-navigation|@react-navigation|@reduxjs/toolkit)/)',
  ],
  testMatch: ['**/__tests__/**/*.(ts|tsx)', '**/?(*.)+(spec|test).(ts|tsx)'],

};