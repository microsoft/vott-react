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