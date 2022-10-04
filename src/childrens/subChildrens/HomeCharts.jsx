import React, { memo, useEffect, useState } from 'react'
import { Layout, Menu, Switch } from 'antd';
import * as echarts from 'echarts';
function Home({ list, index }) {
    let id = 'homeMain' + index
    useEffect(() => {
        var myChart = echarts.init(document.getElementById(id));
        let option = {
            title: {
              left: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: list.map(item=>item.name)
            },
            series: [
              {
                name:'数据占比  ',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: list,
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
          myChart.setOption(option)
    }, [])
    return (
        <div id={id} style={{ width: '100%', height: "300px" }}>
        </div>
    )
}
export default memo(Home)
