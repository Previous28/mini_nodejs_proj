// 处理本地文件目录需要使用Node.js提供的path模块，它可以方便地构造目录
var path = require('path');
// 处理文件需要fs模块
var fs = require('fs');

var MIME = {};
MIME[".css"] = "text/css";
MIME[".js"] = "text/js";
MIME[".jpg"] = "image/jpeg";
MIME[".jpeg"] = "image/jpeg";
MIME[".png"] = "image/png";
MIME[".gif"] = "image/gif";

function isImage (type) {
  if (type === ".jpg" || type === ".jpeg" || type === ".png" || type === ".gif") {
    return true;
  } else {
    return false;
  }
}

var get = function (pathname, res) {
  var type = path.extname(pathname);
  // 异步读取较大文件，防止页面“假死”
  fs.readFile(pathname, function (err, data) {
    if (!err) {
      res.writeHead(200, {'Content-Type': MIME[type]});
      if (isImage(type)) {
        res.end(data, "binary");
      } else {
        res.end(data.toString());
      }
    } else {
      if (type != '.ico')
        console.log(err);
    }
  });
};

module.exports = {
  get: get
};