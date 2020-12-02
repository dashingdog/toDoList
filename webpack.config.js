const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const webpack = require('webpack');
// 使用vue-loader必须引入此插件
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HTMLPlugin = require('html-webpack-plugin');

const config = {
  // 构建目标 默认值wewb
  target: 'web',
  // 指定入口文件
  entry: path.join(__dirname, 'src/index.js'),

  // 指定出口文件，也就是打包产物路径
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        // loader是rule.use.loader的简写
        loader: 'vue-loader',
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name]-aaa.[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // 使页面js可以获取到环境变量信息
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"',
      },
    }),
    new VueLoaderPlugin(),
    new HTMLPlugin(),
    // 每次打包清除上次的打包文件
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].css',
    }),
  ],
};
if (isDev) {
  config.module.rules.push({
    test: /\.styl(us)?$/,
    use: [
      'vue-style-loader',
      {
        loader: 'css-loader',
        options: {
          // 这里有个坑，css-loader的esModule如果不设置成false,将无法生效
          // css-loader4.0后默认对esModule设置的是true
          // vue-style-loader默认接收的是commonjs的结果，也就是默认接收的是“css-loader中esModule设置的是false的结果”
          esModule: false,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
        },
      },
      'stylus-loader',
    ],
  });
  // 控制是否生成，以及如何生成 source map
  config.devtool = 'eval-cheap-module-source-map';
  // webpack-dev-server配置
  config.devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
      errors: true,
    },
    // open:true,
    hot: true,
    // historyFallback:{

    // }
  };
  config.plugins.push(
    // 局部热更新
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  );
} else {
  config.entry = {
    app: path.join(__dirname, 'src/index.js'),
    vendor: ['vue'],
  };
  config.output.filename = '[name].[chunkhash:8].js';
  config.module.rules.push({
    test: /\.styl(us)?$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '',
        },
      },
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
        },
      },
      'stylus-loader',
    ],
  });
  config.optimization = {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  };
}
module.exports = config;
