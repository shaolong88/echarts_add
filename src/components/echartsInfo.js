import React from 'react'
import echarts from 'echarts/lib/echarts' //必须
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'

import 'echarts/lib/chart/graph'
import { connect } from 'react-redux';


class EchartsInfo extends React.Component {
  constructor(props) {
    super(props)
    this.initPie = this.initPie.bind(this);
    this.state = {
      echartsdata: [
        { category: 0, name: "八年级数学知识结构体系" },
        {  name: "三角形" },
        {  name: "全等三角形"},
        {  name: "轴对称" },
        { name: "整式的乘法与因式分解"},
        { name: "分式"},
        { name: "二次根式"},
        { name: "勾股定理"},
        { name: "平行四边形"},
        { name: "一次函数"},
        { name: "数据的分析"},
      ],
      echartslinks: [
        {source: "八年级数学知识结构体系", target: "三角形"},
        {source: "八年级数学知识结构体系",target: "全等三角形"},
        {source: "八年级数学知识结构体系",target: "轴对称"},
        {source: "八年级数学知识结构体系",target: "整式的乘法与因式分解"},
        {source: "八年级数学知识结构体系",target: "分式"},
        {source: "八年级数学知识结构体系",target: "二次根式"},
        {source: "八年级数学知识结构体系",target: "勾股定理"},
        {source: "八年级数学知识结构体系",target: "平行四边形"},
        {source: "八年级数学知识结构体系",target: "一次函数"},
        {source: "八年级数学知识结构体系",target: "数据的分析"},
      ],
    }
  }
  initPie() {
    //定义数据格式
    var TestNodeOption = {
      animationDurationUpdate: 1500,
      animationEasingUpdate: 'quinticInOut',
      series: [
        {
          type: 'graph',
          zoom: 2,
          layout: 'force',
          hoverAnimation: true,
          name: 'graph',
          symbolSize: 30,
          roam: true,
          categories: [{
            name: '根节点',
            itemStyle: {
              normal: {
                color: "#009800", //颜色
              }
            }
          },
          {
            name: '一级节点',
            itemStyle: {
              normal: {
                color: "#f2b368",
              }
            }
          }
          ],
          // 节点标签
          label: {
            normal: {
              show: true,
              position: 'top',//设置label显示的位置
              // formatter: '{c}',//设置label读取的值为value
              textStyle: {
                fontSize: '12rem'
              },
            }
          },
          //放大程度
          force: {
            repulsion: 200
          },
          edgeSymbolSize: [4, 50],
          // 数据
          data: this.state.echartsdata,
          // 建立关系
          links: this.state.echartslinks,
          animationDelay: function (idx) {
            return idx * 1000;
          },
          animationDuration: function (idx) {
            // 越往后的数据延迟越大
            return idx * 1000;
          },
          animationDurationUpdate: function (idx) {
            // 越往后的数据延迟越大
            return idx * 1000;
          }, animationDelayUpdate: function (idx) {
            // 越往后的数据延迟越大
            return idx * 1000;
          },
        }
      ],
    };
    var myChart = echarts.init(this.ID) //初始化echarts
    //通过父组件传过来的值
    var ifAdd = this.props.eventsOption.ifAdd
    var selectName = this.props.eventsOption.selectName
    var TimeFn = null
    /*     var dataFromDB = this.state.echartsdata
        var linksFromDB = this.state.echartslinks */
    //记录前一次选中的节点，未单击节点时先前选中节点信息为空
    var preSelectName = null;
    var preSelectCategory = null;
    //设置options，即加载数据，第一次加载的数据为上面定义的TestNodeOption
    if (myChart.getOption() === undefined) {
      myChart.setOption(TestNodeOption)
    }
    //之后的加载均在已有的数据的基础之上
    else myChart.setOption(myChart.getOption())
    //方便initpie中定义的函数使用this控制状态机
    var that = this;

    if (ifAdd) {
      addNode();
    }
    //选中节点的添加事件
    function addNode() {
      let options = myChart.getOption();//获取已生成图形的Option param
      let nodesOption = options.series[0].data;//获得所有节点的数组
      let linksOption = options.series[0].links;//获得所有连接的数组
      //添加新节点的数据
      let newNode = {
        name: that.props.eventsOption.newname,
        draggable: true,
        category: that.props.eventsOption.newcategory
      }
      nodesOption.push(newNode);
      //添加新节点的链接信息
      let newLink = {
        source: selectName,
        target: newNode.name
      }
      linksOption.push(newLink);
      //对添加的节点信息进行加载
      myChart.setOption(options);
    }

    //************节点加载单击事件**************
    myChart.on('click', transIndex.bind(this))
    //单击事件，选中节点，并把节点信息通过reducer传出去
    function transIndex(param) {
      clearTimeout(TimeFn)
      TimeFn = setTimeout(() => {
        const { setEchartState } = this.props;
        let options = myChart.getOption();
        let nodesOption = options.series[0].data;
        //选中节点改变category-------
        for (let m in nodesOption) {
          if (preSelectName != null && preSelectName === nodesOption[m].name) {
            nodesOption[m].category = preSelectCategory;
          }
          if (nodesOption[m].name === param.data.name) {
            nodesOption[m].category = 1;
          }
        }
        if (preSelectName !== param.data.name) {
          preSelectName = param.data.name;
          preSelectCategory = param.data.category;
        }
        //--------
        //将节点信息丢给reducer
        setEchartState({
          type: 'EchartsIndexName',
          payload: {
            index: param.dataIndex,
            name: param.data.name,
            knowid: param.data.knowid,
            category: param.data.category,
          }
        })
        //echarts加载修改后的数据
        myChart.setOption(options);
      }, 300)
    }
    //**************************

  }
  componentDidMount() {
    this.initPie()
  }

  componentDidUpdate() {
    this.initPie()
  }
  shouldComponentUpdate(nextProps, nextState) {
    //根据子页面已有的props信息和再次传过来的props信息进行判断，若相同
    //再判断子页面上一次的state与本次修改后的state是否相同，若也相同，则无需进行componentDidUpdate操作
    //只要有一个不同，则需要加载componentDidUpdate，即更新操作
    return (nextProps.eventsOption !== this.props.eventsOption || nextState.echartsdata.length !== this.state.echartsdata.length);
  }
  render() {
    const { width = "100%", height = '700px' } = this.props
    return <div ref={ID => this.ID = ID} style={{ width, height }}></div>
  }
}
function mapStateToProps(state) {
  return {
  };
}


function mapDispatchToProps(dispatch) {
  return {
    setEchartState: (state) => dispatch(state)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EchartsInfo);