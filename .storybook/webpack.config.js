const path = require('path');

module.exports = (baseConfig, env, config) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [{
      loader: require.resolve('babel-loader'),
      loader: require.resolve('ts-loader'),
    }],
  });

  config.module.rules = config.module.rules
    .filter(r => r.test.toString() !== "/\\.css$/")
    .concat({
      test: /\.(css|scss)$/,
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

  baseConfig.ts = {
    compilerOptions: {
      jsx: 'react'
    },
    configFileName: path.resolve(__dirname, '../tsconfig.json')
  }
  return config;
};
