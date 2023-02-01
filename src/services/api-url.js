/**
   * @author ff
   * @date 2021/4/28
   * @Description:apiURL配置
   * @update by:
   */

const development = {
  unifiedLoginUrl: 'http://login.xq5.com',
  userUrl: 'http://127.0.0.1:9000', // 这里是域名（http://apics/） 使用mock数据才这样表述
  systemUrl: ''

}
const production = {
  unifiedLoginUrl: 'http://login.xq5.com',
  userUrl: 'http://127.0.0.1:9000'
}
module.exports = {
  development,
  production
}
