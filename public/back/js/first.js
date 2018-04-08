/**
 * Created by 赵世伟 on 2018/4/7.
 */
$(function(){

  var currpage=1;
  var pageSize=5;

  render();
  //定义渲染方法
  function render() {
     $.ajax({
       url:'/category/queryTopCategoryPaging',
       type:'get',
       data:{page:currpage,pageSize:pageSize},
       dataType:'json',
       success:function(info) {
         console.log(info);
         var html = template('ment-tb', info)
         $('.main-tbody').html(html);

         //设置分页
         $('#page-ul').bootstrapPaginator({
           //设置当前版泵
           bootstrapMajorVersion: 3,
           //设置当前页
           currentPage: info.page,
           //设置总页数
           totalPages: Math.ceil(info.total / info.size),
           //点击事件回调函数
           onPageClicked: function (a, b, c, page) {
             //重新渲染
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

  //点击添加显示模态框
  $('#addBtn').click(function(){
    //显示模态框
    $('#modal2').modal('show');
  })

  //验证表单
  $("#form").bootstrapValidator({

    // 配置图标

    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    // 校验的字段
    fields: {
      categoryName: {
        // 校验规则
        validators: {
          // 非空检验
          notEmpty: {
            // 提示信息
            message: "请输入一级分类名称"
          }
        }
      }
    }
  });

  // 4. 注册表单校验成功事件
  //    表单校验插件, 会在表单提交时, 进行校验
  //    如果通过校验, 默认会进行提交, 需要阻止, 通过 ajax 进行提交

  // (使用form="form", 通过了校验, 也不会提交了, 可以省去 e.preventDefault() )

  $("#form").on("success.form.bv",function(e) {
      e.preventDefault();
    $.ajax({
      type:'post',
      url:'/category/addTopCategory',
      dataType:'json',
      data:$('#form').serialize(),
      success:function(info) {
        console.log(info);
        //关闭模态框
        $('#modal').modal('show');

        //重新渲染页面第一ye
        currpage=1;
        render();

        //重置
        $('#form').data("bootstrapValidator").resetForm( true );

      }
    })
  })


  //点击显示退出模态框
  $('.t-info').click(function(){
    $('#modal').modal('show');
  })
})//入口函数