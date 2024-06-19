module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  transformIgnorePatterns: [
    "node_modules/(?!(@react-native|react-native|@react-navigation)/)"
  ],
  setupFiles: ["./node_modules/react-native-gesture-handler/jestSetup.js"]
};
