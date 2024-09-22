// module.exports = {
//   preset: 'react-native',
// };

module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-navigation|@react-navigation|@reduxjs/toolkit)/)',
  ],
  
};