$(function(){
  $window = $(window);
  (function(){
    var $comment = $('#comments ol.comment-list li');
    var $respond = $('#respond .comment-form-comment');
    var arrImg = [ '<img src="http://file.xuanmomo.com/bg-370x200.jpg">' , '<img src="http://file.xuanmomo.com/bg-2.jpg">' , '<img src="http://file.xuanmomo.com/bg-3.jpg">' ];
    var random = 0;
    // 删除head里的style
    $('head style[media="screen"],head style[media="print"]').remove();
    $('.comment-author .says' , $comment).remove();
    $('article .article-img').each(function(){
      random = Math.floor( Math.random() * arrImg.length );
      if( $(this).children('img').length == 0 ){
        $(this).append(arrImg[random]);
      }
    });
    $('.content img').each(function(){
      $(this).removeAttr('width');
      $(this).removeAttr('height');
    });
  })();
  // 搜索框动画
  var bMark = true;
  var $header = $('header');
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
  // 显示导航菜单
  (function(){
    var $nav = $('nav');
    var $menu = $('ul.menu > li');
    // 手机导航判断有ul子元素禁止a跳转
    menu();
    $window.resize(function(){
      menu();
    });
    function menu(){
      var bMark = true;
      if( $(this).width() < 981 ) {
        $('a.icon-menu-list2').click(function(e){
          e.stopPropagation();
          if( bMark ){
            $nav.css({
              'opacity' : '1',
              'transform' : 'translateX(0)'
            });
          }else{
            $nav.css({
              'opacity' : '0',
              'transform' : 'translateX(100%)'
            });
          }
          bMark = !bMark;
        });
        $('body').click(function(){
          $nav.css({
            'opacity' : '0',
            'transform' : 'translateX(100%)'
          });
          bMark = !bMark;
        });
        $menu.each(function(){
          if( $(this).children('ul').length >= 1 ){
            $(this).children('li > a').attr('href','javascript:;')
          }
        });
        $menu.click(function(e){
          e.stopPropagation();
          $(this).children('ul').slideToggle().parent().siblings().children('ul').slideUp();
        });
      }
    }
  })();
  // 返回顶部动画
  var $backTop = $('div.icon-backtop');
  $window.on('scroll' , function(){
    var $this = $(this);
    var $scroll = $(this).scrollTop();
    if( $scroll > 100 ){
      $header.addClass('on');
      $('ul.sub-menu' , $header).addClass('bg282828');
      $backTop.css('right','30px');
    }else if( $scroll < 100 ){
      $header.removeClass('on');
      $('ul.sub-menu' , $header).removeClass('bg282828');
      $backTop.css('right','-50px');
    }
  });
  $backTop.click(function(){
    $('body,html').animate({scrollTop : 0},800);
  });
  // 放大图片预览
  (function(){
    var $content = $('.content');
    var $img;
    var i = 0;
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
    $('.cover-hide').click(function(){
      $('.cover').hide();
      $('.cover-img').children().remove();
    });
  })();
});
