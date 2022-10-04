import { Card, Button, Checkbox, Form, Input } from 'antd';
import React, { useState,useEffect } from 'react';
import '../css/login.css'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import axios from '../services'
const onFinish = (values) => {
  console.log('Received values of form: ', values);
};
export default function PwdLogin() {
  const [imgUrl,setImgUrl] = useState([])
  useEffect(() => {
    axios.get('/api1/captcha/api/math').then(res => {
      setImgUrl(res.data.img)
      localStorage.setItem('key',res.data.key)
    })
  }, [])
  return (
    <Form
    name="normal_login"
    className="login-form"
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
  >
    <Form.Item
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your Username!',
        },
      ]}
    >
      <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="手机号" />
    </Form.Item>
    
    <Form.Item
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your Password!',
        },
      ]}
    >
      <div style={{display:'flex'}}>
      <Input
        prefix={<LockOutlined className="site-form-item-icon" />}
        type="password"
        placeholder="图形验证码"
      />
      <div style={{marginLeft:'5px'}}>
        <img src={imgUrl} alt="" />
      </div>
      </div>
    </Form.Item>
    <Form.Item
      name="verification"
      rules={[
        {
          required: true,
          message: 'Please input your verification!',
        },
      ]}
    >
      <div style={{display:'flex'}}>
      <Input
        prefix={<LockOutlined className="site-form-item-icon" />}
        type="password"
        placeholder="验证码"
      />
      <div>
      <Button type="primary" htmlType="submit" className="login-form-button" style={{'marginLeft':'5px'}} >
        发送验证码
      </Button>
      </div>
      </div>
    </Form.Item>

    <Form.Item>
      <Button type="primary" htmlType="submit" className="login-form-button" style={{width:'100%'}}>
        登录
      </Button>
    </Form.Item>
    
  </Form>
  )
}
