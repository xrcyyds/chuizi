/* 
    判断是否有登录：
        有：就直接显示购物车
        否：就应该跳到登录页面，进行登录，登录成功之后再跳到购物车页面
    登录成功的时候 设置了一个cookie 这个cookie的key = login
    判断cookie中是否 login
    当你从购物车 去到登录页面，登录成功之后 应该直接回到购物车
*/

// 如果login的值为空的时候就说明没有登录，就应该去登录页面
let login = getCookie('login');
if (!login) {
    localStorage.setItem('url', location.href);
    location.href = '../html/login.html';
}

let active = document.querySelector('.active');
active.onclick=function(){
    location.href = '../html/index.html';
    console.log(1);
}

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


class Car {
    constructor(ele, username) {
        this.ele = document.querySelector(ele);
        this.username = username;
        this.info = {
            number: 0,
            totalprice: 0
        };
        this.init()
    }
    init() {
        // 获取元素
        this.carttable = this.ele.querySelector('.cart-table');
        this.sx = this.ele.querySelector('.shipping-num .highlight i');
        this.zj = this.ele.querySelector('.shipping-num h5 i');
        this.prices = this.ele.querySelector('.shipping-price .highlight i');
        this.allChecked = this.ele.querySelector('.allChecked');


        // 调用获取购物车数据
        this.getData();

        this.ele.onclick =  (e) =>{
            // let target = e.target;
            this.id = e.target.getAttribute('idx');
            // console.log(this.id);

            // 判断点击元素中是否包含checked类名
            if (e.target.classList.contains('checked')) {
                // 遍历数据
                this.data.forEach(item => {
                    // 当点击的id等于某条数据的商品id时
                    if (item.id == this.id) {
                        // 把当前点击选择框的这个元素的is_select改为true
                        item.is_select = e.target.checked;
                    }
                })
                // 调用计算所选中商品的总价格和数量
                this.calculation();
            }

            // 判断点击元素中是否包含allchecked类名
            if (e.target.classList.contains('allChecked')) {
                // 如果是勾上的时候就 把勾去掉，下面所有商品的勾都要去掉，表示is_select = false
                // 如果没有白勾上，就把勾勾上，下面所有的商品都勾上 表示素有数据的is_select = true
                this.data.forEach(item => {
                    item.is_select = e.target.checked;
                })
                // 调用渲染结构
                this.render();
            }

            // 点击删减
            if (e.target.classList.contains('down')) {
                // 当点击减号的时候，先判断当前值为多杀，如果值为1不能在减
                // 如果值大于1 的时候
                // 发送ajax请求，更改数据中这条数据的数量
                // 当ajax请求修改成功之后 只需要再次修改一下this.data 中的数据即可

                // indexOf('数据') 
                // includes()判断数组中是否存在某个数据，存在就返回true,不存在就返回false
                // find() 去数组中找某个元素

                // 调用删减函数
                this.reduce();
            }
            // 点击添加
            if (e.target.classList.contains('up')) {
                // 调用添加函数
                this.add();
            }
            // 点击删除
            if (e.target.classList.contains('del')) {
                // 调用删除函数
                this.remove(this.id);
            }
            // 点击结算
            if (e.target.classList.contains('settlement')) {
                // 结算，把勾选的数据删除
                // 数据中is_select = true 这些数据被删除
                // 过滤is_select = true的这些数据，然后循环的去发送ajax请求

                let deleteData = this.data.filter(item => {
                    return item.is_select == true;
                })

                deleteData.forEach(item => {
                    this.remove(item.goods_id)
                })
            }
        }
    }

    // 获取购物车数据
    async getData() {
        let data = await pAjax({
            url: '../api/getcarData.php',
            data: {
                username: this.username
            }
        });      
        
        this.data = JSON.parse(data);
        // console.log(data);
        // console.log(data);
        // 改变所有数据的is_select值，使其未被勾选
        this.data.forEach(item => {
            item.is_select = false;
        })
        // 调用渲染结构
        this.render()
    }

