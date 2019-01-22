// const path = require('path');
// const TSDocgenPlugin = require('react-docgen-typescript-webpack-plugin');
// module.exports = (baseConfig, env, defaultConfig) => {
//   defaultConfig.module.rules.push({
//     test: /\.(ts|tsx)$/,
//     loaders: ["style-loader", "css-loader", "sass-loader", "ts-loader"]
//   });
//   defaultConfig.plugins.push(new TSDocgenPlugin());
//   defaultConfig.resolve.extensions.push('.ts', '.tsx');
//   return defaultConfig;
// };

// const path = require('path');

module.exports = {
  entry: '../src/index.ts',
  module: {
    rules: [
      {
        test: /\.scss?$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.scss' ]
  }
};

// module.exports = {
//     mode: "development",
//     devtool: "inline-source-map",
//     entry: "../src/index.ts",
//     output: {
//       filename: "bundle.js"
//     },
//     resolve: {
//       // Add `.ts` and `.tsx` as a resolvable extension.
//       extensions: [".ts", ".tsx", ".js", ".scss"]
//     },
//     module: {
//       rules: [
//         // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
//         {
//             test: /\.tsx?$/,
//             loaders: ["css-loader", "sass-loader", "ts-loader"]
//         }
//       ]
//     }
//   };