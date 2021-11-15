/**
   * @author ff
   * @date 2021/4/28
   * @Description:apiURL配置
   * @update by:
   */

const development = {
  UnifiedLogin: 'http://login.xq5.com',
  user: 'http://127.0.0.1:9000' // 这里是域名（http://apics/） 使用mock数据才这样表述
}
const developmentsw = {
  UnifiedLogin: 'http://login.xq668.com',
  user: 'http://127.0.0.1:9000'
}
const developmentnew = {
  UnifiedLogin: 'http://login.xq556.com',
  user: 'http://127.0.0.1:9000'

}
const production = {
  UnifiedLogin: 'http://login.xq5.com',
  user: 'http://127.0.0.1:9000'

}
const productionnew = {
  UnifiedLogin: 'http://login.xq556.com',
  user: 'http://127.0.0.1:9000'

}
const productionsw = {
  UnifiedLogin: 'http://login.xq668.com',
  user: 'http://127.0.0.1:9000'

}
module.exports = {
  development,
  developmentsw,
  developmentnew,
  production,
  productionnew,
  productionsw
}
