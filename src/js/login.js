$(function () {
    //页面模块化
    $('#header').load('../html/header.html');
    $('#login_main').load('../html/login_main.html');
    $('#footer').load('../html/footer.html', function () {

        //改变头部信息
        if ($('title').text() == 'login') {
            $('#welcome').text('您好，欢迎光临购酒网! ');
            $('#welcome').css('margin-right', '25px');
            $('#qdl').remove();
        }

        //输入框获取焦点改变样式
        $('.login_form .input').focus(function () {
            $(this).parent().addClass('focus');
        })
        $('.login_form .input').blur(function () {
            $(this).parent().removeClass('focus');
        })



        //登录验证
        $('.login_btn').click(function () {
            var userval = $('#user_input').val().trim();
            var psdval = $('#psw_input').val().trim();
            var login = new Promise(function (resolved) {
                $.ajax({
                    type: 'post',
                    url: '../api/user.php',
                    data: {
                        name: userval,
                        psd: psdval,
                        sort: 'login',
                    },
                    success: function (str) {
                        resolved(str)
                    }
                })
            })
            login.then(function (data) {
                // console.log(data);
                if (data == 'yes') {
                    //自动登录
                    if ($('#autologin').prop('checked')) {
                        //勾选的：把数据存在cookie并保留7天
                        setCookie('name', userval, 7);
                        setCookie('psd', psdval, 7);

                    }
                    alert('登录成功');
                    window.open('../zhuye.html');
                } else {
                    alert('登录失败 请检查输入用户信息');
                }
            })
        })

        //免登陆
        $('#user_input').val(getCookie('name'));
        $('#psw_input').val(getCookie('psd'));
        if (getCookie('name') && getCookie('psd')) {
            $('#autologin').prop('checked', true);
        }

        //点击注册跳转到注册页面
        $('#reg').click(function () {
            window.open('Reg.html');
        })



    });
})