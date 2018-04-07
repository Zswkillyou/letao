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




//展开二级导航
$('.as_nav ul .nav-a').click(function(){
  $(this).next().stop().slideToggle();

})

//左边导航隐藏
$('.t-ment').click(function(){

    $('.aside').toggleClass('thide');
    $('.main').toggleClass('thide');
    $('.title').toggleClass('thide');
    $('.title').toggleClass('phide');


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


//设置的登录拦截
//console.log(location.href);
//console.log(location.href.indexOf('login.html'));

//判断是否登录   //如果是登录页不用判断
if(location.href.indexOf('login.html')== -1) {
  $.ajax({
    url:'/employee/checkRootLogin',
    type:'get',
    success:function(info) {
      //console.log(info);
      //如果是登录页不用判断
      if(info.success) {
        //登录了什么都不做
      }
      if(info.error==400) {
        //没有登录跳转登录页
        location.href="login.html";
      }

    }
  })
}
