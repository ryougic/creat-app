import { Table,Tag,Button } from 'antd';
import qs from 'qs';
import axios from '../services';
import React, { useEffect, useState } from 'react';
function editInfo(a){
  console.log(a)
}
const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    width: '5%',
    align:'center'
  },
  {
    title: '用户名',
    dataIndex: 'username',
    width: '20%',
    align:'center'
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
    width: '10%',
    align:'center'
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: '20%',
    align:'center'
  },
  {
    title: '性别',
    dataIndex: 'gender',
    render:(gender)=> {
      switch(gender){
        case '1':
          return '男'
        case '2':
          return '女'
        case '3':
          return '保密'
      }
    },
    width: '5%',
    align:'center'
  },
  {
    title: '状态',
    dataIndex: 'status',
    render: (status,arr) => {
      let color = (status-0) > 1 ? 'red' : 'green';
      let charater = (status-0) >1?'禁用':'正常'
      return <Tag color={color} key={arr.id}>
      {charater}
    </Tag>
    },
    width: '5%',
    align:'center'
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: '20%',
    align:'center'
  },
  {
    title: '操作',
    dataIndex: '',
    key: 'x',
    render: (a,b) => {
      return (<div style={{display:'flex',justifyContent:'center'}}>
      <Button onClick={()=>{editInfo(a)}} type="primary">编辑</Button>
      <Button type="primary" style={{'marginLeft':'10px'}}>删除</Button>
    </div>)
    },
    align:'center'
  },
];

const getRandomuserParams = (params) => {
  return ({
    page: params.pagination?.current,
  })
}

const UserIndex = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const fetchData = () => {
    setLoading(true);
    axios.get(`/api1/api/users?${qs.stringify(getRandomuserParams(tableParams))}`)
      .then(res => {
        setData(res.data.paginate.data);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: res.data.paginate.last_page*10, // 200 is mock data, you should read it from server
            // total: data.totalCount,
          },
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  return (
    <Table
      columns={columns}
      rowKey={(record) => record.id}
      dataSource={data}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
    />)
};

export default UserIndex;