module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      // Required for expo-router
      // 'expo-router/babel',
      "react-native-reanimated/plugin",
      'react-native-paper/babel',
      // [
      //   'module:react-native-dotenv',
      //   {
      //     envName: 'APP_ENV',
      //     moduleName: '@env',
      //     path: '.env',
      //     blocklist: null,
      //     allowlist: null,
      //     safe: false,
      //     allowUndefined: true,
      //     verbose: false,
      //   },
      // ],
    ],
  };
};
