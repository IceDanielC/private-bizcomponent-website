import React from 'react';
import { Table } from '@private-basic-components';
import { UserInfoTableProps } from './interface';

const UserInfoTable: React.FC<UserInfoTableProps> = ({ data }) => {
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender'
    }
  ];

  return (
    <Table
      className="min-w-full bg-white"
      columns={columns}
      dataSource={data}
      bordered
      pagination={false}
    />
  );
};

export default UserInfoTable;
