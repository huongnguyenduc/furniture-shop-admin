import React, { useState } from 'react';
import { Menu, Dropdown, Space, Button, message, Modal } from 'antd';
import { ExclamationCircleOutlined, DownOutlined } from '@ant-design/icons';
import styles from './styles.less';
import {
  ODER_PENDING,
  ODER_SHIPPING,
  ODER_COMPLETED,
  ODER_CANCELED,
} from '../../../Utils/contants';

const OrderRender = ({ text,dispatch }) => {
  const [status, setStatus] = useState(text.orderStatus);
  
  const updateStatus = (value) => {
    let request = {};
    request.orderId = text.orderId;
    request.orderStatus = value;
    request.paymentStatus = text.paymentStatus;
  dispatch({
    type:'orders/updateStatus',
    payload: request
  })}

  const confirm = () => {
    Modal.confirm({
      title: 'Xác nhận',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn chắc chắn muốn hủy?',
      okText: 'OK',
      cancelText: 'Hủy',
      onOk: () => {
        setStatus(ODER_CANCELED);
        updateStatus(ODER_CANCELED);
      }
    });
  };

  const handleMenuClick = e => {
    if (e.key === "1") {
      setStatus(ODER_PENDING);
      updateStatus(ODER_PENDING);
    }
    if (e.key === "2") {
      setStatus(ODER_SHIPPING);
      updateStatus(ODER_SHIPPING);
    }
    if (e.key === "3") {
      setStatus(ODER_COMPLETED);
      updateStatus(ODER_COMPLETED);
    }
    if (e.key === "4") {
        confirm()
    }
  };
  const menu = (
    <Menu onClick={handleMenuClick} className={styles.menu}>
      <Menu.Item key="1">{ODER_PENDING}</Menu.Item>
      <Menu.Item key="2">{ODER_SHIPPING}</Menu.Item>
      <Menu.Item key="3">{ODER_COMPLETED}</Menu.Item>
      <Menu.Item key="4">{ODER_CANCELED}</Menu.Item>
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
