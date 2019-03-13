This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
use [Ant Design UI](https://ant.design/docs/react/introduce-cn)

# yh-jianghu-fe

## 如何启动

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3001 && serve: http://127.0.0.1:7001
$ npm run dev

# serve with hot reload at localhost:3001 && use mock data
$ npm run dev:mock

# build for production and launch server
$ npm run build

```

## 知识储备
react: 基础的写法、高阶组件
graphQL: 编写 graphQL 语句
[react-apollo](https://www.apollographql.com/docs/react/)
[Ant Design](https://ant.design/docs/react/introduce-cn)

## 配置左侧导航
在src/layouts/menu/config.js 添加配置

``` javascript
{
    name: '首页配置',
    icon: 'setting',
    children: [
      {
        name: 'banner位置',
        path: '/',
      },
      {
        name: '广告位',
        path: '/home/adv',
      }
    ]
}
```
icon：使用 Ant Design 中icon 组件 ，填写 icon name 即可；

## 添加一个页面
首先在 src/router.js 中添加 页面响应路由；
在pages 里面建立相对文件即可；
