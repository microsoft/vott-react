const path = require('path');

module.exports = (baseConfig, env, config) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    // loader = ['babel-loader', 'ts-loader'],
    use: [{
      loader: require.resolve('awesome-typescript-loader')
    }, {
      loader: require.resolve('react-docgen-typescript-loader')
    }, {
      loader: require.resolve('ts-loader')
    }, {
      loader: require.resolve('babel-loader'),
      options: {
        presets: [['react-app', { flow: false, typescript: true }]],
      }
    }, {
      loader: require.resolve('html-loader')
    }]
  });

  config.module.rules = config.module.rules
    .filter(r => r.test.toString() !== "/\\.css$/")
    .concat({
      test: /\.css$/,
      use: [
        {
          loader: require.resolve("style-loader"),
        },
        {
          loader: require.resolve("css-loader"),
          options: {
            modules: true,
          },
        },
      ],
    });

  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
