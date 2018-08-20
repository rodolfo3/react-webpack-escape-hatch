const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const sassConfig = {
  test: /\.s?css$/,
  use: ExtractTextPlugin.extract({
    fallback: require.resolve('style-loader'),
    use: [
      {
        loader: require.resolve('css-loader'),
        options: {
          modules: true,
          sourceMap: false,
          camelCase: true,
          importLoaders: 2,
          localIdentName: '[path][name]__[local]--[hash:base64:5]'
        }
      },
      {
        loader: require.resolve('sass-loader'),
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          // Necessary for external CSS imports to work
          // https://github.com/facebookincubator/create-react-app/issues/2677
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            autoprefixer({
              browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9', // React doesn't support IE8 anyway
              ],
              flexbox: 'no-2009',
            }),
          ],
        },
      },
    ]
  })
};


const modifyWebpack = (config) => {
  config.module.rules[1].oneOf[2] = sassConfig;
  config.plugins.push(
    new ExtractTextPlugin({
      filename: 'style.css',
    }),
  );

  return config;
};

module.exports = {
  modifyWebpack,
}
