# mini_nodejs_proj

### 项目简介
首页提供GET方法与POST方法示例。
- GET

  首页呈现的是游戏《猫咪后院》的日志，包括猫咪的图片、名字以及其何时来到后院。  
点击某个item之后会进入猫咪的详情页面。  

- POST

  POST示例是提供一个简单的表单填写，点击提交之后服务器会返回你提交的数据给浏览器显示。

### 实现技术简介
一个使用NodeJS基础的http, fs, path, url, querystring等模块提供的API搭建的简单web服务器.
html页面非常简陋，因为本项目的重点是由nodejs搭建的简单服务器，提供GET、POST方法.

### 项目结构如下
```
mini_nodejs_proj
    |--data(存放数据的文件夹)
         |--cats.json(存放所有猫咪的数据)
    |--model(提供访问和操作数据服务的数据模型)
         |--getcat.js(猫咪数据访问模块)
    |--public(存放静态文件)
         |--css
         |--img
         |--js
    |--route(控制器)
         |--dynamic.js(处理动态请求的控制器)
         |--static.js(处理静态文件请求的控制器)
    |--views(用户界面)
         |--index.html(主页界面)
         |--detail.html(猫咪详情页面)
    |--app.js(服务器启动文件)
    |--README.md
```

### 项目启动方法
进入根目录，命令行敲入：
```
node app.js
```
