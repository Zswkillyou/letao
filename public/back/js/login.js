/**
 * Created by 赵世伟 on 2018/4/6.
 */
$(function(){
  //使用表单校验插件
  $('#form').bootstrapValidator({

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //1. 用户名不能为空
    //2. 用户密码不能为空
    //3. 用户密码长度为6-12位

    //3. 指定校验字段
    fields: {
      //用户名
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min:2,
            max:6,
            message: '用户名长度必须在2到6之间'
          },
          // 专门用于配置回调提示信息的校验规则
          callback: {
            message:'用户名错误'
          }
        }
      },

      //密码
      password: {
        validators: {
          //不能为空
          notEmpty:{
            message:'密码不能为空'
          },
          stringLength: {
            min:6,
            max:12,
            message:'密码长度必须在6到12之间'
          },
          // 专门用于配置回调提示信息的校验规则
          callback: {
            message:'密码错误'
          }
        }
      }
    }
  })

  //当验证完成后 提交表单，阻止form的默认提交， 我们用ajax提交，
  //禁用表单本身的提交
  $('#form').on('success.form.bv',function(e){
    //阻止form的默认提交
    e.preventDefault();
    //提交数据
    $.ajax({
      type: "post",
      url: "/employee/employeeLogin",
      dataType: "json",
      data:$('#form').serialize(),//表单序列化
      success:function(info) {
        console.log(info);

        if(info.success) {
          //alert("登录成功");
          location.href="index.html";
        }
        if(info.error===1000) {
          //alert("用户名不存在");
          //用户错误重置图标 updateStatus(field, status, validatorName)
          //参1 字段名
          //参2 校准状态
          //status的值有：
          //- NOT_VALIDATED：未校验的
          //- VALIDATING：校验中的
          //- INVALID ：校验失败的
          //- VALID：校验成功的
          //校验规则, 可以设置提示文本
          $("#form").data("bootstrapValidator").updateStatus('username','INVALID','callback')
        }
        if(info.error===1001) {
          //alert("密码不存在");
          $("#form").data("bootstrapValidator").updateStatus('password','INVALID','callback')
        }
      }

    })
  })

  //重置表单内容和图标
  $('[type=reset]').on('click',function(){
    $("#form").data("bootstrapValidator").resetForm(true);
  })
})//入口函数
