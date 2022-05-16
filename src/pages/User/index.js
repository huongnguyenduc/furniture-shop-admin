import React, { useState } from 'react';
import styles from './styles.less';
import { connect, useSelector } from 'dva';
import {
  Affix,
  Form,
  Upload,
  Row,
  Col,
  Input,
  Typography,
  Button,
  InputNumber,
  Image,
  message,
  Spin,
  Table,
  Tabs,
} from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';

import { router } from 'umi';
const Staffcolumns = [
    {
      title: 'ID',
      dataIndex: 'categoryId',
      align: 'left',
      width: '4%',
      sorter: (a, b) => a.categoryId - b.categoryId,
    },
    {
      title: 'Name',
      dataIndex: 'parentId',
      align: 'left',
      width: '4%',
    },
    {
      title: 'Email',
      dataIndex: 'categoryName',
      key: 'categoryName',
      align: 'center',
      width: '15%',
    },
    {
      title: 'SĐT',
      dataIndex: 'categoryDesc',
      align: 'center',
      width: '15%',
    }];
const User = () => {
  const { TabPane } = Tabs;
  return (
    <div className={styles.container}>
      <Tabs>
        <TabPane tab="Khách hàng" key="1">
        <Table
          className={styles.tableCategory}
          columns={Staffcolumns}
          bordered
          //dataSource={categories}
        ></Table>
        </TabPane>
        <TabPane tab="Nhân viên" key="2">
          Content of tab 2
        </TabPane>
      </Tabs>
    </div>
  );
};

export default User;
