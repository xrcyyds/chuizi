"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* 
    判断是否有登录：
        有：就直接显示购物车
        否：就应该跳到登录页面，进行登录，登录成功之后再跳到购物车页面
    登录成功的时候 设置了一个cookie 这个cookie的key = login
    判断cookie中是否 login
    当你从购物车 去到登录页面，登录成功之后 应该直接回到购物车
*/
// 如果login的值为空的时候就说明没有登录，就应该去登录页面
var login = getCookie('login');

if (!login) {
  localStorage.setItem('url', location.href);
  location.href = '../html/login.html';
}

var active = document.querySelector('.active');

active.onclick = function () {
  location.href = '../html/index.html';
  console.log(1);
};
/* 
    面向对象的形式编程：
    【1】创建对象 class Car{}
    【2】描述对象
        静态属性：
            ele 操作那个容器下的内容
        动态方法：
            initial(){} 初始化 获取元素 绑定事件
            getData() 获取购物车数据
            render() 渲染结构
            calculation() 计算所选择商品的总价格和数量
            reduce() 点击减时数量减一
            add() 点击加时数量加一
            remove() 点击删除时删除选中行
*/


var Car =
/*#__PURE__*/
function () {
  function Car(ele, username) {
    _classCallCheck(this, Car);

    this.ele = document.querySelector(ele);
    this.username = username;
    this.info = {
      number: 0,
      totalprice: 0
    };
    this.init();
  }

  _createClass(Car, [{
    key: "init",
    value: function init() {
      var _this = this;

      // 获取元素
      this.carttable = this.ele.querySelector('.cart-table');
      this.sx = this.ele.querySelector('.shipping-num .highlight i');
      this.zj = this.ele.querySelector('.shipping-num h5 i');
      this.prices = this.ele.querySelector('.shipping-price .highlight i');
      this.allChecked = this.ele.querySelector('.allChecked'); // 调用获取购物车数据

      this.getData();

      this.ele.onclick = function (e) {
        // let target = e.target;
        _this.id = e.target.getAttribute('idx'); // console.log(this.id);
        // 判断点击元素中是否包含checked类名

        if (e.target.classList.contains('checked')) {
          // 遍历数据
          _this.data.forEach(function (item) {
            // 当点击的id等于某条数据的商品id时
            if (item.id == _this.id) {
              // 把当前点击选择框的这个元素的is_select改为true
              item.is_select = e.target.checked;
            }
          }); // 调用计算所选中商品的总价格和数量


          _this.calculation();
        } // 判断点击元素中是否包含allchecked类名


        if (e.target.classList.contains('allChecked')) {
          // 如果是勾上的时候就 把勾去掉，下面所有商品的勾都要去掉，表示is_select = false
          // 如果没有白勾上，就把勾勾上，下面所有的商品都勾上 表示素有数据的is_select = true
          _this.data.forEach(function (item) {
            item.is_select = e.target.checked;
          }); // 调用渲染结构


          _this.render();
        } // 点击删减


        if (e.target.classList.contains('down')) {
          // 当点击减号的时候，先判断当前值为多杀，如果值为1不能在减
          // 如果值大于1 的时候
          // 发送ajax请求，更改数据中这条数据的数量
          // 当ajax请求修改成功之后 只需要再次修改一下this.data 中的数据即可
          // indexOf('数据') 
          // includes()判断数组中是否存在某个数据，存在就返回true,不存在就返回false
          // find() 去数组中找某个元素
          // 调用删减函数
          _this.reduce();
        } // 点击添加


        if (e.target.classList.contains('up')) {
          // 调用添加函数
          _this.add();
        } // 点击删除


        if (e.target.classList.contains('del')) {
          // 调用删除函数
          _this.remove(_this.id);
        } // 点击结算


        if (e.target.classList.contains('settlement')) {
          // 结算，把勾选的数据删除
          // 数据中is_select = true 这些数据被删除
          // 过滤is_select = true的这些数据，然后循环的去发送ajax请求
          var deleteData = _this.data.filter(function (item) {
            return item.is_select == true;
          });

          deleteData.forEach(function (item) {
            _this.remove(item.goods_id);
          });
        }
      };
    } // 获取购物车数据

  }, {
    key: "getData",
    value: function getData() {
      var data;
      return regeneratorRuntime.async(function getData$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(pAjax({
                url: '../api/getcarData.php',
                data: {
                  username: this.username
                }
              }));

            case 2:
              data = _context.sent;
              this.data = JSON.parse(data); // console.log(data);
              // console.log(data);
              // 改变所有数据的is_select值，使其未被勾选

              this.data.forEach(function (item) {
                item.is_select = false;
              }); // 调用渲染结构

              this.render();

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    } // 渲染结构

  }, {
    key: "render",
    value: function render() {
      // 调用计算所选中商品的总价格和数量
      this.calculation();
      var str = '';
      var sum = '';
      var num = '';
      this.data.forEach(function (item) {
        var xj = item.price.split('￥')[1].replace(',', '') * item.goods_num;
        sum = sum * 1 + item.price.split('￥')[1].replace(',', '') * item.goods_num * 1;
        str += "\n            <div class=\"item-list have-margin\">\n            <div class=\"cart-group\">\n                    <div class=\"cart-items\">\n                        <div class=\"cart-item\">\n                            <div class=\"checkbox\">\n                            <input type=\"checkbox\" ".concat(item.is_select ? "checked" : '', " class=\"checked checkbox-on\" idx=\"").concat(item.id, "\">\n                            </div>\n                            <div class=\"item-wrapper\">\n                                <div class=\"items-thumb\">\n                                    <img src=\"").concat(item.img, "\" alt=\"\">\n                                </div>\n                                <div class=\"name hide-row\">\n                                    <div class=\"name-table\">\n                                        <a >").concat(item.title, "</a>\n                                        <ul><li>").concat(item.color, "</li></ul>\n                                    </div>\n                                </div>\n                                <div class=\"operation\">\n                                    <a  class=\"del\" idx=\"").concat(item.id, "\"></a>\n                                </div>\n                                <div class=\"\">\n                                    <div class=\"subtotal\">\n                                        <p class=\"discount\">\n                                            <i>\uFFE5</i>\n                                            <span>").concat(xj, "</span>\n                                        </p>\n                                    </div>\n                                    <div class=\"item-cols-num\">\n                                        <div class=\"quanity\">\n                                            <span class=\"button down\" idx=\"").concat(item.id, "\">-</span>\n                                            <span class=\"num\">\n                                                ").concat(item.goods_num, "\n                                            </span>\n                                            <span class=\"button up\" idx=\"").concat(item.id, "\">+</span>\n                                        </div>\n                                    </div>\n                                    <div class=\"price\">").concat(item.price.split('￥')[1].replace(',', ''), "</div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n            </div>\n        </div>\n            ");
        num = item.goods_num * 1 + num * 1;
      });
      this.carttable.innerHTML = str; // this.prices.innerHTML = sum;

      this.zj.innerHTML = num;
      this.down = document.querySelectorAll('.down');
      this.up = document.querySelectorAll('.up');
      this.goodnum = document.querySelectorAll('.num');
      this.goodnum.forEach(function (item) {
        if (item.innerHTML != '1') {
          item.previousElementSibling.style.backgroundPosition = '-1px -59px';
          item.previousElementSibling.style.cursor = 'pointer';
        }
      }); // console.log(up);

      this.up.forEach(function (item) {
        item.onmouseover = function () {
          item.style.backgroundPosition = '-1px -119px';
        };

        item.onmouseout = function () {
          item.style.backgroundPosition = '-1px -1px';
        };
      });
    } // 计算所选中商品的总价格和数量

  }, {
    key: "calculation",
    value: function calculation() {
      /* 
      给每一个商品数据都添加一个is_select属性，
      当属性值为true的时候那么就说明这个商品被选择，
      如果is_select 的值为false那么就说明没有选择 
      */
      //过滤所选中的商品
      this.selectdata = this.data.filter(function (item) {
        return item.is_select == true;
      }); // 所选商品数量

      this.info.number = this.selectdata.reduce(function (pre, cur) {
        return pre + cur.goods_num * 1;
      }, 0); // 所选商品总价格

      this.info.totalprice = this.selectdata.reduce(function (pre, cur) {
        return pre + cur.price.split('￥')[1].replace(',', '') * cur.goods_num;
      }, 0); // 判断是否全选 当所有数据中的is_select = true 的时候表示所有的数据都被勾上

      var res = this.data.every(function (item) {
        return item.is_select == true;
      }); // 把商品的种类 和所选商品的数量 和价格渲染到结构
      // this.species.innerHTML = this.data.length;

      this.sx.innerHTML = this.info.number;
      this.prices.innerHTML = this.info.totalprice;
      this.allChecked.checked = res;
    } // 删减数量的函数

  }, {
    key: "reduce",
    value: function reduce() {
      var _this2 = this;

      var num = this.data.find(function (item) {
        return item.id == _this2.id;
      }).goods_num;

      if (num <= 1) {
        alert('商品数量最小为1');
        return;
      } //先修改数据库中数据，当数据库中的数据修改成功之后在修改 this.data中数据 


      pAjax({
        url: '../api/updatacar.php',
        data: {
          'goods_id': this.id,
          'goods_num': --num,
          'username': this.username
        }
      }).then(function (res) {
        res = JSON.parse(res);

        if (res.code) {
          _this2.data.forEach(function (item) {
            if (item.id == _this2.id) {
              item.goods_num = num;

              _this2.render();
            }
          });
        }
      });
    } // 添加数量的函数

  }, {
    key: "add",
    value: function add() {
      var _this3 = this;

      var num = this.data.find(function (item) {
        return item.id == _this3.id;
      }).goods_num;
      pAjax({
        url: '../api/updatacar.php',
        data: {
          'goods_id': this.id,
          'goods_num': ++num,
          'username': this.username
        }
      }).then(function (res) {
        res = JSON.parse(res);

        if (res.code) {
          _this3.data.forEach(function (item) {
            if (item.id == _this3.id) {
              item.goods_num = num;

              _this3.render();
            }
          });
        }
      });
    } // 删除的函数

  }, {
    key: "remove",
    value: function remove(id) {
      var _this4 = this;

      // 发送ajax请求 需要传递 用户和goods_id过去
      pAjax({
        url: '../api/deletecar.php',
        data: {
          'username': this.username,
          'goods_id': id
        }
      }).then(function (res) {
        res = JSON.parse(res);

        if (res.code) {
          // 把this.data中的这条数据删除 然后在渲染 this.render();
          _this4.data = _this4.data.filter(function (item) {
            return item.id != id;
          });

          _this4.render();
        }
      });
    }
  }]);

  return Car;
}();

new Car('#app', login);