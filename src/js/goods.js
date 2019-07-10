$(function () {
    //页面模块化
    $('#right_nav').load('../html/index_right_nav.html');
    $('#goods_top').load('../html/index_top.html');
    $('#goods_bottom').load('../html/index_bottom.html');
    $('#goods_main').load('../html/goods_main.html', function () {
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

        //----------获取列表页传过来的id-----------
        function getId() {
            var url = location.search;
            var index = url.indexOf('=');
            id = url.slice(index + 1)
            return id;
        }

        //-------------根据列表页id渲染页面-------------
        init();
        let kucun = '';

        function init() {
            getId();
            $.ajax({
                type: 'get',
                url: '../api/goods.php',
                data: {
                    gid: id
                },
                success: function (str) {
                    var arr = JSON.parse(str);
                    $('.goods_name').text(arr[0].title); //商品名称渲染
                    $('#price').text(arr[0].price); //价钱渲染
                    $('.all_discuss').text(arr[0].dis) //评价渲染  
                    for (let i = 0; i < $('#btns li').length; i++) { //详情图渲染
                        var str1 = arr[0].detail
                        var pic_arr = str1.split('&');
                        var src = pic_arr[i];
                        $('#small-picture').attr('src', `../img/${pic_arr[0]}`);
                        $('.goods_picture').attr('src', `../img/${pic_arr[0]}`);
                        $('#big-picture').attr('src', `../img/${pic_arr[0]}`);
                        $('#btns li').eq(i).children().attr('src', `../img/${src}`);
                    }

                    kucun = arr[0].kucun * 1;

                    // kucun = arr[0].kucun;
                    // console.log(kucun);
                    //---------改变数量存在cookies-----------
                    changeNum();

                    function changeNum() {
                        var goods_num = 1;
                        $('#goods_num').blur(function () {
                            goods_num = $('#goods_num').val().trim();
                            if (goods_num >= kucun) {
                                goods_num = kucun;
                            }
                            if (goods_num <= 1) {
                                goods_num = 1;
                            }
                            $('#goods_num').val(goods_num);
                        })

                        $('.ys_box').on('click', 'p', function () {
                            goods_num = $('#goods_num').val().trim();
                            if ($(this).attr('id') == 'add') {
                                goods_num++;
                                if (goods_num >= kucun) {
                                    goods_num = kucun;
                                }
                                $('#goods_num').val(goods_num);
                            } else if ($(this).attr('id') == 'sub') {
                                goods_num--;
                                if (goods_num <= 1) {
                                    goods_num = 1;
                                }
                                $('#goods_num').val(goods_num);
                            }
                        })
                    }


                    //--------------加入购物车--------------
                    addCar();
                    var cookieId_arr = [];
                    var index;


                    function addCar() {
                        var num = $('#goods_num').val('1');
                        var cookieId = '';
                        $('.addcar').click(function () {
                            getId();
                            cookieId = getCookie('id');
                            if (cookieId) {
                                cookieId_arr = cookieId.split('&');
                                index = cookieId_arr.indexOf(id);
                                if (index >= 0) {

                                } else {
                                    cookieId += `&${id}`;
                                    setCookie('id', cookieId);
                                    num = $('#goods_num').val().trim();
                                    num = getCookie('number') + `&${num}`;
                                    setCookie('number', num);
                                }
                            } else {
                                setCookie('id', id);
                                num = $('#goods_num').val().trim();
                                setCookie('number', num); //存入cookie
                            }
                            check_car_number();
                        })
                    }
                }
            })


        }

        //---------判断渲染购物车内商品数量--------------
        check_car_number();

        function check_car_number() {
            if (getCookie('number')) {
                var goods_number = getCookie('number').split('&').length
                $('#goods_number').text(goods_number);
            }

        }





        //-----------放大镜效果------------------
        showBig();

        function showBig() {
            //点击切换小图 大图
            $("#btns li").hover(function () {
                let src = $(this).children('img').attr('src');
                $('#small-picture').attr('src', src);
                $('#big-picture').attr('src', src);
            })

            //鼠标移入移出
            $('#smallBox').hover(function () {
                $('.mask').css('display', 'block');
                $('#big-picture').css('display', 'block');
            }, function () {
                $('.mask').css('display', 'none');
                $('#big-picture').css('display', 'none');
            })

            //鼠标移入滑动
            $('#smallBox').mousemove(function (ev) {
                var x = ev.pageX - $('#small').offset().left - $('.mask').width() * 3 / 2;
                var y = (ev.pageY - $('#small').offset().top - $('.mask').height() / 2);


                // 限制遮罩范围
                if (x < 0) {
                    x = 0;
                } else if (x > $('#small-picture').width() - $('.mask').width()) {
                    x = $('#small-picture').width() - $('.mask').width();
                }
                if (y < 0) {
                    y = 0;
                } else if (y > $('#small-picture').height() - $('.mask').height()) {
                    y = $('#small-picture').height() - $('.mask').height();
                }

                $('.mask').css({
                    left: x + 'px',
                    top: y + 'px'
                })

                // 放大镜比例系数
                var scalX = ($('#big-picture').width() - $('#big').width()) / ($('#small-picture').width() -
                    $('.mask').width());
                var scalY = ($('#big-picture').height() - $('#big').height()) / ($('#small-picture')
                    .height() - $('.mask').height());

                $('#big-picture').css({
                    left: -scalX * x + 'px',
                    top: -scalY * y + 'px'
                })

            })
        }




        //--------------评论点击显示大图-------------
        $('#pic_tag img').click(function () {
            var src = $(this).attr('src');
            $(this).css('border', '1px solid red').siblings().css('border', '1px solid #CCCCCC');
            $('.big_pic').css('display', 'block');
            $('#big_pic').attr('src', src);
        })


        //判断是否已登录
        updata();

        function updata() {
            if (getCookie('name')) {
                $('#begin').text('欢迎！');
                $('#user').text(getCookie('name'));
                $('#reg').text('退出');
            }
        }



        //点击跳转到注册登录页面 或 退出登录
        skip();

        function skip() {
            $('#user').click(function () {
                if ($('#user').text() == '登录') {
                    window.open('login.html')
                }
            })
            $('#reg1').click(function () {
                if ($('#reg1').text() =='注册') {
                    window.open('reg.html')
                }
                if ($('#reg').text() == '退出') {
                    removeCookie('name');
                    removeCookie('psd');
                    window.open('zhuye.html');
                }

            })
        }





    })



})