$(function () {

    // ---------大轮播图---------
    (function () {
        let now = 1;
        let timer = null;

        timer = setInterval(function () {
            next()
        }, 4000)

        $('.banner_box').hover(function () {
            clearInterval(timer);
        }, function () {
            timer = setInterval(function () {
                next()
            }, 4000)
        })

        function next() {
            now++
            if (now >= 9) {
                now = 1;
            }
            // $('#big_banner').attr('src', `./img/banner${now}.jpg`);
            $('#big_banner').css({
                backgroundImage: `url(./img/banner${now}.jpg)`
            });
            $('.btn li').eq(now - 1).addClass('active');
            $('.btn li').eq(now - 1).siblings().removeClass('active')
        }

        function prev() {
            now--;
            if (now <= 0) {
                now = 8;
            }
            $('#big_banner').css({
                backgroundImage: `url(./img/banner${now}.jpg)`
            });
            $('.btn li').eq(now - 1).addClass('active');
            $('.btn li').eq(now - 1).siblings().removeClass('active')
        }

        //点击上一张或下一张切换
        $('.banner_box .next').click(function () {
            next();
        })
        $('.banner_box .prev').click(function () {
            prev();
        })

        //高亮跟随
        $('.btn li').hover(function () {
            $(this).toggleClass('active');
            let now = $(this).text()
            $('#big_banner').css({
                backgroundImage: `url(./img/banner${now}.jpg)`
            })
        })

    })()

    //----------商品数据渲染----------------
    init();

    function init() {
        let html = '';
        let str1 = '';
        let str2 = '';
        let str3 = '';
        $.ajax({
            type: 'get',
            url: './api/00-maotai.php',
            // data:{
            //     min:1,
            //     max:10
            // },
            success: function (str) {
                var arr1 = JSON.parse(str);

                maotai();

                function maotai() {
                    var arr2 = arr1.slice(2, 10);
                    // console.log(arr2);
                    str1 = arr1[0].src;
                    str2 = arr1[1].src;
                    $('#fugu').attr('src', `./img/2.${str1}`);
                    $('#yiyi').attr('src', `./img/2.${str2}`);
                    html = arr2.map(function (item, key) {
                        return ` <a href="">
                       <i>${item.tag}</i>
                       <img src="./img/2.${item.src}" alt="">
                       <p>${item.name}</p>
                       <span>${item.price}元</span>
                      </a>`
                    }).join('');
                    $('#maotai_list').html(html);
                }

                laojiu()

                function laojiu() {
                    var arr2 = arr1.slice(12, 20);
                    // console.log(arr2);
                    var str1 = arr1[10].src;
                    var str2 = arr1[11].src;
                    $('#baishan').attr('src', `./img/${str1}`);
                    $('#yidai').attr('src', `./img/${str2}`);
                    html = arr2.map(function (item, key) {
                        return ` <a href="">
                       <i>${item.tag}</i>
                       <img src="./img/${item.src}" alt="">
                       <p>${item.name}</p>
                       <span>${item.price}元</span>
                      </a>`
                    }).join('');
                    $('#laojiu_list').html(html);
                }

                baijiu();

                function baijiu() {
                    var arr2 = arr1.slice(22, 30);
                    // console.log(arr2);
                    var str1 = arr1[20].src;
                    // console.log(str1);
                    var str2 = arr1[21].src;
                    $('#baijiu1').attr('src', `./img/${str1}`);
                    $('#yuanpin').attr('src', `./img/${str2}`);
                    html = arr2.map(function (item, key) {
                        return ` <a href="">
                       <i>${item.tag}</i>
                       <img src="./img/${item.src}" alt="">
                       <p>${item.name}</p>
                       <span>${item.price}元</span>
                      </a>`
                    }).join('');
                    $('#baijiu_list').html(html);
                }

                putaojiu();

                function putaojiu() {
                    var arr2 = arr1.slice(32, 40);
                    // console.log(arr2);
                    var str1 = arr1[30].src;
                    var str2 = arr1[31].src;
                    $('#putaojiu1').attr('src', `./img/${str1}`);
                    $('#putaojiu2').attr('src', `./img/${str2}`);
                    html = arr2.map(function (item, key) {
                        return ` <a href="">
                       <i>${item.tag}</i>
                       <img src="./img/${item.src}" alt="">
                       <p>${item.name}</p>
                       <span>${item.price}元</span>
                      </a>`
                    }).join('');
                    $('#putaojiu_list').html(html);
                }
            }
        })
    }

    //----------屏幕滚动出现头部搜索------------
    showHead();

    function showHead() {
        window.onscroll = function () {
            if (window.scrollY >= 500) {
                $('#head').css('display', 'block');
            } else {
                $('#head').css('display', 'none');
            }
        }
    }

    //----------屏幕滚动出现头部搜索------------
    goTop();

    function goTop() {
        var timer;
        $('#goTop').on('click', function () {
            var y = window.scrollY;
            timer = setInterval(function () {
                if (y <= 0) {
                    clearInterval(timer);
                    window.scrollTo(0, 0);
                } else {
                    y -= 300;
                    window.scrollTo(0, y);
                }
            }, 30)
        })

    }





})