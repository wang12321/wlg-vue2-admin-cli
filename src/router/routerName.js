// 自动获取modules配置
const files = require.context('./ConfigurationModule', false, /\.js$/)
let tmp
files.keys().forEach(key => {
  tmp = files(key).default
})
export const routerName = {
  ...tmp,
  /**
   * key 文件名
   * name 左侧菜单中文名
   * icon 左侧菜单图标
   * index 左侧菜单排序
   * permission 左侧菜单权限
   * newTime 左侧菜单New!展示到期时间
   * isID: 动态id 可以配置任意参数
   */
  system: {
    name: '系统管理',
    icon: 'form',
    index: 2,
    permission: [1, 2, 3],
    newTime: '2021-05-20'
  }
}
