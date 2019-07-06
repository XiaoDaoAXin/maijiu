$(function () {





    let arr = [];
    let picNum = '';

    //生成图片验证码
    creatCode();

    function creatCode() {
        /**生成一个随机数**/
        function randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }
        /**生成一个随机色**/
        function randomColor(min, max) {
            var r = randomNum(min, max);
            var g = randomNum(min, max);
            var b = randomNum(min, max);
            return "rgb(" + r + "," + g + "," + b + ")";
        }
        drawPic();
        document.getElementById("changeImg").onclick = function (e) {
            e.preventDefault();
            picNum = '';
            drawPic();
        }

        /**绘制验证码图片**/
        function drawPic() {
            var canvas = document.getElementById("canvas");
            var width = canvas.width;
            var height = canvas.height;
            var ctx = canvas.getContext('2d');
            ctx.textBaseline = 'bottom';

            /**绘制背景色**/
            ctx.fillStyle = randomColor(180, 240); //颜色若太深可能导致看不清
            ctx.fillRect(0, 0, width, height);
            /**绘制文字**/
            var str = 'ABCEFGHJKLMNPQRSTWXY123456789';
            for (var i = 0; i < 4; i++) {
                var txt = str[randomNum(0, str.length)];
                ctx.fillStyle = randomColor(50, 160); //随机生成字体颜色
                ctx.font = randomNum(20, 40) + 'px heiti'; //随机生成字体大小
                var x = 10 + i * 25;
                var y = randomNum(35, 40);
                var deg = randomNum(-45, 45);
                //修改坐标原点和旋转角度
                ctx.translate(x, y);
                ctx.rotate(deg * Math.PI / 180);
                ctx.fillText(txt, 0, 0);
                //恢复坐标原点和旋转角度
                ctx.rotate(-deg * Math.PI / 180);
                ctx.translate(-x, -y);
                picNum += txt;
            }
            /**绘制干扰线**/
            // for(var i=0; i<8; i++){
            //     ctx.strokeStyle = randomColor(40,180);
            //     ctx.beginPath();
            //     ctx.moveTo( randomNum(0,width), randomNum(0,height) );
            //     ctx.lineTo( randomNum(0,width), randomNum(0,height) );
            //     ctx.stroke();
            // }
            /**绘制干扰点**/
            for (var i = 0; i < 100; i++) {
                ctx.fillStyle = randomColor(0, 255);
                ctx.beginPath();
                ctx.arc(randomNum(0, width), randomNum(0, height), 1, 0, 2 * Math.PI);
                ctx.fill();
            }
        }
    }
    // console.log(picNum);




    // 注册正则验证
    //手机号验证
    $('#phoneNum').blur(function () {

        var phoneNum = $('#phoneNum').val().trim();
        if (phoneNum) {
            if (checkReg.tel(phoneNum)) {

                //验证用户名是否存在
                var ishas = new Promise(function (resolved) {
                    $.ajax({
                        type: 'get',
                        url: '../api/user.php',
                        data: {
                            name: phoneNum,
                            sort: 'ifhas',
                        },
                        success: function (str) {
                            resolved(str);
                        }

                    })
                })
                ishas.then(function (data) {
                    console.log(data);
                    if (data == 'yes') {
                        $('#ph span').text('手机号正确')
                        $('#ph span').css('color', "#58bc58");
                        arr[0] = 1;
                    } else {
                        $('#ph span').text('该手机号以注册过')
                        $('#ph span').css('color', "red");
                    }
                })
            } else {
                $('#ph span').text('手机号格式不正确')
                $('#ph span').css('color', "red");
                arr[0] = 0;
            }
        } else {
            $('#ph span').text('手机号不能为空')
            $('#ph span').css('color', "red");
        }
    })

    //验证图片验证码是否一致

    $('#yz_input').blur(function () {
        var str = '';
        str = $('#yz_input').val();
        picNum = picNum.toLowerCase();
        if (str) {
            if (str == picNum) {
                arr[1] = 1;
            } else {
                alert('验证码不正确');
                arr[1] = 0;
            }
        } else {
            alert("验证码不能为空");
        }
    })

    // 生成4位数字验证码
    var str = '';
    $("#regCode_btn").click(function () {
        str = "";

        function randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }
        for (var i = 0; i < 4; i++) {
            str += randomNum(0, 9);
        }
        $('#jyInput').val(str);
    })

    $('#jyInput').blur(function () {
        var str = $('#jyInput').val();
        if (str) {
            arr[2] = 1;
            $('.jiaoyan span').text('校验码正确');
            $('.jiaoyan span').css('color', "#58bc58");
        } else {
            $('.jiaoyan span').text('校验码不能空');
            $('.jiaoyan span').css('color', "red");
            arr[2] = 0;
        }
    })

    //验证密码
    let psdNb = ''
    $('#psd_input').blur(function () {
        psdNb = $('#psd_input').val();
        if (psdNb) {
            if (checkReg.psweasy(psdNb)) {
                $('.set_psd span').text('密码格式正确');
                $('.set_psd span').css('color', "#58bc58");
                arr[3] = 1;
            } else {
                $('.set_psd span').text('密码格式不正确');
                $('.set_psd span').css('color', "red");
                arr[3] = 0;
            }
        } else {
            $('.set_psd span').text('密码不能为空')
            $('.set_psd span').css('color', "red");
        }
    })

    //确认密码
    $('#check_input').blur(function () {
        var check_psd = $(this).val();
        var psdNb = $('#psd_input').val();
        if (check_psd) {
            if (check_psd == psdNb) {
                $('.check_psd span').text('密码一致')
                $('.check_psd span').css('color', "#58bc58");
                arr[4] = 1;
            } else {
                $('.check_psd span').text('两次密码不一致');
                $('.check_psd span').css('color', "red");
                arr[4] = 0;
            }
        } else {
            $('.check_psd span').text('确认密码不能为空')
            $('.check_psd span').css('color', "red");
        }
    })


    //确认信息是否全填写完整 然后提交注册
    $('#reg_btn').click(function () {
        var res = arr.every(function (item) {
            return item == 1;
        })


        if (res && arr.length == 5) {

            //储存cookie;
            var nameval = $('#phoneNum').val().trim();
            setCookie("user", nameval, 1);

            //储存用户信息
            var psdval = $('#psd_input').val();
            console.log(nameval, psdval)
            var userReg = new Promise(function (resolved) {
                $.ajax({
                    type: 'post',
                    url: '../api/user.php',
                    data: {
                        name: nameval,
                        psd: psdval,
                        sort: 'reg',
                    },
                    success: function (str) {
                        resolved(str);
                    }
                })
            })
            userReg.then(function (data) {
                console.log(data);
                if (data == 'yes') {
                    alert('注册成功');
                    window.open('http://localhost:8888/malin%20item/maijiu/src/zhuye.html');
                } else {
                    alert('注册失败');
                }
            })
        } else {
            alert('请完善信息');
        }
    })









})