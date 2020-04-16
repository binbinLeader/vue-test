const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'dist/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 当加载的图片小于limit时,
              limit: 8192,
              // 这里使用[], 会当成变量, 取这里的名字
              // img: 文件要打包到的文件夹
              // name: 获取图片原来的名字, 放在该位置
              // hash:8 : 为了防止图片名称冲突, 依然使用hash, 但是我们只保留8位
              // ext: 使用图片原来的扩展名
              name: 'img/[name].[hash:8].[ext]'
            },

          }
        ]
      },
      {
        test: /\.js$/,
        // 排除
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      }
    ]
  },
  // resolve: {
  //   alias: {
  //     // 别名
  //     'vue$': 'vue/dist/vue.esm.js'
  //   }
  // }
  resolve: {
    extensions: ['.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js' // 用 webpack 1 时需用 'vue/dist/vue.common.js'
    }
  },
  // 增加版权插件, 需要 1. 引入webpack require('webpack')
  // 2. 使用 webpack.BannerPlugin()
  // plugins使用的是数组的形式
  plugins: [
    new webpack.BannerPlugin('最终版权归彬彬所有')
  ]
}