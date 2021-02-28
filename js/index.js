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
    });


    // 判断滚动时导航是否吸顶
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
        }, function () {})
    });

    $('.title-main .title').hover(function () {
        $('.title-hide').addClass('title-show');
    }, function () {
        $('.title-hide').removeClass('title-show');
    });

    // 获取数据 渲染热门商品结构
    $.getJSON("../js/热门商品.json", "", function (data) {
        let str = '';

        $.each(data, function (index, item) {
            str += `<section class="spu-item">
                <figure class="item-cover">
                <img src="${item.img}" alt="">
            </figure>
            <article>
                <h3>${item.title}</h3>
                <h5 class="txt">${item.title1}</h5>
            </article>
            <aside class="item-attr-colors"></aside>
            <article class="item-price">
                <span>${item.price}</span>
                <span class="orignal">${item.price2}</span>
            </article>
            <div class="actvity-tag">
                <span >${item.yellow}</span>
            </div>
            </section>`

        })
        $(".flex-four").html(str);

        $('.actvity-tag span').each(function (index, item) {
            if ($(this).text() != "") {
                $(this).addClass("yellow");
            }
        });

    });

    $('.btn-right').click(function () {
        $(this).addClass('disabled');
        $('.btn-left').removeClass('disabled')
        $('.flex-four').css('transform', 'translate(-1218px,0px)')
    });
    $('.btn-left').click(function () {
        $(this).addClass('disabled');
        $('.btn-right').removeClass('disabled')
        $('.flex-four').css('transform', 'translate(0px,0px)')
    });

    // 获取数据 渲染商品结构
    $.getJSON("../js/goods.json", "", function (data) {
        let str = '';
        let num = '';
        let abc = 0;
        $.each(data[0], function (index, item) {
            ++abc
            str += `<div>
            <section class="com-box">
            <header class="d-flex">
                <h5 class="${index}">${index}</h5>
            </header>
            <aside class="flex">
                <figure class="big" id="${index}">
                <img src="../images/big${abc}.png" alt="">
                </figure>
            </aside>
        </section>
            </div>          
            `
        })
        $('.boxs').after(str);

        $.each(data[0], function (index, item) {
            if (index == $(`.${index}`).text()) {
                index = $(`.${index}`).text();
                num = '';
                for (let i = 0; i < 6; i++) {
                    num += `
                    <figure class="flex-item" >
                                    <figure class="item-cover cover" ix="${data[0][index][i].id}">
                                        <img src="${data[0][index][i].img}" alt="">
                                    </figure>
                                    <article>
                                        <h3>${data[0][index][i].title}</h3>
                                        <h5 class="txt">${data[0][index][i].title1}</h5>
                                    </article>
                                    <aside class="item-attr-colors"></aside>
                                    <article class="item-price">
                                        <span>${data[0][index][i].price}</span>
                                        <span class="orignal">${data[0][index][i].price2}</span>
                                    </article>
                                    <div class="actvity-tag">
                                        <span >${data[0][index][i].yellow}</span>
                                    </div>
                                </figure>
                    `
                };
                $(`#${index}`).after(num);
            };
            $('.actvity-tag span').each(function (index, item) {
                if ($(this).text() != "") {
                    $(this).addClass("yellow");
                }
            });
        });


        $('.cover').each(function (index, item) {
            $(this).click(function () {
                let id = $(this).attr('ix');
                location.href = `../html/xiangqing.html?id=${id}`;
            })
        })
    });




})