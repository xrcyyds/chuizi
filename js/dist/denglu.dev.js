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
  });
  $(".eye").click(function () {
    // 切换显示密码
    if ($(".pass").attr("type") == "password") {
      $(".pass").attr("type", "text");
    } else {
      $(".pass").attr("type", "password");
    }

    ; // 切换背景图

    if ($(".eye").css("background-image") == 'url("http://www.chuizi.com/images/eye-hidden.png")') {
      $(".eye").css("background-image", 'url("http://www.chuizi.com/images/eye_show.png');
    } else {
      $(".eye").css("background-image", 'url("http://www.chuizi.com/images/eye-hidden.png');
    }
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
      } else {
        $(".error1").css({
          "display": "none",
          "opacity": "0"
        });
      }
    } else {
      $(".phone").attr("placeholder", "手机号");
    }
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
  $(".pass").focus(function () {
    $(".mm").css("display", "none");
  });
  $(".pass").blur(function () {
    if ($('.pass').val() == "") {
      $(".mm").css("display", "inline-block");
    } else {
      $(".mm").css("display", "none");
    }
  });
  $('.btn').click(function () {
    $.ajax({
      type: "post",
      url: "../api/denglu.php",
      data: {
        username: $('.phone').val(),
        password: $('.pass').val()
      },
      dataType: "json",
      success: function success(data) {
        if (data.code == 1) {
          // 登录成功存储 登录的状态
          setCookie('login', $('.phone').val());
          var url = localStorage.getItem('url'); // 如果有值说明从购物车压面来的

          if (url) {
            // 返回之前的页面
            location.href = url; // 登录成功的时候把url的这个localstorage值清除

            localStorage.removeItem('url');
          } else {
            location.href = '../html/index.html';
          } // location.href = '../html/index.html';


          $(".error2").css({
            "display": "none",
            "opacity": "0"
          });
        } else {
          $(".error2").css({
            "display": "block",
            "opacity": "1"
          });
        }
      }
    });
  });
});