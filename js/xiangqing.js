$(function () {
    $('.header-car').hover(function () {
        $('.show-car').addClass('show');
    }, function () {
        $('.show-car').removeClass('show');
    });

    $('.active').click(function () {
        location.href = '../html/index.html';
    });
})

// id为1-无穷大的数字
let reg = /id=(\d+)/;
// 如果id值不符合时跳转到列表页
if (!reg.test(location.search)) {
    location.href = '../html/index.html';
}
// 提取id
let id = reg.exec(location.search)[1];
// console.log(id);
let main = document.querySelector('.main');

pAjax({
    url: '../api/getDetail.php',
    data: {
        id
    }
}).then(res => {
    res = JSON.parse(res);
    renderHTML(res.detail);
})

function renderHTML(data) {
    main.innerHTML = `
        <div class="info">
                    <div class="title">
                        <h1>${data.title}</h1>
                        <h2> ${data.title1} </h2>
                    </div>
                    <div class="active">
                        <span class="active-title">促销活动</span>
                        <div class="active-wrapper">
                            <div class="active-item">
                                <span class="tag">新人礼</span>
                                <span class="item-content">下载 App 领新人大礼包，首单优惠购最低只要 ¥ 9.9 
                                    <a href="">查看详情</a>
                                </span> 
                            </div>
                        </div>
                    </div>
                    <div class="product">
                        <div class="top">
                            <span class="spec-name">颜色选择</span>
                            <div class="spec-info">
                                <button>${data.color}</button>
                            </div>
                        </div>
                        <div class="bottom">
                            <span class="spec-name">数量选择</span>
                            <div class="spec-info">
                                <button class="reduce"> - </button>
                                <button class="num"> 1 </button>
                                <button class="add"> + </button>
                            </div>
                        </div>
                    </div>
                    <div class="clearfix">
                        <div>
                            <span>服务说明</span>
                            <aside class="text">
                                <p>*满99元包邮</p>
                            </aside>
                        </div>
                    </div>
                </div>
                <figure class="view">
                    <img src="${data.img}" alt="">
                </figure>
                <div class="follow">
                <div class="follow-wrapper">
                    <h1 class="bar-text">您已选择了</h1>
                    <div class="bar-info">
                        <h1 class="clearfix">
                            <span class="title">${data.title} x 1</span>                            
                        </h1>
                        <h2>${data.color}</h2>
                    </div>
                    <div class="bar-btn">
                        <a class="add-car">加入购物车</a>
                    </div>
                    <div class="bar-btn white-btn">
                        <a  class="go-car">现在购买</a>
                    </div>
                    <div class="bar-price">
                        <div>
                        <span>${data.price}</span>
                        </div>
                    </div>
                </div>
            </div>
        `

    var reduce = document.querySelector('.reduce');
    let num = document.querySelector('.num');
    let add = document.querySelector('.add');
    let titletop = document.querySelector('.info .title h1')
    let title = document.querySelector('.bar-info .clearfix .title')
    let price1 = document.querySelector('.bar-price div span')
    let price = data.price.split('￥')[1].replace(',', '');

    main.onclick = function () {
        let e = window.event;

        if (e.target.className == 'reduce') {
            if (num.innerHTML > 1) {
                num.innerHTML = num.innerHTML - 1;
                title.innerHTML = titletop.innerHTML + 'x' + num.innerHTML;
                price1.innerHTML = '￥' + (price * num.innerHTML).toFixed(2)
            } else {
                num.innerHTML = 1
            }
        };

        if (e.target.className == 'add') {
            num.innerHTML = num.innerHTML * 1 + 1;
            title.innerHTML = titletop.innerHTML + 'x' + num.innerHTML;
            price1.innerHTML = '￥' + (price * num.innerHTML).toFixed(2);
        }


        // 点击去购物车时
        if (e.target.className == 'go-car') {

            console.log(1);
            // 修改localation地址
            location.href = '../html/car.html';
        }
        // 点击添加到购物车时
        if (e.target.className == 'add-car') {
            // 判断是否已登录
            let login = getCookie('login');

            console.log(login);
            console.log(num.innerHTML);

            // 当login为非时说明没登录
            if (!login) {
                // 提示登录
                alert('请先登录');
                // 修改locarion的地址
                localStorage.setItem('url', location.href);
                location.href = '../html/denglu.html';
                return
            }
            
            // 当登录了时添加该数据到购物车表
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
            })
        }
    }
}