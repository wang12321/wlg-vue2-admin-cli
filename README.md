# 单页面脚手架


## node脚手架


### 1、全局安装脚手架
```
npm install -g wlg-cli-ff
```
### 2、ff list


- init 初始化项目
- add  初始化增删改查文件
- temp 初始化基础文件
- sentry 接入sentry
- qiankun 接入微前端



### 3、ff init  初始化命令


```
ff init <name>
```


![](https://upload-images.jianshu.io/upload_images/26056473-4d61235b348cbaad.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240#id=rS8hl&originHeight=624&originWidth=1134&originalType=binary&status=done&style=none)


直接会运行打开项目


以下命令需要到当前项目跟目录下使用


### 4、ff add 
```
ff add <name>
```

- 在autoRouter文件中建立文件（FileName/FileName.vue） 增删改查模板



### 5、ff temp 
```
ff temp <name>
```

- 基础模板



### 6、ff sentry


- npm install @sentry/browser
npm install @sentry/integrations
- 在main.js中注册
- 在src/services/server.js 写入sentry监听报错
- （注意：插入位置---// sentry预留位置1 ---- 请不要删除）





### 7、ff qiankun


- npm install qiankun
- 在main.js中注册
- src/router/modules 写入文件qiankun.js
- src/views   创建文件qiankun 写入qiankun.vue
- src/layout/components/AppMain.vue 处理展示的界面



## 单页面架构


### 1、layout配置


- logo: 'component', // 配置logo 只处理了svg的
- title: 'Vue Admin FF', // 配置title
- tagsView: true, // 配置导航标签
- IsSearch: false, // 配置菜单搜索
- breadcrumb: false, // 配置面包屑
- Layout: false, // 配置布局 true 左右结果 false 上下结构
- fixedHeader: true, // 是否固定头部导航栏
- sidebarLogo: true, // 是否显示Logo和title
- navbarBackground: '#324151', // 头部导航栏背景颜色
- navbarColor: '#fff', // 头部导航栏字体和图标颜色
- isUnifiedLogin: true, // 是否统一登入
- isGameShow: true, // 是否展示游戏平台
- isSwitchEnvironment: process.env.NODE_ENV.indexOf('development') > -1 // 是否切换环境
- isAPIRouter: true // 是否异步请求接口返回router



### 2、环境配置
```
    "dev": "vue-cli-service serve",     // 对应文件.env.development
    "dev:sw": "vue-cli-service serve --mode developmentsw",  // 对应文件.env.developmentsw
    "dev:new": "vue-cli-service serve --mode developmentnew",  // 对应文件.env.developmentnew
    "build:prod": "vue-cli-service build",   // 对应文件.env.production
    "build:sw": "vue-cli-service build --mode prodsw",  // 对应文件.env. prodsw
    "build:new": "vue-cli-service build --mode prodnew", // 对应文件.env. prod new
```

- 注意：环境配置文件，主要需要NODE_ENV 和 VUE_APP_BASE_API，在请求服务文件apiURL中必须要和VUE_APP_BASE_API设置的一致，切换环境的时候需要用到 。 NODE_ENV 在打包正式环境关闭打印输出和判断正式和测试用到（只支持3种模式：development，production，test）



### 3、请求服务
serversapiUrl.js  按服务域名划分模块（注意：文件导出的变量需要和环境文件变量VUE_APP_BASE_API一致）
api.js  按模块写接口url 
注意：myserver.postData('user', user)前面的‘user’必须要和apiUrl 的模块接口（user）对应上。
​

使用接口：对应页面引入api.js 
```
import api from '@/services/api'
const { gamelist } = api.user
```


 
### 4、router 自动路由配置


-  autoRouter文件生成路由 
   - 模块文件统一写在views/autoRouter 下面,包含文件夹的是嵌套路由（二级路由），不包含的一级路由。建议使用文件夹来包含，可创建子文件夹，即使是一级路由也不会影响。目前最多只支持二级路由的生成，所以在autoRouter中可以根据自己的需要，将文件按子模块新增文件夹（建立3级文件夹），是没有问题的。
   - 如果需要3级路由，就自行配置路由文件就可以了，在router/modules下配置，该文件夹下的js文件会自动加载到router中

 

-  router 配置文件 
```
export default {
  /**
   * key:{} autoRouter文件名
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
    newTime: '2021-06-20',
    children: {
      menu: {
        name: '菜单管理',
        icon: 'form',
        index: 1,
        permission: [1, 2, 3],
        isID: '/:id'
      },
      user: {
        name: '用户管理',
        icon: 'form',
        index: 2,
        permission: [1, 2, 3],
        newTime: '2021-06-20'
      }
    }
  }
}
```
 

-  菜单排序 
   - 菜单排序是在生成菜单路由的时候处理，利用sort 排序。filterAsyncRoutes本身就是一个递归方法，所以可在这里调用，处理树形结构的排序
   - 注意：排序序号，父菜单只管父菜单兄弟之间的排序，子菜单只管子菜单兄弟之间的排序。所以这里会建议父菜单和子菜单的分开，子菜单配置按模块划分。

 

-  菜单New!标志 
   - 这里处理的方式是在配置文件中配置newTime,传入时间字符串，比如’2021-05-20‘，这个时间与当前系统时间对比，如果时间未到就展示，过了隐藏。
   - 注意：1、时间要字符串标准格式（2021-05-20），匹配时间是在该时间的0点，而非24点。
   - 2、子菜单配置的newTime，父菜单也需要配置，并且要等于子菜单中最大的newTime。这样才能保持一致。
   - 3、权限配置也类似。

 

-  配置 isID、动态id 可以配置任意参数 
   - 动态isID只能配置在子路由中，父路由是不生效的。配置的参数格式必须是’/:‘+任意字符串。意思就是传的参数不局限于id,可任意。
   - 注意：如果使用动态路由，在路由拦截的地方进行跳转传参，那在左侧菜单的时候就不能使用path来做唯一值，这样选中效果就不生效。可以使用name来做唯一值

 

-  异步请求路由配置 
   - 映射服务器返回菜单与本地component
   - 接口返回的数据格式
   - 对应配置的router文件路径
   - 注意：异步请求路由，权限，排序都由后台完成。请求接口得到的数据就是已经经过权限过滤，排序之后的数据。如果是异步请求路由，则无需在配置routerName文件。这个相对本地配置router来说是简单的，后台替我们分担了一部分工作。

 


### 5、utils公共方法文件


- index.js  写公共方法
- Reg  表单的校验
- auth  本地存储文件



### 6、filters 过滤器文件
 

-  全局注册过滤器 main.js
```
import * as filters from './filters' 
Object.keys(filters).forEach(key => {
Vue.filter(key, filters[key])
})   
```
### 
