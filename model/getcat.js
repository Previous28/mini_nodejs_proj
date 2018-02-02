'use strict'
var fs = require('fs');

module.exports = function () {
  var filepath = __dirname + "/../data/cats.json";
  try {
    // 同步读取确保数据在要用时已经得到
    var data = JSON.parse(fs.readFileSync(filepath));
  } catch (err) {
    console.log(err);
  }
  
  var cats = {
    getCatList:getCatList,
    getCatItem:getCatItem
  };
  // 返回猫猫列表
  function getCatList () {
    return data.cats;
  }
  // 根据id返回指定的猫猫
  function getCatItem (id) {
    for (var i = 0; i < data.cats.length; ++i) {
      if (data.cats[i].id == id) {
        return data.cats[i];
      }
    }
  }

  return cats;
};