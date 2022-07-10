**Webpack5学习笔记**

- [基本配置](#基本配置)
  - [基本使用](#基本使用)
    - [功能介绍](#功能介绍)
    - [开始使用](#开始使用)
      - [1. 资源目录](#1-资源目录)
      - [2. 创建文件](#2-创建文件)
      - [3. 下载依赖](#3-下载依赖)
      - [4. 启用Webpack](#4-启用webpack)
      - [5. 观察输出文件](#5-观察输出文件)
    - [小结](#小结)
  - [基本配置](#基本配置-1)
    - [5大核心概念](#5大核心概念)
    - [准备Webpack配置文件](#准备webpack配置文件)
  - [开发模式介绍](#开发模式介绍)
  - [处理样式资源](#处理样式资源)
    - [介绍](#介绍)
    - [处理Css资源](#处理css资源)
      - [1. 下载包](#1-下载包)
      - [2. 功能介绍](#2-功能介绍)
      - [3. 配置 & 引入css资源](#3-配置--引入css资源)
      - [4. 运行指令编译](#4-运行指令编译)
    - [处理Less资源](#处理less资源)
      - [1. 下载包](#1-下载包-1)
      - [2. 功能介绍](#2-功能介绍-1)
      - [3. 配置 & 引入less资源](#3-配置--引入less资源)
      - [4. 运行指令编译](#4-运行指令编译-1)

&nbsp;

# 基本配置

## 基本使用

`Webpack`是一个静态资源打包工具。

它会以一个或多个文件作为打包的入口，将我们整个项目所有文件编译组合成一个或多个文件输出出去。

输出的文件就是编译好的文件，就可以在浏览器端运行了。

我们将`Webpack`输出的文件叫做`bundle`。

### 功能介绍

`Webpack`本身功能是有限的：

* 开发模式：仅能编译 JS 中的`ES Module`语法

* 生产模式：能编译 JS 中的`ES Module`语法，还能压缩 JS 代码

### 开始使用

#### 1. 资源目录

```js
webpack_code  // 项目根目录（所有指令必须在这个目录运行）
    ├── README.md
    ├── package.json
    ├── public
    │   └── index.html
    └── src  // 项目源码目录
        ├── js  // js文件目录
        │   ├── count.js
        │   └── sum.js
        └── main.js  // 项目主目录
```

#### 2. 创建文件

* count.js

```js
export default function count(x, y) {
    return x - y;
}
```

* sum.js

```js
export default function sum(...arr) {
    return arr.reduce((p, c) => { p + c}, 0)
}
```

* main.js

```js
import count from './js/count'
import sum from './js/sum'

console.log(count(1, 2))
console.log(sum(1, 2, 3, 4))
```

#### 3. 下载依赖

打开终端，来到项目根目录，运行以下指令：

* 初始化`package.json`

```
npm init -y
```

此时会生成一个基础的`package.json`文件。

需要注意的是`package.json`中`name`字段不能叫做`webpack`，否则下一步会报错。

* 下载依赖

```
npm i webpack webpack-cli -D
```

#### 4. 启用Webpack

* 开发模式

```
npx webpack ./src/main.js --mode=development
```

* 生产模式

```
npx webpack ./src/main.js --mode=production
```

`npx webpack`：是用来运行本地安装`Webpack`包的。

`./src/main.js`：指定`Webpack`从`main.js`文件开始打包，不但会打包`main.js`，还会将其依赖也一起打包进来。

#### 5. 观察输出文件

默认`Webpack`会将文件打包输出到`dist`目录下，我们查看`dist`目录下文件情况就好了。

### 小结

`Webpack`本身功能较少，只能处理`js`资源，一旦遇到`css`等其他资源就会报错。

所以我们要学习`Webpack`，就是主要学习如何处理其他资源。

## 基本配置

在开始使用`Webpack`之前，我们需要对`Webpack`的配置有一定的认识。

### 5大核心概念

1. entry（入口）

指示Webpack从哪个文件开始打包。

2. output（输出）

指示Webpack打包完的文件输出到哪里去，如何命名等。

3. loader（加载器）

Webpack本身只能处理js、json等资源，其他资源需要借助loader，Webpack才能解析。

4. plugins（插件）

扩展Webpack的功能。

5. mode（模式）

主要由两种模式：

* 开发模式：development
* 生产模式：production

### 准备Webpack配置文件

在项目根目录下新建文件：`webpack.config.js`

```js
// nodejs核心模块，专门用来处理路径问题
const path = require('path')

module.exports = {
    // 入口
    entry: './src/main.js',  // 相对路径
    // 输出
    output: {
        // 文件输出路径
        // __dirname nodejs的变量，代表当前文件的文件夹目录
        path: path.resolve(__dirname, 'dist'),  // 绝对路径
        // 文件名
        filename: 'main.js',
    },
    // 加载器
    module: {
        rules: [
            // loader的配置
        ],
    },
    // 插件
    plugins: [
        // plugin的配置
    ],
    // 模式
    mode: 'development',
};
```

Webpack是基于Node.js运行的，所以采用Common.js模块化规范。

## 开发模式介绍

开发模式顾名思义就是我们开发代码时使用的模式。

这个模式下我们主要做两件事：

1. 编译代码，使浏览器能识别运行

开发时我们有样式资源库、字体图标、图片资源、html资源等，webpack默认都不能处理这些资源，所以我们要加载配置来编译这些资源。

2. 代码质量检查，树立代码规范

提前检查代码的一些隐患，让代码运行时能更加健壮。

提前检查代码规范和格式，统一团队编码风格，让代码更优雅美观。

## 处理样式资源

本章节我们学习使用Webpack如何处理Css、Less、Scss、Styl样式资源。

### 介绍

Webpack本身是不能识别样式资源的，所以我们需要借助Loader来帮助Webpack解析样式资源，我们找Loader都应该去官方文档中找到对应的Loader，然后使用官方文档找不到的话，可以从社区Github中搜索查询。

### 处理Css资源

#### 1. 下载包

```
npm i css-loader style-loader -D
```

注意：需要下载两个Loader。

#### 2. 功能介绍

* `css-loader`：负责将Css文件编译成Webpack能识别的模块

* `style-loader`：会动态创建一个Style标签，里面放置Webpack中Css模块内容

此时样式就会以Style标签的形式在页面上生效。

#### 3. 配置 & 引入css资源

* main.js

```js
import './css/index.css'
```

* webpack.config.js

```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
}
```

**注意：**

`use`执行顺序：从后往前；

`loader: 'xxx'`：只能使用一个loader；

`use: [...]`：使用多个loader；

#### 4. 运行指令编译

```
npx webpack
```

### 处理Less资源

#### 1. 下载包

```
npm i less-loader -D
```

#### 2. 功能介绍

* `less-loader`：负责将Less文件编译成Css文件

#### 3. 配置 & 引入less资源

* main.js

```js
import './less/index.less' 
```

* webpack.config.js

```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    }
}
```

#### 4. 运行指令编译

```
npx webpack
```

