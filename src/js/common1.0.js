/**
 * 边写常用的函数：库
 * 作者：倩倩
 * 日期：
 * github：
 * 上线项目：
 */

//生成四位数随机验证码 ：4位随机数 0-9之间的数字，取4个拼接
function randomCode() {
    var html = ''; //存拼接的验证码
    for (var i = 0; i < 4; i++) {
        html += parseInt(Math.random() * 10); //0-9
    }
    return html;
}

//四位数随机验证码：带字母(大小写)和数字组合
function randomNum() {
    var html = '0987654321zxcvbnmlkjhgfdsaqwertyuiopZXCVBNMLKJHGFDSAQWERTYUIOP';
    var code = ''; //存拼接字符串
    for (var i = 0; i < 4; i++) {
        var ran = parseInt(Math.random() * html.length);
        code += html[ran];
    }
    return code;
}

//获取和设置行内样式的方法
//假设：css(box,width) 获取宽度； css(box,width,'500px') 设置宽度
// function css() {
//     //判断实参的个数：如果传过来两个参数，证明想获取行内样式，如果传过来三个参数，证明想设置行内样式
//     if (arguments.length == 2) {
//         //获取 box.style.width
//         return arguments[0].style[arguments[1]];
//     } else if (arguments.length == 3) {
//         //设置 box.style.height = '400px';
//         arguments[0].style[arguments[1]] = arguments[2];
//     }
// }

//封装一个函数：能够获取元素的样式(行内和非行内)，还能设置元素的样式（行内）
function css() {
    var ele = arguments[0];
    var attr = arguments[1];
    if (arguments.length == 2) {
        //获取样式
        if (getComputedStyle(ele, false)) {
            //证明在主流浏览器下：IE9+ 和 主流的浏览器
            return getComputedStyle(ele, false)[attr];
        } else {
            //低版本IE:IE678
            return ele.currentStyle(attr);
        }
    } else if (arguments.length == 3) {
        //设置样式
        // box.style.display = 'block';
        var val = arguments[2];
        ele.style[attr] = val;
    }

}

//通过id获取元素
function getid(id) {
    return document.getElementById(id);
}

//封装一个函数实现获取某个范围内的随机数  min-max 100 - 999
function ranNum(min, max) {
    //Math.random() 0-1 不包含1
    // return Math.random()*max + min;
    return parseInt(Math.random() * (max - min + 1)) + min; //Math.random()为0的时候，最小的时候，等于min
}

function tab(btns, divs, cln) {
    //参数一：btns代表标题；参数二：divs代表内容块；参数三：cln代表高亮的样式
    for (var i = 0; i < btns.length; i++) { //循环在前，点击在后，里面的i早就已经循环结束，变成4.所以不能通过i拿到点击li的对应下标了，才需要绑定索引记录下标值
        //绑定索引：
        btns[i].index = i;
        btns[i].onmouseover = function () {
            // console.log(666);
            //上面：鼠标经过哪个就让哪个li高亮
            //this：当前的那个
            // console.log(this.innerHTML);
            //排他
            for (var j = 0; j < btns.length; j++) {
                btns[j].className = '';
                divs[j].style.display = 'none';
            }
            this.className = cln;
            //下面：盒子要跟着当前的那个li显示
            // console.log(i);
            console.log(this.index);
            divs[this.index].style.display = 'block';
        }
    }
}

//封装方法实现字符串转成对象：字符串的格式是key0=0&key1=1&key2=2
function strToObj(str) {
    var json = {}; //准备用来存对象的
    var data = ''; //存参数：key0=0&key1=1&key2=2
    if (str.indexOf('?') >= 0) {
        //含有问号？，证明是一个完整的url，先截掉？前面的部分
        data = str.slice(str.indexOf('?') + 1);
    } else {
        data = str;
    }
    //字符串转成对象：key0=0&key1=1&key2=2
    var arr1 = data.split('&'); ///["key0=0", "key1=1", "key2=2"]
    arr1.forEach(function (item) {
        var arr2 = item.split('='); //['key0','0']
        json[arr2[0]] = arr2[1];
    });
    // console.log(json);
    return json;

}

function objToStr(obj) { //传进来一个对象，拼接成指定的格式 key0=0&key1=1&key2=2
    var html = ''; //存拼接好的字符串
    for (var key in obj) {
        html += key + '=' + obj[key] + '&'; //key0=0&key1=1&key2=2
    }
    return html.slice(0, -1);
}

function toDb(num) {
    //补零
    if (num < 10) {
        return '0' + num;
    } else {
        return '' + num;
    }
}

