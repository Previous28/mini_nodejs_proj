'use strict'
var path = require('path');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
var cats = require('../model/getcat')();

var getHandler = {};
var postHandler = {};

// 处理主页的请求
getHandler['/'] = function (req, res) {
  var dynamicHtml = "";
  var cat = cats.getCatList();
  // 拼接数据
  for (var i = 0; i < cat.length; ++i) {
    dynamicHtml += "<div class=\"cat-item\" id=\"" + cat[i].id + "\"><img src=\"" + cat[i].img;
    dynamicHtml += "\"> <p>" + cat[i].name + "</p>" + "<p>" + cat[i].birthday + "</p></div>";
  }
  // 动态渲染模版
  fs.readFile("./view/index.html", function (err, data) {
    if (!err) {
      res.writeHead(200);
      res.end(data.toString().replace("{{main content}}", dynamicHtml));
    } else {
      console.log(err);
      res.end();
    }
  });
}

// 处理对详情页的请求
getHandler['/detail'] = function (req, res) {
  var query = querystring.parse(url.parse(req.url).query);
  var cat = cats.getCatItem(query.id);
  var dynamicHtml = "<div> <img  src=\"" + cat.img + "\"> <p>" + cat.name + "</p>";
  dynamicHtml += "<p>" + cat.birthday + "</p>" + "<p>" + cat.details + "</p> </div>";

  fs.readFile("./view/detail.html", function (err, data) {
    if (!err) {
      res.writeHead(200);
      // 动态渲染模版
      res.end(data.toString().replace("{{main content}}", dynamicHtml));
    } else {
      console.log(err);
    }
  });
}

getHandler['/404'] = function (req, res) {
  res.writeHead(404);
  res.end();
}

// post方法示例
postHandler['/query'] = function (res, data) {
  res.writeHead(200, 'Content-Type: text/html');
  console.log(data);
  var str = "";
  for (var key in data) {
    str += key + ': ' + data[key] + '\n';
  }
  res.end(str);
}

function get (req, res) {
  var pathname = url.parse(req.url).pathname;
  if (typeof getHandler[pathname] === 'function') {
    getHandler[pathname](req, res);
  } else {
    getHandler['/404'](req, res);
  }
}

function post (req, res) {
  var pathname = url.parse(req.url).pathname;
  if (typeof postHandler[pathname] === 'function') {
    var postData = "";
    // 监听data事件
    req.on('data', function (data) {
      postData += data;
    });
    // 监听end事件
    req.on('end', function () {
      postData = querystring.parse(postData);
      postHandler[pathname](res, postData);
    });
  } else {
    getHandler['/404'](req, res);
  }
}
// 提供接口
module.exports = {
  get: get,
  post: post
}