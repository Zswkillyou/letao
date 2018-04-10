/**
 * Created by 赵世伟 on 2018/4/10.
 */

$(function(){
  render();
  var key=  getsearch("key");
  $('.lt_input').val(key);


  //点击搜索按钮, 实现搜索功能
  $('.h-search').click(function(){
    render();
    //获取input value值
    var val=$('.lt_input').val();
    //获取localStorage 存储
    var arr=localStorage.getItem('search_list') || '[]';
    arr=JSON.parse(arr);
    //判断val  记录有没有
    //不等于负一  有删除
    var index=arr.indexOf(val);
    if(arr.indexOf(val) != -1) {

      arr.splice(index,1);
    }
    //判断长度   删除最后一个
    if(arr.length>=10) {
      arr.pop();
    }
    arr.unshift(val);

    //同步状态保存
    localStorage.setItem('search_list',JSON.stringify(arr));
  })


  // 功能3: 点击排序按钮, 进行排序
  // 1. 如果没有 current 类, 自己加上 current 类, 其他去掉 current类
  // 2. 如果有 current 类, 直接切换 i 里面的上下箭头

  //获取所有的 a
  $('.lt_sort [data-type]').click(function(){
    if($(this).hasClass('current')) {
      $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up')
  }else  {
      $(this).addClass('current').siblings().removeClass('current');
      $('.lt_sort a').find('i').removeClass("fa-angle-down").addClass("fa-angle-down");
    }
    render()
  })

//定义渲染方法
  function render() {
        $('.product ul').html('<div class="do-s"></div>');

    var params={};
    params.page=1;
    params.pageSize=100;
    params.proName=$('.lt_input').val();

    //  // 排序功能分析
    // 1. 如果价格高亮, 需要传 price 参数
    // 2. 如果库存高亮, 需要传 num 参数
    // 值 （1升序，2降序）
    var $current=$('.lt_sort .current');

    if($current.length >0) {
      // 有高亮的元素, 需要排序
      var sortName=$current.data('type');
      var sorvalue=$current.find('i').hasClass('fa-angle-down')?2:1;
      params[sortName]=sorvalue;
    }
    setTimeout(function(){
      $.ajax({
        url:'/product/queryProduct',
        type:'get',
        data:params,
        success:function(info) {
          console.log(info);
          $('.product ul').html(template('productptl',info));
        }
      })
    },500)
  }
})