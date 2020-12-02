# 使用webpack从零搭建vue项目



## 项目创建

1. 新建项目
2. npm init

## 依赖安装

- css-loader
- vue-template-compiler
- webpack 
- webpack-cli 
-  vue-loader
- vue
- url-loader 
- file-loader
- stylus-loader  stylus
- html-webpack-plugin
- webpack-dev-server
- postcss-loader
- autoprefixer
- babel-loader
- @babel/core
- babel-preset-env
- babel-plugin-transform-vue-jsx
- babel-helper-vue-jsx-merge-props
- eslint-plugin-vue
- eslint
- eslint-plugin-import
- eslint-config-airbnb-base

> 每个 `vue` 包的新版本发布时，一个相应版本的 `vue-template-compiler` 也会随之发布。编译器的版本必须和基本的 `vue` 包保持同步，这样 `vue-loader` 就会生成兼容运行时的代码。这意味着**你每次升级项目中的 `vue` 包时，也应该匹配升级 `vue-template-compiler`**。

1. npm i vue
2. npm i  css-loader vue-template-compiler webpack webpack-cli  vue-loader --save-dev



## 创建目录

```
project
├── package-lock.json
├── package.json
├── src
│   ├── app.vue
│   └── index.js
└── webpack.config.js
```

``` vue
<template>
  <div id='test'>{{ text }}</div>
</template>

<script>
export default {
  data() {
    return {
      text: 'acb',
    };
  },
};
</script>

<style>
    #test{
        color:red;
    }
</style>

```

7. 在src下新建index.js 作为入口文件

``` js
import Vue from 'vue'
import App from './app.vue'

const root = document.createElement('div');
document.body.appendChild(root)

new Vue({
    render:(h)=>h(App)
}).$mount(root)
```



8. 根目录下新建webpack.config.js
9. 给package.json的script项添加一条build指令

``` json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config webpack.config.js"
 },
```





## 测试代码编写



## webpack配置







## 参考文档

https://vue-loader.vuejs.org/zh/

https://webpack.docschina.org/