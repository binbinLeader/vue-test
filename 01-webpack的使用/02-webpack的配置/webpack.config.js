const path = require('path')

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
              // 当加载的图片小于limit时, 会将图片编译成base64字符串形式.
              // 当加载的图片大于limit时, 需要使用file-loader模块进行加载.
              limit: 8192,
              // 不需要配置file-loader

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
}