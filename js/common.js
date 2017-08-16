$(function(){
    $window = $(window);
    var $header = $('header');

    (function(){
        var $comment = $('#comments ol.comment-list li');
        var $respond = $('#respond .comment-form-comment');
        var arrImg = ['<img src="https://www.xuanmo.xin/bg1.jpg">', '<img src="https://www.xuanmo.xin/bg2.jpg">', '<img src="https://www.xuanmo.xin/bg3.jpg">', '<img src="https://www.xuanmo.xin/bg4.jpg">', '<img src="https://www.xuanmo.xin/bg5.jpg">'];
        var random = 0;
        // 删除head里的style
        $('head style[media="screen"], head style[media="print"]').remove();
        $('.comment-author .says' , $comment).remove();
        // 为没有缩略图的img添加别的图片
        $('article .article-img').each(function(){
            random = Math.floor( Math.random() * arrImg.length );
            var $thisImg = $(this).children('img');
            if( $thisImg.length == 0 ){
                $(this).append(arrImg[random]);
            }else if( Number( $thisImg.attr('height') ) < 150 ){
                $thisImg.css({
                    'height' : $thisImg.attr('height'),
                    'vertical-align' : 'middle'
                });
            }
        });
        $('.content img').each(function(){
            $(this).removeAttr('width').removeAttr('height');
        });
    })();

    (function(){
        // 搜索框动画
        var bMark = true;
        $('.search-txt').blur(function(e){
            e.stopPropagation();
            $(this).val('');
            $header.css('top','-120px');
            bMark = !bMark;
        });
        $('.contact .icon-search').click(function(){
            bMark ? $header.css('top','0') : $header.css('top','-120px');
            bMark = !bMark;
        });
        $('form .icon-close1').click(function(){
            $header.css('top','-120px');
            bMark = !bMark;
        });
    })();

    // 滚动显示
    (function(){
        scrollAnimate($('.main article , .right article'));
        function scrollAnimate(obj) {
            var y;
            $window.on('scroll', function () {
                y = $(this).scrollTop();
                obj.each(function () {
                    if (y > $(this).offset().top - $window.height() / 2) $(this).addClass('on');
                });
            });
        }
    })();

    // 手机端显示导航菜单
    (function(){
        var $nav = $('nav'),
            $menuList = $('ul.menu > li'),
            y = 0,
            _y = 0;
       
        $('.icon-menu-list2').bind('touchstart', function () {
            $nav.css('left', 0);
        });
        $nav.bind('touchstart', function (e) {
                y = e.originalEvent.touches[0].pageX;
            })
            .bind('touchmove', function (e) {
                _y = e.originalEvent.touches[0].pageX;
                if (y - _y > 20) $(this).css('left', '-100%');
            });
        $menuList.bind('touchstart', function () {
            $(this).children('.sub-menu').stop().slideToggle()
                .parent().siblings()
                .children('.sub-menu').slideUp();
        });
        $menuList.each(function () {
            $(this).children('a').attr('data-href', function () {
                return $(this).attr('href');
            });
        });
        removeLink();
        $window.bind('resize', removeLink);
        function removeLink() {
            if (navigator.appVersion.match('iPhone') || navigator.appVersion.match('Android')) {
                $menuList.each(function () {
                    if ($(this).children('.sub-menu').length)
                        $(this).children('a').attr('href', 'javascript:;');
                });
            } else {
                $menuList.children('a').attr('href', function() {
                    return $(this).attr('data-href');
                })
            }
        }
    })();

    (function(){
        // 返回顶部动画
        var $scroll;
        var $backTop = $('div.icon-backtop');
        $window.on('scroll' , function(){
            var $this = $(this);
            $scroll = $(this).scrollTop();
            if( $scroll > 300 ){
                $header.addClass('on');
                $('ul.sub-menu' , $header).addClass('bg282828');
                $backTop.css('right','30px');
            }else if( $scroll < 300 ){
                $header.removeClass('on');
                $('ul.sub-menu' , $header).removeClass('bg282828');
                $backTop.css('right','-50px');
            }
        });
        $backTop.click(function(){
            $('html,body').animate({scrollTop : 0},800);
        });
    })();

    // 放大图片预览
    (function(){
        var $content = $('.content');
        var $img , i = 0;
        $('.content img').each(function(n){
            $(this).click(function(){
                i = n;
                $('.content img').clone().appendTo($('.cover-img'));
                $img = $('.cover-img img');
                $('.cover').show();
                $img.eq(i).show();
            });
        });
        $('.cover .icon-menu-left').click(function(){
            i--;
            if( i < 0 ) {
                i = 0;
                tipsShow();
                return;
            }
            $img.eq(i).show().siblings().hide();
        });
        $('.cover .icon-menu-right').click(function(){
            i++;
            if( i > $img.length - 1 ){
                i = $img.length - 1;
                tipsShow();
                return;
            }
            $img.eq(i).show().siblings().hide();
        });
        function tipsShow(){
            $('.cover p').css({
                'opacity' : '1',
                'transform' : 'translateY(0px)'
            });
            setTimeout(function(){
                $('.cover p').css({
                    'opacity' : '0',
                    'transform' : 'translateY(-30px)'
                });
            },1500);
        }
        $('.cover-hide , .cover .icon-close1').click(function(){
            $('.cover').hide();
            $('.cover-img').children().remove();
        });
    })();

    // 文章页微信显示与关闭
    $('.article-about-author .share-btn a:nth-of-type(3)').click(function(){
        // 微信盒子显示
        $(this).children('span').show()
        // 关闭按钮隐藏span
        .children('i').click(function(e){
            e.stopPropagation();
            $(this).parent('span').hide();
        });
    });

    // 输入表情
    $('p.smiley')
        .insertBefore($('p.comment-form-comment'))
        .children().click(function() {
            var str = $(this).attr('title');
            $('#comment').val(function() {
                return $(this).val() + ' ' + str + ' ';
            });
        });

    // 删除评论框
    $('#respond form p.comment-form-comment label').remove();
});
