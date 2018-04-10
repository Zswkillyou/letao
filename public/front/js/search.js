/**
 * Created by 赵世伟 on 2018/4/10.
 */
//var arr =['耐克','李宁','张飞','王超'];
//localStorage.setItem()
$(function() {
  // 进行本地存储操作
  // 约定: search_list 为键名

  // 功能1: 渲染搜索历史记录
  // 1. 读取本地历史记录里面的数组
  // 2. 结合模板引擎渲染

  // 一进入页面, 调用render()
  render();


  //定义读取本地历史记录里面的数组
   function  getHistory() {
     //获取localstorage存储
     var histoty=localStorage.getItem('search_list') || '[]';
     var arr=JSON.parse(histoty);
     return arr;
   }

  //定义根据数组渲染数据
  function  render() {
    var arr=getHistory();
    //arr 是数据要包装
      $('.lt_content').html(template('hisp',{arr:arr}))
  }

  // 功能2: 删除功能, 删除本地历史记录数组里面一项
  // 1. 给所有的删除按钮, 添加委托事件
  // 2. 获取索引
  // 3. 读取本地存储中的数组, 进行删除对应索引的那项
  // 4. 同步到本地存储中
  // 5. 页面也需要重新渲染
  $('.lt_content').on('click','.btn_delete',function(){
    mui.confirm("你确认要删除么?", "温馨提示", ["确认", "取消"], function( e ) {
      //console.log(e);
      if(e.index === 0 ) {
        var index=$(this).data('index');

        var history=localStorage.getItem('search_list');
        var arr=JSON.parse(history);
        //截取数组
        arr.splice(index,1);
        //同步到本地存储中
        localStorage.setItem("search_list",JSON.stringify(arr));
        //重新渲染
        render();
      }
    })

  })


  // 功能3: 清空功能
  // 1. 注册事件(事件委托做)
  // 2. 清掉本地存储中的search_list
  // 3. 页面重新渲染
  $('.lt_content').on('click','.qing',function(){
    mui.confirm("你确认要删除么?", "温馨提示", ["确认", "取消"], function( e ) {
      //console.log(e);
      if(e.index === 0 ) {
        localStorage.removeItem('search_list');
        render();
      }
    })
  })


  // 功能4: 添加功能
  // 1. 点击搜索按钮, 获取输入框的值
  // 2. 获取数组
  // 3. 将输入框的值, 添加到数组中的最前面
  // 4. 持久化到本地存储中, 修改 search_list
  // 5. 重新渲染页面
  $('.h-search').click(function(){

    //获取input的值
    var key=$('.lt_input').val().trim();

    //提示消息框
    if(key === "") {
      mui.toast("请输入关键字");
      return;
    }


    // 数组
  var arr=getHistory();

  // // 1. 不能重复
  // 2. 数组长度不超过 10 个

  // 不等于 -1, 说明在数组中可以找到 key, 说明重复了, 需要删除
  if(arr.indexOf( key ) != -1) {
    //获取所有
    var index=arr.indexOf( key );

    arr.splice(index,1);
  }
    if(arr.length >=10 ){
      arr.pop();
    }
    // 添加
    arr.unshift( key);

    //清空input
    $('.lt_input').val("");
    //持久化
    localStorage.setItem("search_list",JSON.stringify(arr));
    //重新渲染
    render();

    //跳转到搜索列表页, 将搜索关键字传递到searchList.html
    location.href="searchlist.html?key="+key;
  })
})