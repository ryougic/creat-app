import { Button, Form, Input,message   } from 'antd';
import React, { useState,useEffect } from 'react';
import '../css/login.css'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import axios from '../services';
import { withRouter } from 'react-router-dom';
function PwdLogin(props) {
  const onFinish = ({verification,username,password}) => {
    axios.post('/api1/api/common/auth/login',{
      captcha:verification,
      key:localStorage.getItem('key'),
      username,
      password
    }).then(res=>{
      if(res.data.errNo===0){
        localStorage.setItem('jwt',res.data.context.jwt)
        message.error(res.data.errText);
        props.history.go(0)
      }
      else{
        console.log(res)
        message.error(res.data.errText);
      }
    })
  };
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
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
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
        <div style={{ display: 'flex' }}>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="验证码"
          />
          <div  style={{marginLeft:'5px'}}>
            <img src={imgUrl} alt="" />
          </div>
        </div>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%' }}>
          登录
        </Button>
      </Form.Item>

    </Form>
  )
}
export default withRouter(PwdLogin)