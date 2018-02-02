'use strict'
//导入http模块
var http = require('http');
// 解析URL需要用到Node.js提供的url模块
var url = require('url');
//加载自定义的router
var sta_router = require('./route/static');
var dy_router = require('./route/dynamic');
var rngexp = /\/public\/[img|css|js]\/[[a-z]*|[A-Z]*]*\.(js|css|jpg|jpeg|gif|png|ico)/;

// 创建http server，并传入回调函数
var server = http.createServer(function (request, response) {
  // 回调函数接受request和response对象
  // 获得http请求的method和url
  console.log(request.method + ": " + request.url);
  // 获得pathname，如/html/index.html
  var pathname = url.parse(request.url).pathname;
  if (rngexp.test(pathname)) {
    // 获取静态文件交给静态路由去处理，如css、js、图片等
    sta_router.get(__dirname + pathname, response);
  } else {
    // 其他的（需要动态生成的页面或者post请求）交给动态路由去处理
    // 根据request的方法调用相应的接口
    if (request.method === 'GET') {
      dy_router.get(request, response);
    } else {
      dy_router.post(request, response);
    }
  }
});

// 让服务器监听8000端口
server.listen(8000);

console.log("Server is running at http://127.0.0.1:8000/");