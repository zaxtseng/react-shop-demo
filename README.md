# 构建
yarn create react-app react-shopping-demo --template typescript

# 安装依赖
yarn add antd axios moment redux react-redux react-router-dom redux-saga connected-react-router redux-devtools-extension @types/react-redux @types/react-router-dom
# CDN引入antd
`<link href="https://cdn.bootcdn.net/ajax/libs/antd/4.22.3/antd.min.css" rel="stylesheet">`   

这样速度更快
# 创建环境变量
```
REACT_APP_PRODUCTION_API_URL=http://fullstack.net.cn/api
REACT_APP_DEVELOPMENT_API_URL=http://localhost/api
```
设置api环境
```ts
//config.ts
export let API:string;

if(process.env.NODE_ENV === 'development') {
    API = process.env.REACT_APP_DEVELOPMENT_API_URL!
} else if (process.env.NODE_ENV === 'production') {
    API = process.env.REACT_APP_PRODUCTION_API_URL!
}
```
# 注意事项
由于使用connected-react-router,这个组件只支持routerV5,所以之后新版本的react router都不能使用.
