$(function () {
    //页面模块化
    $('#right_nav').load('../html/index_right_nav.html');
    $('#list_top').load('../html/index_top.html');
    $('#list_bottom').load('../html/index_bottom.html');
    $('#list_main').load('../html/list_main.html', function () {

        //右边导航栏出现特效
        function show() {
            $('#inner a').hover(function () {
                // $(this).children('.tips').fadeIn(200);
                $(this).children('.tips').css({
                    display: 'block',
                })
                $(this).children('.tips').animate({
                    opacity: '1',
                    right: '32px'
                }, 100)
            }, function () {
                $(this).children('.tips').css({
                    right: '83px',
                    display: 'none',
                    opacity: '0',
                })
            })
        }
        show();

        //----------回到顶部------------
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
        //----------屏幕滚动出现头部导航------------
        showHead();

        function showHead() {
            window.onscroll = function () {
                if (window.scrollY >= 500) {
                    $('#fixnav_box').css('display', 'block');
                } else {
                    $('#fixnav_box').css('display', 'none');
                }
            }
        }

        //----------页面初始化------------
        let iPage = 1; //获取第一页内容
        let num = 40; //每页40条内容
        let paixu = ''; //默认没有排序
        function init() {
            $.ajax({
                type: "get",
                url: '../api/list.php',
                data: {
                    page: iPage,
                    number: num,
                    paixu: paixu
                },
                success: function (str) {
                    // resolved(str)
                    // console.log(str)
                    var arr = JSON.parse(str);
                    var html = arr.map(function (item, key) {
                        return `<li class="proitem" data-id="${item.gid}">
                        <a href="###">
                        <img src="../img/${item.src}" alt="">
                        <span>${item.title}<em>${item.tips}</em></span>
                        <p class="pretype">
                            <em>惠</em><span class="youhui">${item.youhui}</span>
                        </p>
                        <div class="price">
                            <em>￥</em>
                            <span>${item.price}</span>
                            <i>加入购物车</i>
                        </div>
                        <p class="assnum">评价：<em>${item.dis}</em>条</p>
                        </a>
                        </li>`
                    }).join("");
                    //判断是否有优惠
                    $("#goods_list").html(html);
                    $('.youhui').each(function (index, ele) {
                        if ($(this).text() == '') {
                            $(this).parent().text('');
                        }
                    })

                }
            })
        }
        init();

        //2.根据总条数和每页显示条数，计算总页数，生成页码；
        let pagesNum = 3;
        var sp = '';
        for (let i = 0; i < pagesNum; i++) {
            sp += `<span class="page_num">${i+1}</span>`;
        }
        $('.prev').after(sp);
        $('.page span').eq(0).addClass('active'); //第一页高亮

        //3.点击页码，能够按需加载新一页数据过来渲染；事件委托实现事件绑定
        $('.page').on('click', 'span', function () {
            iPage = $(this).text();
            init();
            $(this).addClass('active').siblings().removeClass('active')
        })

        //点击加载上一页 、下一页
        $('.prev').on('click', function () {
            iPage--;
            if (iPage <= 0) {
                index == 0;
            }
            $('.page span').eq(iPage - 1).addClass('active').siblings().removeClass('active');
            init();
        })

        $('.next').on('click', function () {
            iPage++;
            if (iPage >= 2) {
                iPage == 2;
            }
            $('.page span').eq(iPage - 1).addClass('active').siblings().removeClass('active');
            init();
        })
        //商品选择排序
        $('#sort').on('click', 'li', function () {
            //    console.log($(this).text())
            $(this).addClass('select').siblings().removeClass('select');
            if ($(this).text() == '综合') {
                paixu = 'zan';
                init();
            }
            if ($(this).text() == '销量') {
                paixu = "xl";
                init();
            }
            if ($(this).text() == '价格') {
                paixu = "price";
                init();
            }
            if ($(this).text() == '评价数') {
                paixu = "dis";
                init();
            }
            if ($(this).text() == '上新时间') {
                paixu = "time";
                init();
            }
        })

        //点击商品获取id传到详情页面渲染
        $('#goods_list').on('click','li',function(){
            var id = $(this).attr('data-id');
            // console.log(id);
            // window.location.assign(`http://localhost:8888/malin%20item/maijiu/src/html/goods.html?id=${id}`)
             window.open(`http://localhost:8888/malin%20item/maijiu/src/html/goods.html?id=${id}`)
        })





    })




})