/**
 * Created by 赵世伟 on 2018/4/7.
 */
$(function(){
  //统计图
// 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById('main'));

// 指定图表的配置项和数据
  var option = {
    title: {
      text: '2017年注册人数'
    },
    tooltip: {},
    legend: {
      data:['人数']
    },
    xAxis: {
      data: ["一月","二月","三月","四月","五月","六月"]
    },
    yAxis: {},
    series: [{
      name: '人数',
      type: 'bar',
      data: [500, 1500, 2500, 1300, 700,1700 ]
    }]
  };

// 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);


  //饼状图
  var echars2= echarts.init(document.getElementById('bing'));
   option2 = {
    title : {
      text: '热门品牌销售',
      subtext: '2017年',
      x:'center'
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['耐克','阿迪','李宁','新百伦','阿迪王']
    },
    series : [
      {
        name: '访问来源',
        type: 'pie',
        radius : '55%',
        center: ['50%', '60%'],
        data:[
          {value:335, name:'耐克'},
          {value:310, name:'阿迪'},
          {value:234, name:'李宁'},
          {value:135, name:'新百伦'},
          {value:1548, name:'阿迪王'}
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }

  // 使用刚指定的配置项和数据显示图表。
  echars2.setOption(option2);
})