/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { Menu, Dropdown, Space, Button, Modal } from 'antd';
import { ExclamationCircleOutlined, DownOutlined } from '@ant-design/icons';
import styles from './styles.less';
import {
  ORDER_PENDING,
  ORDER_SHIPPING,
  ORDER_COMPLETED,
  ORDER_CANCELED,
} from '../../../Utils/contants';

const OrderRender = ({ text, dispatch }) => {
  const [status, setStatus] = useState(text.orderStatus);
  React.useEffect(()=> {
    setStatus(text.orderStatus);
  },[text.orderStatus]);
  const updateStatus = value => {
    let request = {};
    request.orderId = text.orderId;
    request.orderStatus = value;
    request.paymentStatus = text.paymentStatus;
    dispatch({
      type: 'orders/updateStatus',
      payload: request,
    });
  };

  const confirm = () => {
    Modal.confirm({
      title: 'Xác nhận',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn chắc chắn muốn hủy?',
      okText: 'OK',
      cancelText: 'Hủy',
      onOk: () => {
        setStatus(ORDER_CANCELED);
        updateStatus(ORDER_CANCELED);
      },
    });
  };

  const handleMenuClick = e => {
    if (e.key === '1') {
      setStatus(ORDER_PENDING);
      updateStatus(ORDER_PENDING);
    }
    if (e.key === '2') {
      setStatus(ORDER_SHIPPING);
      updateStatus(ORDER_SHIPPING);
    }
    if (e.key === '3') {
      setStatus(ORDER_COMPLETED);
      updateStatus(ORDER_COMPLETED);
    }
    if (e.key === '4') {
      confirm();
    }
  };
  const menu = (
    <Menu onClick={handleMenuClick} className={styles.menu}>
      <Menu.Item key="1">{ORDER_PENDING}</Menu.Item>
      <Menu.Item key="2">{ORDER_SHIPPING}</Menu.Item>
      <Menu.Item key="3">{ORDER_COMPLETED}</Menu.Item>
      <Menu.Item key="4">{ORDER_CANCELED}</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']} className={status} disabled={status == 'CANCELED'}>
      <Button>
        <Space>
          {status}
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
};

export default OrderRender;
