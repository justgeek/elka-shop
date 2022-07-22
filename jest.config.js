// const nextJest = require("next/jest");

// const createJestConfig = nextJest({
//   // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
//   dir: "./",
// });

// // Add any custom config to be passed to Jest
// const customJestConfig = {
//   moduleNameMapper: {
//     // Handle module aliases (this will be automatically configured for you soon)
//     "data/*": ["data/*"],
//     "^components/*": ["<rootDir>/components/$1"],
//     "^layouts/*": ["<rootDir>/layouts/$1"],
//     "^pages/*": ["<rootDir>/pages/$1"],
//     "^types/*": ["<rootDir>/types/$1"],
//   },
//   testEnvironment: "jest-environment-jsdom",
// };

// // createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
// module.exports = createJestConfig(customJestConfig);

module.exports = {
  setupFilesAfterEnv: ["./jest.setup.js"],
  moduleNameMapper: {
    "data/*": ["data/*"],
    "^src/(.*)$": "<rootDir>/src/$1",
    "^components/(.*)$": ["<rootDir>/src/components/$1"],
    "^layouts/(.*)$": ["<rootDir>/src/layouts/$1"],
    "^pages/(.*)$": ["<rootDir>/src/pages/$1"],
    "^types/(.*)$": ["<rootDir>/src/types/$1"],
  },
  testEnvironment: "jest-environment-jsdom",
};
