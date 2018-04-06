/**
 * Created by 赵世伟 on 2018/4/6.
 */
//注册了全局事件，所有的ajax只要开始就会开启进度条
$(document).ajaxStart(function(){
  NProgress.start();
})

//所有的ajax只要结束，延迟500毫秒，结束进度条
setInterval(function(){
  $(document).ajaxStop(function(){
    NProgress.done();
  })
},500)