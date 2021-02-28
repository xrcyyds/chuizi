"use strict";

$(function () {
  // 获取数据 渲染结构
  $.getJSON("../js/countrylist.json", "", function (data) {
    var str = '';
    $.each(data, function (index, item) {
      str += '<li>' + item.name + '</li>';
    });
    $('.countrylist').html(str);
    $('.countrylist').prepend('<p class="p">国家和地区</p>');
  }); // 鼠标滚动列表

  $(".countrylist").niceScroll({
    cursorborder: "",
    cursorcolor: "rgba(0,0,0,0)",
    boxzoom: true
  }); // 显示国家和地区列表

  $('.cy').click(function (e) {
    if ($('.countrylist').css("display") == "none") {
      $('.countrylist').show(); // 隐藏国家列表

      $(document).one("click", function () {
        $(".countrylist").hide();
      });
      e.stopPropagation();
    } else {
      $('.countrylist').hide();
    } // 改变选中的国家


    $('.countrylist').children().filter("li").click(function () {
      console.log($(this).text());
      $('.cy').text($(this).text());
    });
  }); // 手机号正则

  var sj = /^1[356789]\d{9}$/;
  $(".phone").focus(function () {
    $(".phone").attr("placeholder", "");
  });
  $(".phone").blur(function () {
    if ($(".phone").val() != "") {
      if (!sj.test($(".phone").val())) {
        $(".error1").css({
          "display": "block",
          "opacity": "1"
        });
      }
    } else {
      $(".phone").attr("placeholder", "手机号");
    }

    ;
  });
  $('.phone').on('input', function () {
    if ($(".phone").val() != "" && $(".pass").val() != "") {
      $(".btn").css("opacity", "1");
    } else {
      $(".btn").css("opacity", "0.3");
    }
  });
  $('.pass').on('input', function () {
    if ($(".phone").val() != "" && $(".pass").val() != "") {
      $(".btn").css("opacity", "1");
    } else {
      $(".btn").css("opacity", "0.3");
    }
  });
  $('.pass').focus(function () {
    $('.mm').text('');
  });
  $('.getyzm').click(function () {
    var sum = "";

    for (var i = 1; i <= 4; i++) {
      var num = Math.floor(Math.random() * 10);
      sum += num;
    }

    $('.yz').text(sum);
  });
  $('.btn').click(function () {
    // 当手机号输入正确且验证码正确
    if ($('.pass').val() == $('.yz').text() && sj.test($(".phone").val())) {
      $.ajax({
        type: "post",
        url: "../api/zhuce.php",
        data: {
          username: $('.phone').val(),
          password: $('.phone').val().substr(7)
        },
        dataType: "json",
        error: function error(data) {
          console.log(data);
        },
        success: function success(data) {
          console.log(data);

          if (data.code == 1) {//注册成功跳转到登录页面
            // location.href = './denglu.html';
          }
        }
      });
    }
  });
});