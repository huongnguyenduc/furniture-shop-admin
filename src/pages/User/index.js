import React, { useState } from 'react';
import styles from './styles.less';
import { connect, useSelector } from 'dva';
import { DEFAULT_AVATAR } from '../../Utils/helper';
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
import { UpOutlined, UploadOutlined } from '@ant-design/icons';
import CusActionRender from '../../components/user/customerActionRender/index';
import StaffActionRender from '../../components/user/staffActionRender';
import { router } from 'umi';
const customerColumns = [
    {
      title: 'ID',
      dataIndex: 'userId',
      align: 'left',
      width: '4%',
      sorter: (a, b) => a.userId - b.userId,
    },
    {
      title: 'Tên Khách Hàng',
      dataIndex: 'username',
      align: 'center',
      width: '10%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      align: 'center',
      width: '15%',
    },
    {
      title: 'Vô hiệu hóa',
      align: 'center',
      width: '10%',
      render: (item) => {
        return <CusActionRender item = {item} />;
      },
    }
  ];
  const staffColumns = [
    {
      title: 'ID',
      dataIndex: 'userId',
      align: 'left',
      width: '3%',
      sorter: (a, b) => a.userId - b.userId,
    },
    {
      title: 'Ảnh',
      dataIndex: 'imgUrl',
      align: 'center',
      width: '5%',
      render: item => {
        return <Image width={60} height={60} src={item != null ? item : DEFAULT_AVATAR}></Image>;
      },
    },
    {
      title: 'Tên Nhân Viên',
      dataIndex: 'username',
      align: 'center',
      width: '12%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      align: 'center',
      width: '15%',
    },
    {
      title: 'Hành Động',
      align: 'center',
      width: '10%',
      render: (item) => {
        return <StaffActionRender item = {item} />;
      },
    }
  ];
  const operations = <Button className={styles.buttonAdd} onClick={() => {router.push('/user/create')}}>Thêm nhân viên</Button>;

const User = props => {
  const { dispatch, loading } = props;
  const { TabPane } = Tabs;
  const isLoading = loading.effects[('user/getUsers')];
  React.useEffect(() => {
    dispatch({
      type: 'user/getUsers',
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const customers = useSelector(state => state.user.customers);
  const staffs = useSelector(state => state.user.staffs);
  window.onscroll = function() {
    scrollFunction();
  };
  function scrollFunction() {
    var mybutton = document.getElementById('myBtn');
    if (mybutton !== null) {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = 'block';
      } else {
        mybutton.style.display = 'none';
      }
    }
  }
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
    return (
    <div className={styles.container}>
      <Tabs tabBarExtraContent={operations}>
        <TabPane tab="Khách hàng" key="1">
        <Table
          className={styles.tableCategory}
          columns={customerColumns}
          bordered
          dataSource={customers}
        ></Table>
        </TabPane>
        <TabPane tab="Nhân viên" key="2">
        <Table
          className={styles.tableCategory}
          columns={staffColumns}
          bordered
          dataSource={staffs}
        ></Table>
        </TabPane>
      </Tabs>
      <Button
              onClick={() => topFunction()}
              className={styles.topButton}
              icon={<UpOutlined />}
              id="myBtn"
            ></Button>
    </div>
  );
};

export default connect(state => ({ loading: state.loading })) (User);
