/**
 * Created by 赵世伟 on 2018/4/8.
 */
$(function(){
  //定义当前页
  var currpage=1;
  //一页的条数
  var pageSize=5;
  //定义数组 存储 图片对象
  var arr=[];
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
          },
          //提示文本
          tooltipTitles:function(type, page, current){
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
                return "前往第" + page + "页";
            }
          },
          // 使用 bootstrap 样式的提示框组件
          useBootstrapTooltip: true
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

  //二级分类选择获取
$('.dropdown-menu').on("click","a",function(){

  //获取二级分类
  $('.dropspan').text($(this).text());

  //获取id
  $('[name="brandId"]').val($(this).data('id'));
  //重置状态
  $('#form').data('bootstrapValidator').updateStatus("brandId", "VALID")
})


  //图片上传
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      //console.log(data);
      var picObj=data.result;
      var picAddr=picObj.picAddr;
      //得到的新图片对象,应该推到数组的最前面，unshift
      arr.unshift(picObj);
      //新的图片添加到boximg的最qianm
      $('#boximg').prepend(' <img src="'+picAddr+'" width="100">');

      //如果上传图片的个数大于3 ，将最旧的图片删除 ，
      //最后面的删除  数组也要删除最后一项
     if(arr.length>3) {
       arr.pop();
       $('#boximg img:last-of-type').remove();
     }

      //当数组的的长度等3 改变校验状态
      if(arr.length===3) {
        $('#form').data('bootstrapValidator').updateStatus("imgstatus", "VALID")
      }
    }
  });

  //表单校验
  $('#form').bootstrapValidator({
    // 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    //excluded: [':disabled', ':hidden', ':not(:visible)'],

    //取消默认
    excluded:[],

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //指定字段
    fields:{
      //二级分类
      brandId:{
        validators:{
          //非空校验
          notEmpty:{
            message:'二级分类不能为空'
          }
        }
      },
      //商品名称
      proName:{
        validators:{
          //非空校验
          notEmpty:{
            message:'请输入商品名称'
          }
        }
      },
      //商品描述
      proDesc:{
        validators:{
          //非空校验
          notEmpty:{
            message:'请输入商品描述'
          }
        }
      },
      //商品库存 要运用正则
      //要求必须是非零开头的数组，非零开头 1-9
      num:{
        validators:{
          //非空校验
          notEmpty:{
            message:'请输入商品库存'
          }
        },
        //正则校验
        regexp: {
         regexp:/^[1-9]\d*$/,
          message:'商品库存格式，必须是非零开头的数字'
        }
      },
      //尺寸 规则必须是  32-40
      size:{
        validators:{
          //非空校验
          notEmpty:{
            message:'请输入商品尺寸'
          }
        },
        //正则校验
        regexp: {
          regexp:/^\d{2}-\d{2}$/,
          message:'尺寸 规则必须是  32-40'
        }
      },
      //商品原价
      oldPrice:{
        validators:{
          //非空校验
          notEmpty:{
            message:'请输入商品原价'
          }
        }
      },
      //商品价格
      price:{
        validators:{
          //非空校验
          notEmpty:{
            message:'请输入商品价格'
          }
        }
      },
      //验证图片
      imgstatus:{
        validators:{
          //非空校验
          notEmpty:{
            message:'请上传三张图片'
          }
        }
      },
    }


    //
  })

  //表单校验成功时，会触发success.form.bv事件，此时会提交表单，这时候，通常我们需要禁止表单的自动提交，使用ajax进行表单的提交。

  // 需要在参数的基础上拼接上这些参数
  // &picName1=xx&picAddr1=xx
  // &picName2=xx&picAddr2=xx
  // &picName3=xx&picAddr3=xx

  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    var params=$('#form').serialize();

    params+="&picName1="+arr[0].picName+"&picAddr1="+arr[0].picAddr;
    params+="&picName2="+arr[1].picName+"&picAddr2="+arr[1].picAddr;
    params+="&picName3="+arr[2].picName+"&picAddr3="+arr[2].picAddr;

    //console.log(params);
    //使用ajax提交逻辑
    $.ajax({
      url:'/product/addProduct',
      type:'post',
      dataType:'json',
      data:params,
      success:function(info) {
        //console.log(info);
        //关闭模态框
        $('#modal2').modal('hide');
        //重新渲染
        currpage=1;
        render();

        //二级分类修改
        $('.dropspan').text("请选择二级分类");
        //图片情况
        $('#boximg img').remove();
        //数组情况
        arr=[];
      }
    })
  });
})//入口函数