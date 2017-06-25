var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  //项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
  entry: {
    app: './app/index',
  },
  //输出的文件名 合并以后的js会命名为bundle.js
  output: {
    path: './dist',
    filename: '[name].min.js'
  },
  //添加我们的插件 会自动生成一个html文件
  plugins: [
    new ExtractTextPlugin("styles.css"),
    //这个使用uglifyJs压缩你的js代码
    new webpack.optimize.UglifyJsPlugin({
      // minimize: true,npm install uglify-loader --save-dev
      compress: {
        warnings: false
      }
    }),
		
  ],
  module: {
    loaders: [
      {test: /\.css$/,    loader: 'style!css'},
      // {test: /\.less$/,   loader: ExtractTextPlugin.extract('style-loader','css-loader','postcss-loader','less-loader')},
      {test: /\.less$/,   loader: 'style-loader!css-loader!postcss-loader!less-loader'},
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  postcss: function() {
    return [
      require('autoprefixer')({
        browsers: ['last 7 versions'],
      })
    ];
  }
};