function getTime() {
    //获取时间返回即可
    // var obj = {};//创建一个空对象，准备用来存储相关的时间信息
    var time = new Date(); //获取时间戳
    var year = time.getFullYear(); //年
    var mon = time.getMonth() + 1; //月 0-11
    var date = time.getDate(); //日
    var hour = time.getHours(); //时
    var min = time.getMinutes(); //分
    var sec = time.getSeconds(); //秒
    var week = time.getDay(); //星期几 0-6

    //判断星期几
    var w = '天一二三四五六';
    w = '星期' + w.charAt(week);
    // switch (week) {
    //     case 0:
    //         w = '天';
    //         break;
    //     case 1:
    //         w = '一';
    //         break;
    //     case 2:
    //         w = '二';
    //         break;
    //     case 3:
    //         w = '三';
    //         break;
    //     case 4:
    //         w = '四';
    //         break;
    //     case 5:
    //         w = '五';
    //         break;
    //     case 6:
    //         w = '六';
    //         break;
    // }
    // w = '星期' + w;

    return {
        years: year,
        mons: toDb(mon),
        dates: toDb(date),
        hours: toDb(hour),
        mins: toDb(min),
        secs: toDb(sec),
        weeks: w
    };
}

function secChang(num) { //接收一个秒数，转成：xx天xx时xx分xx秒
    var sec = num % 60; //秒数
    var min = parseInt(num / 60) % 60; //分
    var hour = parseInt(num / 60 / 60) % 24; //小时
    var day = parseInt(num / 60 / 60 / 24); //天数
    return {
        days: day,
        hours: hour,
        mins: min,
        secs: sec
    }
}

//兼容处理
function firstChild(ele) {
    if (ele.firstElementChild) {
        //证明在高级浏览器下面：谷歌、火狐、欧朋、苹果、IE9+
        return ele.firstElementChild;
    } else {
        return ele.firstChild;
    }
}

//敏感词过滤：
function filterStr(str) { //留言板记得要过滤内容再提交
    //过滤敏感词
    var arr = ['反清复明', '操', 'fuck', '小学生', '垃圾'];
    arr.forEach(function (item) {
        var reg = new RegExp(item, 'ig');
        str = str.replace(reg, '***');
    });
    return str;
}

/*
 	表单验证的方法： 调用里面的子功能  (json对象里面有很多子功能)
 	var checkReg = {
 		tel : function() {}
 	}
 	
 	调用方法：
 	checkReg.tel();
 	
*/

var checkReg = {
    trim: function (str) { //去掉前后空格
        var reg = /^\s+|\s+$/g;
        return str.replace(reg, '');
    },
    tel: function (str) { //号码
        var reg = /^1[3-9]\d{9}$/;
        return reg.test(str);
    },
    email: function (str) { //邮箱正则:a_a2-+.s @ a_a+2-.s  .s_a2
        var reg = /^\w+([\-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; //网上推荐
        return reg.test(str);
    },
    idcard: function (str) { //身份证
        var reg = /^(\d{17}|\d{14})[\dX]$/;
        return reg.test(str);
    },
    psweasy: function (str) { //6-18位首字母开头
        var reg = /^[a-zA-Z]\w{5,17}$/;
        return reg.test(str);
    },
    pwwagain: function (str1, str2) { //确认密码
        return str1 === str2; //全等 恒等
    },
    urladr: function (str) { //路径：网址规则
        var reg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
        return reg.test(str);
    },
    name: function (str) { //账号字母开头,6-20位
        var reg = /^[a-zA-Z][\w\-]{5,19}$/;
        return reg.test(str);
    },
    chinese: function (str) { //中文
        var reg = /^[\u2E80-\u9FFF]+$/;
        return reg.test(str);
    },
    birthday: function (str) { //生日
        var reg = /^((((19|20)\d{2})-(0?[13-9]|1[012])-(0?[1-9]|[12]\d|30))|(((19|20)\d{2})-(0?[13578]|1[02])-31)|(((19|20)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))-0?2-29))$/;
        return reg.test(str);
    }
}

function cloneDeep(obj) { //深度拷贝
    var str = JSON.stringify(obj);
    var newobj = JSON.parse(str);
    return newobj;
}

/*
	运动框架封装：startMove()过渡    jq animate()
	最终版：多对象，多属性，链式运动框架(运动队列)
	参数一：对象名
	参数二：属性，目标值  键名：属性名，键值：目标值    {'width':200,'heigth':400}  实现：宽度和高度一起改变，宽度变成200，高度变成400
	参数三：回调函数(可选参数)
 */

function startMove(obj, json, fnend) {

    clearInterval(obj.timer); //防止定时器叠加
    obj.timer = setInterval(function () {

        var istrue = true;

        //1.获取属性名，获取键名：属性名->初始值
        for (var key in json) { //key:键名   json[key] :键值
            //			console.log(key); //width heigth opacity
            var cur = 0; //存初始值

            if (key == 'opacity') { //初始值
                cur = css(obj, key) * 100; //透明度
            } else {
                cur = parseInt(css(obj, key)); // 300px  300  width heigth borderwidth px为单位的

            }

            //2.根据初始值和目标值，进行判断确定speed方向，变形：缓冲运动
            //距离越大，速度越大,下面的公式具备方向
            var speed = (json[key] - cur) / 6; //出现小数
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed); //不要小数部分，没有这句话或晃动

            //保证上一个属性全部都达到目标值了
            if (cur != json[key]) { //width 200 heigth 400
                istrue = false; //如果没有达到目标值，开关false
            } else {
                istrue = true; //true true
            }

            //3、运动
            if (key == 'opacity') {
                obj.style.opacity = (cur + speed) / 100; //0-1
                obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')'; //0-100
            } else {
                obj.style[key] = cur + speed + 'px'; //针对普通属性 left  top height 
            }

        }

        //4.回调函数:准备一个开关,确保以上json所有的属性都已经达到目标值,才能调用这个回调函数
        if (istrue) { //如果为true,证明以上属性都达到目标值了
            clearInterval(obj.timer);
            if (fnend) { //可选参数的由来
                fnend();
            }
        }

    }, 30); //obj.timer 每个对象都有自己定时器

}


