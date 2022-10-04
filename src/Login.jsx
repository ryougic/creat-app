import { Card} from 'antd';
import React, { useEffect, useState } from 'react';
import './css/login.css'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import PwdLogin from './childrens/PwdLogin';
import PhoneLogin from './childrens/PhoneLogin';

const tabList = [
    {
        key: 'tab1',
        tab: '密码登录',
    },
    {
        key: 'tab2',
        tab: '短信登录',
    },
];



const Login = () => {
    const [imgUrl,setImgUrl] = useState('')
    const contentList = {
        tab1:<PwdLogin  />,
        tab2:<PhoneLogin />  ,
    };
    
    const [activeTabKey1, setActiveTabKey1] = useState('tab1');

    const onTab1Change = (key) => {
        setActiveTabKey1(key);
        console.log(key)
    };


    return (
        <>
            <div id='login'>
                <div id='loginFunction'>
                    <Card
                        style={{
                            width: '100%',
                        }}
                        tabList={tabList}
                        activeTabKey={activeTabKey1}
                        onTabChange={(key) => {
                            onTab1Change(key);
                        }}
                    >
                        {contentList[activeTabKey1]}
                    </Card>
                    <br />
                    <br />
                </div>
            </div>
        </>
    );
};

export default Login;