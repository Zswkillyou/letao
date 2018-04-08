/**
 * Created by 赵世伟 on 2018/4/8.
 */
$(function(){
  //定义当前页
  var currpage=1;
  //一页的条数
  var pageSize=5;

  render();
  //定义渲染方法
  function render() {
    $.ajax({
      url:'/product/queryProductDetailList',
      type:'get',
      dataType:'json',
      data:{page:currpage,pageSize:pageSize},
      success:function(info){
        console.log(info);
        $('.main-tbody').html(template('ment-tb',info))

        //分页
        $('#page-ul').bootstrapPaginator({
          //版本号
          bootstrapMajorVersion:3,

          //当前页
          currentPage:info.page,

          //总页数
          totalPages: Math.ceil(info.total / info.size),

          //点击渲染当前
          onPageClicked: function( a , b , c , page) {
            //当前页
            currpage = page;
            render();
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

  //点击显示添加商品模态框
  $('#addBtn').click(function(){
    $('#modal2').modal('show');
    //二级分类渲染
    $.ajax({
      url:'/category/querySecondCategoryPaging',
      type:'get',
      dataType:'json',
      data:{page:currpage,pageSize:1000},
      success:function(info) {
        console.log(info);
        $('.dropdown-menu').html(template("modm",info));
      }
    })
  })

})//入口函数