//轮播图插件
function banner(id) {
    var box = document.getElementById(id);
    var lis = box.querySelectorAll(".imglist li");
    var light = box.querySelector(".light");
    var iw = lis[0].offsetWidth;
    var timer = null;
    var now = 0;
    var prevbtn = box.querySelector(".prev");
    var nextbtn = box.querySelector(".next");
    var index


    // console.log(prevbtn,nextbtn)
    //先让所有的图片位于盒子的左侧
    for (var i = 1; i < lis.length; i++) {
        lis[i].style.left = iw + "px";
    }

    //定时轮播 定时器改变盒子left定位置
    timer = setInterval(next, 2000);

    function next() {
        startMove(lis[now], {
            "left": -iw
        })
        now++
        if (now >= lis.length) {
            now = 0;
        }
        lis[now].style.left = iw + "px";
        startMove(lis[now], {
            "left": 0
        })
        lightMove();
    }
    //上一张
    function prev() {
        startMove(lis[now], {
            "left": iw
        });
        now--;
        if (now < 0) {
            now = lis.length - 1;
        }
        lis[now].style.left = -iw + "px";
        startMove(lis[now], {
            "left": 0
        });
        lightMove();
    }


    // 鼠标划入停止
    box.onmouseover = () => {
        clearInterval(timer);
        prevbtn.style.display = "block";
        nextbtn.style.display = "block";

        //点击切换
        nextbtn.onclick = () => {
            next();
        }
        prevbtn.onclick = () => {
            prev();
        }
    }
    box.onmouseleave = () => {
        timer = setInterval(next, 2000);
        prevbtn.style.display = "none";
        nextbtn.style.display = "none";
    }



    var html = "";
    // 焦点切换
    for (var i = 0; i < lis.length; i++) {
        html += "<span></span>";
    }
    light.innerHTML = html;

    //添加索引
    var spans = box.querySelectorAll(".light span");
    for (var i = 0; i < lis.length; i++) {
        spans[i].index = i;
    }
    // light.innerHTML = html;
    light.children[0].className = "active";

    function lightMove() {
        //排他
        for (var i = 0; i < light.children.length; i++) {
            light.children[i].className = "";
        }
        light.children[now].className = "active";
    }


    //点击小按钮切换图片
    light.onclick = (ev) => {

        if (ev.target.tagName == "SPAN") {
            var index = ev.target.index;
            if (index > now) {
                //新图从右边切入
                //旧图挪到左侧
                startMove(lis[now], {
                    'left': -iw
                });
                //新图快速放在右侧，挪到可视区
                lis[index].style.left = iw + 'px';
                startMove(lis[index], {
                    'left': 0
                });
            }
            if (index < now) {
                //从左边切入
                startMove(lis[now], {
                    'left': iw
                });
                lis[index].style.left = -iw + 'px';
                startMove(lis[index], {
                    'left': 0
                });
            }
            //新图变旧图
            now = index;
            lightMove();
        }
    }
}


//ajax方法封装
function ajax(opt) {
    function extend(obj1, obj2) {
        for (var key in obj2) {
            obj1[key] = obj2[key];
        }
    }

    //默认参数
    var defaults = {
        async: true
    }

    //后面使用默认参数
    extend(defaults, opt);

    var xhr = new XMLHttpRequest();
    if (defaults.type.toLowerCase() == 'get') {
        //get请求
        if (defaults.data) {
            defaults.url += '?' + defaults.data;
        }
        xhr.open(defaults.type, defaults.url, defaults.async);
        xhr.send(null);
    } else {
        //post请求
        xhr.open(defaults.type, defaults.url, defaults.async);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send(defaults.data);
    }

    //接收数据返回
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                if (defaults.success) { //如果有数据就返回
                    defaults.success(xhr.responseText);
                }
            } else {
                alert('错误http状态码是：' + xhr.status);
            }
        }
    }
}


//cookie 操作
function setCookie(key, val, iDay) {
    //key：键名；val：键值；iDay：失效时间
    var now = new Date();
    now.setDate(now.getDate() + iDay);
    document.cookie = key + '=' + val + ';expires=' + now.toUTCString() + ';path=/'; //设置一个站点内的文件可以共享此cookie
}

function getCookie(key) { //获取cookie值
    var cookies = document.cookie; //name=malin; pwd=123456
    var arr = cookies.split('; '); //['name=malin','pwd=123456']
    for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split('='); //['name','malin'
        if (key == arr2[0]) {
            return arr2[1];
        }
    };
}

function removeCookie(key) { //删除：设置失效时间为过去的时间，立即失效
    setCookie(key, '', -1);
}