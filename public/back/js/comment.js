/**
 * Created by 赵世伟 on 2018/4/6.
 */

// 禁用小环环
NProgress.configure({ showSpinner: false });
//注册了全局事件，所有的ajax只要开始就会开启进度条
$(document).ajaxStart(function(){
  NProgress.start();
})

//所有的ajax只要结束，延迟500毫秒，结束进度条

  $(document).ajaxStop(function(){
    setInterval(function(){
    NProgress.done();
    },500)
  })


//左边导航点击切换边框
$('.as_nav>ul> li >a ').click(function(){
  $(this).addClass('active').parent().siblings().children('a').removeClass('active');
  $('.child a').removeClass('active');
})

//展开二级导航
$('.as_nav ul .nav-a').click(function(){
  if($(this).next().css('display')=='none') {
    $(this).next().stop().slideDown(500)
  }else {
    $(this).next().stop().slideUp(500)
    $('.child a').removeClass('active');
  }

})

//二级导航加边框
$('.as_nav ul .child a').click(function(){
  $(this).addClass('active').siblings().removeClass('active')
  $('.as_nav>ul>li>a').removeClass('active');
})

//左边导航隐藏
$('.t-ment').click(function(){
  $('.aside').addClass('thide');
  $('.main').addClass('thide');
  $('.title').addClass('thide');
  $('.title').addClass('phide');
})

//退出显示模态框
$('.t-info').click(function(){
  $('#modal').modal('show')

})

//退出跳转
$('.dele').click(function(){
  $.ajax({
    tepe:'GET',
    url:'/employee/employeeLogout',
    success:function(info) {
      if(info.success) {
        location.href="login.html"
      }
    }
  })
})

