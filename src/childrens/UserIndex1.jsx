import { Space, Table, Tag } from 'antd';
import React, { useEffect } from 'react';
import axios from '../services'
const columns = [
  {
    title: '序号',
    dataIndex: 'name',
    key: 'name',
    // render: (text) => <a>{text}</a>,
  },
  {
    title: '用户名',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '手机号',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '邮箱',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '性别',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';

          if (tag === 'loser') {
            color = 'volcano';
          }

          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: '状态',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';

          if (tag === 'loser') {
            color = 'volcano';
          }

          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
function getUserIndexPage(page){
  axios.get('/api1/api/users?page='+page).then(res=>{
    if(res.data.errNo===0){
      console.log(res.data.paginate)
    }
  })
}
const UserIndex = () =>{
  useEffect(()=>{
    getUserIndexPage(1)
  },[])
  return <Table columns={columns} dataSource={data} />;}

export default UserIndex;