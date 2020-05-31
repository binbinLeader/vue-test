// 配置别名
module.exports = {
  configureWebpack: {
    resolve: {
      // extensions: []
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'views': '@/views',
        'network': '@/network',
        'common': '@/common',
      }
    }
  },
}
