$(function () {
    //购物车商品渲染
    draw();

    function draw() {
        var idArr = getCookie('id').split('&');
        var numArr = getCookie('number').split('&');
        //用递归的方式循环调用ajax
        var index = 0;
        var html = '';


        function Loop_ajax(index, array) {
            if (index < array.length) {
                var value = array[index];
                var num = numArr[index];
                $.ajax({
                    type: 'get',
                    url: '../api/car.php',
                    data: {
                        gid: value
                    },
                    success: function (data) {
                        // console.log(array[index] + "," + data);
                        var arr = JSON.parse(data);
                        html = arr.map(function (item, key) {
                            return ` <div class="lis">
                            <span><input class="check_cb" id="Checkbox6707" type="checkbox" checked="" value="6707"></span>
                            <img src="../img/${item.src}" alt="">
                            <a href="">${item.title}</a>
                            <span class="price">￥${item.price}</span>
                            <span class="youhui">-</span>
                            <div class="ys_box">
                                <div class="center clearfix">
                                    <span class="sub">-</span>
                                    <input kucun="${item.kucun}" class="good_num"  type="text" value="${num}">
                                    <span class="add">+</span>
                                </div>
                            </div>
                            <span class="xiaoji">¥<span id='xiaoji'>${item.price*num}</span></span>
                            <div class="control_box">
                                <span class="delete">删除</span>
                                <span class="shoucang">收藏</span>
                            </div>
                        </div>`
                        }).join("");
                        html = $('#goods_info_list').html() + html;
                        $('#goods_info_list').html(html);
                        $('#goods_info_list');
                        if (index < array.length) {
                            Loop_ajax(index + 1, array);

                        }


                        changeNum();
                        //判断哪一行是被勾选的

                        function checkedRows() {
                            var checkedArr = [];
                            $('#goods_info_list .check_cb').each(function (i, item) {
                                if ($(item).prop('checked')) {
                                    //被勾选的复选框把他的下标存起来
                                    checkedArr.unshift(i);
                                }

                                //降序
                                checkedArr.sort(function (a, b) {
                                    return b - a;
                                });
                                // console.log(checkedArr)
                                return checkedArr;
                            })
                        }
                        //总数量和总价格的变化

                        function numAndToal() {
                            var arr1 = checkedRows();
                            var sum = 0;
                            var all_price = 0;
                            // console.log(arr1)
                            arr1.forEach(function (item) {
                                sum += $('#goods_info_list .good_num').eq(item).val() * 1;
                                all_price += $('#goods_info_list #xiaoji').eq(item).text() * 1;
                            })

                            $('#all_num').html(sum + '件');
                            $('#palyMoney').html('￥' + all_price);
                        }
                    }
                })
            }


        }
        Loop_ajax(0, idArr);

    }

    //1.点击数量的加、减、手动修改数量可以修改表里面数量
    //事件委托绑定事件

    //数量的加减
    function changeNum() {
        var number;
        var kucun;
        $('.ys_box').on('click', 'span', function () {
            if ($(this).text() == '+') {
                number = $(this).siblings('input').val();
                number++;
                kucun = $(this).siblings('input').attr('kucun') * 1;
                if ($(this).siblings('input').val() >= kucun) {
                    $(this).siblings('input').val(kucun);
                    //提示库存
                    var text = '库存为' + kucun + '件';
                    show_tip_window(text);
                } else {
                    $(this).siblings('input').val(number);
                }

            }
            if ($(this).text() == '-') {
                number = $(this).siblings('input').val();
                number--;
                if ($(this).siblings('input').val() <= 1) {
                    $(this).siblings('input').val(1)
                } else {
                    $(this).siblings('input').val(number);
                }

            }

            //调用价钱小计
            goodTotal($(this).siblings('.good_num'));

        })

        //失去焦点判断数量
        $('.ys_box input').blur(function () {
            number = $(this).val() * 1;
            kucun = $(this).attr('kucun') * 1;
            if (number > kucun) {
                $(this).val(kucun);
                var text = '库存为' + kucun + '件';
                show_tip_window(text)
            }
            if (number <= 1) {
                $(this).val(1);
            }
            //调用价钱小计
            goodTotal($(this));

        })
    }

    //2.小计=单价*数量
    function goodTotal(now) {
        var price = $(now).parents('.ys_box').siblings('.price').text().slice(1) * 1;
        var number = $(now).val() * 1; //获取数量
        var tal_price = price * number;
        $(now).parents('.ys_box').siblings('.xiaoji').children('#xiaoji').text(tal_price);
    }

    //全选
    $('.check_ll').on('click', function () {
        var now = $(this).prop('checked');
        $('.check_ll').prop('checked', now);
        $('.check_cb').prop('checked', now);
    })

    //点击每一行复选框反过来控制全选按钮 
    $('#goods_info_list').on('click', '.check_cb', function () {
        var checked_num = $('#goods_info_list .check_cb:checked').length;
        var num = $('#goods_info_list .check_cb').length;
        if (num == checked_num) {
            $('.check_ll').prop('checked', true);
        } else {
            $('.check_ll').prop('checked', false);
        }
    })


    $('#goods_info_list').on('click', '.delete', function () {
        let res = confirm('您要删除我吗？');
        if (res) {
            $(this).parents('.lis').remove();
        }
    })

    //3.删除当行商品；
    $('#cart').on('click', '.good_del a', function () {
        //要删除的节点.remove()
        let res = confirm('您要删除我吗？');
        if (res) {
            $(this).parent().parent().remove();
        }
        update();
        numAndToal();
    });

    //删除选中
    $('#del_checked').click(function () {
        let arr = checkedRows(); //被勾选的行对应的下标
        let res = confirm('您要删除我们吗？');
        if (res) {
            arr.forEach(function (item) {
                $('.lis').eq(item).remove();
            });
        }
    })

    //清空购物车
    $('#clear_car').click(function () {
        // removeCookie(key)
        removeCookie('id');
        removeCookie('number');
    })







    //弹出提示窗
    function show_tip_window(text) {
        var top = $('.alert').css('top');
        var y = window.scrollY;
        $('.alert').text(text);
        $('.alert').css({
            'top': (y + top) + 'px',
            'display': 'block'
        })

        $('.alert').animate({
            opacity: '0.4',
        }, 4000)

        setTimeout(function () {
            $('.alert').css({
                'display': 'none',
                'opacity': '0.7'
            })
        }, 5000)

    }








})