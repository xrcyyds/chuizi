"use strict";

$(function () {
  $('.header-car').hover(function () {
    $('.show-car').addClass('show');
  }, function () {
    $('.show-car').removeClass('show');
  });
  $('.nav-car').hover(function () {
    $('.show-car1').addClass('show');
  }, function () {
    $('.show-car1').removeClass('show');
  }); // 判断滚动时导航是否吸顶

  $(document).scroll(function () {
    if ($('.nav').offset().top >= 100) {
      // console.log(1);
      $('.nav-aside').css("display", "none");
      $('.topbar-aside').css("display", "block");
    } else {
      $('.nav-aside').css("display", "block");
      $('.topbar-aside').css("display", "none");
    }
  });
  $('.title-main li').each(function (index, item) {
    $(this).hover(function () {
      $('.nav-sub').css("display", "none");
      $('.nav-sub').eq(index).css("display", "block");
    }, function () {});
  });
  $('.title-main .title').hover(function () {
    $('.title-hide').addClass('title-show');
  }, function () {
    $('.title-hide').removeClass('title-show');
  }); // 获取数据 渲染热门商品结构

  $.getJSON("../js/热门商品.json", "", function (data) {
    var str = '';
    $.each(data, function (index, item) {
      str += "<section class=\"spu-item\">\n                <figure class=\"item-cover\">\n                <img src=\"".concat(item.img, "\" alt=\"\">\n            </figure>\n            <article>\n                <h3>").concat(item.title, "</h3>\n                <h5 class=\"txt\">").concat(item.title1, "</h5>\n            </article>\n            <aside class=\"item-attr-colors\"></aside>\n            <article class=\"item-price\">\n                <span>").concat(item.price, "</span>\n                <span class=\"orignal\">").concat(item.price2, "</span>\n            </article>\n            <div class=\"actvity-tag\">\n                <span >").concat(item.yellow, "</span>\n            </div>\n            </section>");
    });
    $(".flex-four").html(str);
    $('.actvity-tag span').each(function (index, item) {
      if ($(this).text() != "") {
        $(this).addClass("yellow");
      }
    });
  });
  $('.btn-right').click(function () {
    $(this).addClass('disabled');
    $('.btn-left').removeClass('disabled');
    $('.flex-four').css('transform', 'translate(-1218px,0px)');
  });
  $('.btn-left').click(function () {
    $(this).addClass('disabled');
    $('.btn-right').removeClass('disabled');
    $('.flex-four').css('transform', 'translate(0px,0px)');
  }); // 获取数据 渲染商品结构

  $.getJSON("../js/goods.json", "", function (data) {
    var str = '';
    var num = '';
    var abc = 0;
    $.each(data[0], function (index, item) {
      ++abc;
      str += "<div>\n            <section class=\"com-box\">\n            <header class=\"d-flex\">\n                <h5 class=\"".concat(index, "\">").concat(index, "</h5>\n            </header>\n            <aside class=\"flex\">\n                <figure class=\"big\" id=\"").concat(index, "\">\n                <img src=\"../images/big").concat(abc, ".png\" alt=\"\">\n                </figure>\n            </aside>\n        </section>\n            </div>          \n            ");
    });
    $('.boxs').after(str);
    $.each(data[0], function (index, item) {
      if (index == $(".".concat(index)).text()) {
        index = $(".".concat(index)).text();
        num = '';

        for (var i = 0; i < 6; i++) {
          num += "\n                    <figure class=\"flex-item\" >\n                                    <figure class=\"item-cover cover\" ix=\"".concat(data[0][index][i].id, "\">\n                                        <img src=\"").concat(data[0][index][i].img, "\" alt=\"\">\n                                    </figure>\n                                    <article>\n                                        <h3>").concat(data[0][index][i].title, "</h3>\n                                        <h5 class=\"txt\">").concat(data[0][index][i].title1, "</h5>\n                                    </article>\n                                    <aside class=\"item-attr-colors\"></aside>\n                                    <article class=\"item-price\">\n                                        <span>").concat(data[0][index][i].price, "</span>\n                                        <span class=\"orignal\">").concat(data[0][index][i].price2, "</span>\n                                    </article>\n                                    <div class=\"actvity-tag\">\n                                        <span >").concat(data[0][index][i].yellow, "</span>\n                                    </div>\n                                </figure>\n                    ");
        }

        ;
        $("#".concat(index)).after(num);
      }

      ;
      $('.actvity-tag span').each(function (index, item) {
        if ($(this).text() != "") {
          $(this).addClass("yellow");
        }
      });
    });
    $('.cover').each(function (index, item) {
      $(this).click(function () {
        var id = $(this).attr('ix');
        location.href = "../html/xiangqing.html?id=".concat(id);
      });
    });
  });
});