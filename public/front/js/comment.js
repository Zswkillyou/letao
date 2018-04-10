/**
 * Created by 赵世伟 on 2018/4/9.
 */
//区域滚动
mui('.mui-scroll-wrapper').scroll({
  scrollY: true, //是否竖向滚动
  scrollX: false, //是否横向滚动
  startX: 0, //初始化时滚动至x
  startY: 0, //初始化时滚动至y
  indicators: false, //是否显示滚动条
  deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
  bounce: true //是否启用回弹
});


//定义获取地址栏的方法
  function getsearch(key) {
    //获取专门用于解析地址栏参数
    var name= location.search;
    //解码中文
    var txt=decodeURI(name);
    //去掉？
    txt=txt.slice(1);

    //分割 成数组
    var arr=txt.split("&");

    //声明一个对象
    var obj={};

    //遍历数组   name= aa   element 当前项  index 下标
    arr.forEach(function(element,index){
      var key=element.split("=")[0];
      var value=element.split("=")[1];
      obj[key]=value;
    })
      return obj[key];
  }