    // 渲染结构
    render() {
        // 调用计算所选中商品的总价格和数量
        this.calculation();
        let str = '';
        let sum = '';
        let num = '';

        this.data.forEach(item => {
            let xj = (item.price.split('￥')[1].replace(',', '') * item.goods_num);
            sum = sum * 1 + (item.price.split('￥')[1].replace(',', '') * item.goods_num) * 1;
            str += `
            <div class="item-list have-margin">
            <div class="cart-group">
                    <div class="cart-items">
                        <div class="cart-item">
                            <div class="checkbox">
                            <input type="checkbox" ${item.is_select ? "checked" :''} class="checked checkbox-on" idx="${item.id}">
                            </div>
                            <div class="item-wrapper">
                                <div class="items-thumb">
                                    <img src="${item.img}" alt="">
                                </div>
                                <div class="name hide-row">
                                    <div class="name-table">
                                        <a >${item.title}</a>
                                        <ul><li>${item.color}</li></ul>
                                    </div>
                                </div>
                                <div class="operation">
                                    <a  class="del" idx="${item.id}"></a>
                                </div>
                                <div class="">
                                    <div class="subtotal">
                                        <p class="discount">
                                            <i>￥</i>
                                            <span>${xj}</span>
                                        </p>
                                    </div>
                                    <div class="item-cols-num">
                                        <div class="quanity">
                                            <span class="button down" idx="${item.id}">-</span>
                                            <span class="num">
                                                ${item.goods_num}
                                            </span>
                                            <span class="button up" idx="${item.id}">+</span>
                                        </div>
                                    </div>
                                    <div class="price">${item.price.split('￥')[1].replace(',', '')}</div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
            `

            num = item.goods_num * 1 + num * 1;
        });

        this.carttable.innerHTML = str;
        // this.prices.innerHTML = sum;
        this.zj.innerHTML = num;

        this.down = document.querySelectorAll('.down');
        this.up = document.querySelectorAll('.up');
        this.goodnum = document.querySelectorAll('.num')

        this.goodnum.forEach(item => {
            if (item.innerHTML != '1') {
                item.previousElementSibling.style.backgroundPosition = '-1px -59px';
                item.previousElementSibling.style.cursor = 'pointer'
            }
        });

        // console.log(up);
        this.up.forEach(item => {
            item.onmouseover = function () {
                item.style.backgroundPosition = '-1px -119px';
            }
            item.onmouseout = function () {
                item.style.backgroundPosition = '-1px -1px';
            }
        });
    }

    // 计算所选中商品的总价格和数量
    calculation() {
        /* 
        给每一个商品数据都添加一个is_select属性，
        当属性值为true的时候那么就说明这个商品被选择，
        如果is_select 的值为false那么就说明没有选择 
        */

        //过滤所选中的商品
        this.selectdata = this.data.filter(item => {
            return item.is_select == true;
        });
        // 所选商品数量
        this.info.number = this.selectdata.reduce((pre, cur) => {
            return pre + cur.goods_num * 1;
        }, 0);
        // 所选商品总价格
        this.info.totalprice = this.selectdata.reduce((pre, cur) => {
            return pre + cur.price.split('￥')[1].replace(',', '') * cur.goods_num;
        },0)


        // 判断是否全选 当所有数据中的is_select = true 的时候表示所有的数据都被勾上
        let res = this.data.every(item => {
            return item.is_select == true
        })

        // 把商品的种类 和所选商品的数量 和价格渲染到结构
        // this.species.innerHTML = this.data.length;
        this.sx.innerHTML = this.info.number;
        this.prices.innerHTML = this.info.totalprice;
        this.allChecked.checked = res;

    }

    // 删减数量的函数
    reduce() {
        let num = this.data.find(item => {
            return item.id == this.id;
        }).goods_num



        if (num <= 1) {
            alert('商品数量最小为1')
            return
        }
        //先修改数据库中数据，当数据库中的数据修改成功之后在修改 this.data中数据 
        pAjax({
            url: '../api/updatacar.php',
            data: {
                'goods_id': this.id,
                'goods_num': --num,
                'username': this.username
            }
        }).then(res => {
            res = JSON.parse(res);
            if (res.code) {
                this.data.forEach(item => {
                    if (item.id == this.id) {
                        item.goods_num = num;
                        this.render();
                    }
                })
            }
        })
    }

    // 添加数量的函数
    add() {
        let num = this.data.find(item => {
            return item.id == this.id;
        }).goods_num


        pAjax({
            url: '../api/updatacar.php',
            data: {
                'goods_id': this.id,
                'goods_num': ++num,
                'username': this.username
            }
        }).then(res => {
            res = JSON.parse(res);
            if (res.code) {
                this.data.forEach(item => {
                    if (item.id == this.id) {
                        item.goods_num = num;
                        this.render();
                    }
                })
            }
        })
    }
    // 删除的函数
    remove(id) {
        // 发送ajax请求 需要传递 用户和goods_id过去
        pAjax({
            url: '../api/deletecar.php',
            data: {
                'username': this.username,
                'goods_id': id
            }
        }).then(res => {
            res = JSON.parse(res);
            if (res.code) {
                // 把this.data中的这条数据删除 然后在渲染 this.render();
                this.data = this.data.filter(item => {
                    return item.id != id;
                })
                this.render();
            }
        })
    }
}

new Car('#app', login)
