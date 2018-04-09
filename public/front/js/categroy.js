/**
 * Created by 赵世伟 on 2018/4/9.
 */

$(function(){
  //渲染 左边一级分类
  $.ajax({
    url:'/category/queryTopCategory',
    tyep:'get',
    dataType:'json',
    success:function(info) {
      //console.log(info);
      $('.min-left ul').html(template('cate-left',info ))
      render(info.rows[0].id);
    }
  })

  //点击一级分类渲染二级分类 右
  $('.min-left ul').on("click","a",function(){
    var id=$(this).data('id');
    console.log(id);
    $(this).addClass("current").parent().siblings().find('a').removeClass('current');
    render(id);
  })
  function render(id) {
    $.ajax({
      url:'/category/querySecondCategory',
      tyep:'get',
      dataType:'json',
      data:{id:id},
      success:function(info) {
        console.log(info);
        $('.min-right ul').html(template('cate-right',info ))
      }
    })
  }
})//入口函数