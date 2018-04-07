/**
 * Created by 赵世伟 on 2018/4/7.
 */
$(function(){
  //获取数据渲染表格

  //当前页码
  var currentpage=1;
  var pagesize=5;

  render();
  //定义渲染的方法
 function render() {
   $.ajax({
     url:'/user/queryUser',
     type:'get',
     dataType:'json',
     data:{page:currentpage,pageSize:pagesize},
     success:function(info) {
       //console.log(info);
       var attrhtml = template('main-tb', info);
       $('.main-tbodt').html(attrhtml);

       //分页设置
       $('#page-ul').bootstrapPaginator({
         //指定版本
         bootstrapMajorVersion: 3,

         //当前页码
         currentPage: info.page,

         //总页数
         totalPages: Math.ceil(info.total / info.size),

         // 当页面被点击时触发
         onPageClicked: function (a, b, c, page) {
           currentpage = page,
             render()
         },
         itemTexts: function (type, page, current) {
           switch (type) {
             case "first":
               return "首页";
             case "prev":
               return "上一页";
             case "next":
               return "下一页";
             case "last":
               return "末页";
             case "page":
               return page;
           }


         }
       })
     }
   })
 }

  //点击禁用显示改变状态 显示模态框
  //思路：1当点击 显示模态框
  // 2 获取当前id  和 判断当前按钮 颜色 启用 1   禁用 0
  // 点击确定 发送ajax
  $('.main-tbodt').on("click","button",function(){
    //显示模态框
    $('#modal').modal('show');

    //获取当前id
    var id=$(this).parent().data("id");

    //判断当前按钮 颜色 启用 1   禁用 0
     var isid=$(this).hasClass('btn-success') ? "1":"0";
    //console.log(isid);

    //可以使用  off解除事件
    $('.dele').off('click').on("click",function(){
      $.ajax({
        url:'/user/updateUser',
        type:'post',
        dataType:'json',
        data:{id:id,isDelete:isid},
        success:function(info) {
          //console.log(info);
          //关闭模态框
          $('#modal').modal('hide');
          //重新渲染
          render();
        }
      })
    })
  })


})//入口函数