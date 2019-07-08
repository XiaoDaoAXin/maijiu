$(function () {
    //右边导航栏出现特效
    show();

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
})