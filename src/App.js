import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  PieChartOutlined,
  DesktopOutlined,
  TeamOutlined,
  FileOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import {Router, Switch, withRouter} from 'react-router-dom'
import './App.css'
import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import Home from './childrens/Home';
import UserIndex from './childrens/UserIndex';
import FilmIndex from './childrens/FilmIndex';
import CinemaIndex from './childrens/CinemaIndex';
import CollegeIndex from './childrens/CollegeIndex'
import Login from './Login';
import axios from './services';
const { Header, Sider, Content } = Layout;
function getItem(label, key, icon, children,fn) {
  return {
    key,
    icon,
    children,
    label,
    onClick:fn
  };
}


const App = ({location,history,match}) => {
  const [accountInfo,setAccountInfo] = useState({})
  useEffect(()=>{
    axios.get('/api1/api/common/auth/jwtPreCheck').then(res=>{
      if(res.data.errNo===0){
        setLogin(true)
      }
      else{
        setLogin(false)
      }
    })
    axios.get('/api1/api/common/auth/adminInfo').then(res=>{
      if(res.data.errNo===0){
        setAccountInfo(res.data.accountInfo)
      }
    })
  },[])
  const items = [
    getItem('欢迎界面', 'sub1', <UserOutlined />,null,()=>{history.push('/home')}),
    getItem('用户管理', 'sub2', <UserOutlined />,[{label:'用户列表',key:'sub21',onClick:()=>{history.push('/user/index')}}]),
    getItem('电影管理', 'sub3', <UserOutlined />, [
      {label:'电影列表',key:'sub31',onClick:()=>{history.push('/film/index')}}
    ]),
    getItem('影院管理', 'sub4', <UserOutlined />, [{label:'影院分布',key:'sub41',onClick:()=>{history.push('/cinema/index')}}]),
    getItem(' 院线管理', 'sub5', <UserOutlined />,[{label:'院线管理',key:'sub51',onClick:()=>{history.push('/college/index')}}]),
  ];
  const [collapsed, setCollapsed] = useState(false);
  const [login,setLogin] = useState(true)
  return (
      login ? <Layout>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          <span>您好，{accountInfo.username?accountInfo.username+'/'+accountInfo.role:null}</span>
          <a style={{float:'right','marginRight':'30px'}} onClick={()=>{
            localStorage.removeItem('jwt')
            history.go(0)
          }}>注销登录</a>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
        <Switch>
          <Route path='/home' component={Home} />
          <Route path='/user/index' component={UserIndex} />
          <Route path='/film/index' component={FilmIndex} />
          <Route path='/cinema/index' component={CinemaIndex} />
          <Route path='/college/index' component={CollegeIndex} />
          <Redirect to='/home' />
        </Switch>
        </Content>
      </Layout>
    </Layout>:
    <Login />
    
  );
};

export default withRouter(App);