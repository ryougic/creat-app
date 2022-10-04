import React, { useEffect, useState } from 'react'
import * as echarts from 'echarts';
import axios from '../services';
import HomeCharts from './subChildrens/HomeCharts'
import '../css/home.css'
export default function Home() {
  const [lists,setLists] = useState({})
  useEffect(()=>{
    axios.get('/api1/api/users/statistics/getData').then(res=>{
      setLists(res.data.data)
    })
  },[])
  console.log()
  return (
    <div id='inHome' >
      {
        Object.values(lists).map((item,index)=><HomeCharts key={index} list={item} index={index} />)
      }
    </div>
  )
}
