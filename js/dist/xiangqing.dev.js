"use strict";

$(function () {
  $('.header-car').hover(function () {
    $('.show-car').addClass('show');
  }, function () {
    $('.show-car').removeClass('show');
  });
  $('.active').click(function () {
    location.href = '../html/index.html';
  });
}); // id为1-无穷大的数字

var reg = /id=(\d+)/; // 如果id值不符合时跳转到列表页

if (!reg.test(location.search)) {
  location.href = '../html/index.html';
} // 提取id


var id = reg.exec(location.search)[1]; // console.log(id);

var main = document.querySelector('.main');
pAjax({
  url: '../api/getDetail.php',
  data: {
    id: id
  }
}).then(function (res) {
  res = JSON.parse(res);
  renderHTML(res.detail);
});

function renderHTML(data) {
  main.innerHTML = "\n        <div class=\"info\">\n                    <div class=\"title\">\n                        <h1>".concat(data.title, "</h1>\n                        <h2> ").concat(data.title1, " </h2>\n                    </div>\n                    <div class=\"active\">\n                        <span class=\"active-title\">\u4FC3\u9500\u6D3B\u52A8</span>\n                        <div class=\"active-wrapper\">\n                            <div class=\"active-item\">\n                                <span class=\"tag\">\u65B0\u4EBA\u793C</span>\n                                <span class=\"item-content\">\u4E0B\u8F7D App \u9886\u65B0\u4EBA\u5927\u793C\u5305\uFF0C\u9996\u5355\u4F18\u60E0\u8D2D\u6700\u4F4E\u53EA\u8981 \xA5 9.9 \n                                    <a href=\"\">\u67E5\u770B\u8BE6\u60C5</a>\n                                </span> \n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"product\">\n                        <div class=\"top\">\n                            <span class=\"spec-name\">\u989C\u8272\u9009\u62E9</span>\n                            <div class=\"spec-info\">\n                                <button>").concat(data.color, "</button>\n                            </div>\n                        </div>\n                        <div class=\"bottom\">\n                            <span class=\"spec-name\">\u6570\u91CF\u9009\u62E9</span>\n                            <div class=\"spec-info\">\n                                <button class=\"reduce\"> - </button>\n                                <button class=\"num\"> 1 </button>\n                                <button class=\"add\"> + </button>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"clearfix\">\n                        <div>\n                            <span>\u670D\u52A1\u8BF4\u660E</span>\n                            <aside class=\"text\">\n                                <p>*\u6EE199\u5143\u5305\u90AE</p>\n                            </aside>\n                        </div>\n                    </div>\n                </div>\n                <figure class=\"view\">\n                    <img src=\"").concat(data.img, "\" alt=\"\">\n                </figure>\n                <div class=\"follow\">\n                <div class=\"follow-wrapper\">\n                    <h1 class=\"bar-text\">\u60A8\u5DF2\u9009\u62E9\u4E86</h1>\n                    <div class=\"bar-info\">\n                        <h1 class=\"clearfix\">\n                            <span class=\"title\">").concat(data.title, " x 1</span>                            \n                        </h1>\n                        <h2>").concat(data.color, "</h2>\n                    </div>\n                    <div class=\"bar-btn\">\n                        <a class=\"add-car\">\u52A0\u5165\u8D2D\u7269\u8F66</a>\n                    </div>\n                    <div class=\"bar-btn white-btn\">\n                        <a  class=\"go-car\">\u73B0\u5728\u8D2D\u4E70</a>\n                    </div>\n                    <div class=\"bar-price\">\n                        <div>\n                        <span>").concat(data.price, "</span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        ");
  var reduce = document.querySelector('.reduce');
  var num = document.querySelector('.num');
  var add = document.querySelector('.add');
  var titletop = document.querySelector('.info .title h1');
  var title = document.querySelector('.bar-info .clearfix .title');
  var price1 = document.querySelector('.bar-price div span');
  var price = data.price.split('￥')[1].replace(',', '');

  main.onclick = function () {
    var e = window.event;

    if (e.target.className == 'reduce') {
      if (num.innerHTML > 1) {
        num.innerHTML = num.innerHTML - 1;
        title.innerHTML = titletop.innerHTML + 'x' + num.innerHTML;
        price1.innerHTML = '￥' + (price * num.innerHTML).toFixed(2);
      } else {
        num.innerHTML = 1;
      }
    }

    ;

    if (e.target.className == 'add') {
      num.innerHTML = num.innerHTML * 1 + 1;
      title.innerHTML = titletop.innerHTML + 'x' + num.innerHTML;
      price1.innerHTML = '￥' + (price * num.innerHTML).toFixed(2);
    } // 点击去购物车时


    if (e.target.className == 'go-car') {
      console.log(1); // 修改localation地址

      location.href = '../html/car.html';
    } // 点击添加到购物车时


    if (e.target.className == 'add-car') {
      // 判断是否已登录
      var login = getCookie('login');
      console.log(login);
      console.log(num.innerHTML); // 当login为非时说明没登录

      if (!login) {
        // 提示登录
        alert('请先登录'); // 修改locarion的地址

        localStorage.setItem('url', location.href);
        location.href = '../html/denglu.html';
        return;
      } // 当登录了时添加该数据到购物车表


      pAjax({
        url: '../api/addCar.php',
        type: 'post',
        data: {
          'goods_id': id,
          'username': login,
          'goods_num': num.innerHTML
        }
      }).then(function (res) {
        console.log(res);
      });
    }
  };
}