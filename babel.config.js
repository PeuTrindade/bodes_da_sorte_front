/* babel.config.js */
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            styles: './src/styles',
            context: './src/context',
            screens: './src/screens',
            navigation: './src/navigation',
            assets: './src/assets',
            components: './src/components',
            requests: './src/requests',
            utils: './src/utils',
          },
        },
      ],
    ],
  };
};
