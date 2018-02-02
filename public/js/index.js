(function() {
  'use strict';

  window.onload = function() {
    var catList = document.getElementsByClassName('cat-item');
    for (var i = 0; i < catList.length; ++i) {
      catList[i].onclick = goToDetail;
    }
  };

  // 点击跳转到对应的详情页
  function goToDetail() {
    window.location = '/detail?id=' + this.id;
  }
})();