/**
 * Created by 赵世伟 on 2018/4/7.
 */


$(function(){
  //点击显示退出模态框
  $("#t-info").click(function(){
    $('#modal').modal('show');
  })

  var currpage=1;
  var pageSize=5;
  render();
  //定义渲染方法
  function render(){
    $.ajax({
      url:'/category/querySecondCategoryPaging',
      type:'get',
      dataType:'json',
      data:{page:currpage,pageSize:pageSize},
      success:function(info){
        //console.log(info);
        $('.main-tbody').html(template('ment-tb',info));


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

//点击显示添加模态框 获取一级菜单的类容
  $("#addBtn").click(function(){
    $('#modal2').modal('show');

   //获取添加分类
    $.ajax({
      url: '/category/queryTopCategoryPaging',
      type: 'get',
      data: {page: currpage, pageSize: pageSize},
      dataType: 'json',
      success: function (info) {
        //console.log(info);

        $('.dropdown-menu').html(template('modm',info));

      }
    })
  })

  //// 3. 通过注册委托事件, 给 a 添加点击事件
  $('.dropdown-menu').on('click','a',function() {
    //获取文本 id
    var txt=$(this).text();
    var id=$(this).data('id');
    //设置
    $('.dropspan').text(txt);
    $('.cateid').val(id);

    $('#form').data('bootstrapValidator').updateStatus("categoryId","VALID");
  })

  // 4. 配置图片上传
  $('#fileupload').fileupload({
    // 指定数据类型为 json
    dataType: "json",
    // done, 当图片上传完成, 响应回来时调用
    done: function( e, data ) {
      //console.log( data )
      // 获取上传成功的图片地址
      var picAddr = data.result.picAddr;
      //设置图片地址
      $('#boximg img').attr("src",picAddr);

      $('[name="brandLogo"]').val(picAddr);

      // 重置校验状态
      $('#form').data('bootstrapValidator').updateStatus("brandLogo","VALID");
    }
  });

  //配置表单效验
  $('#form').bootstrapValidator({
    // 将默认的排除项, 重置掉 (默认会对 :hidden, :disabled等进行排除)
    excluded:[],

    //配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //校验的字端
    fields: {
      // 品牌名称
      brandName: {
        //校验规则
        validators: {
          notEmpty: {
            message: "请输入二级分类名称"
          }
        }
      },
      // 一级分类的id
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      // 图片的地址
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请上传图片"
          }
        }
      }
    }
  })

  // 6. 注册校验成功事件, 通过 ajax 进行添加
  $('#form').on('success.form.bv',function(e){
    //阻止默认提价
    e.preventDefault();

    //ajax提交
    $.ajax({
      url:'/category/addSecondCategory',
      type:'post',
      data:$('#form').serialize(),
      success:function(info) {
        //console.log(info);

        //关闭模态框
        $('#modal2').modal('hide');

        // 重置表单里面的内容和校验状态
        $('#form').data("bootstrapValidator")
          .resetForm( true );

        //重新渲染第一页
        currpage=1;
        render();

        //重置一级分类
        $('.dropspan').text("请选择一级分类")

        //重置图片
        $('.form-group img').attr('src',"images/none.png");
      }
    })
  })
})//入口函数