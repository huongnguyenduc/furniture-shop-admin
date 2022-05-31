import React, { useState } from 'react';
import { Menu, Dropdown, Space, Button, Modal } from 'antd';
import { ExclamationCircleOutlined, DownOutlined } from '@ant-design/icons';
import styles from './styles.less';
import {
    PAYMENT_UNPAID,
    PAYMENT_PAID,
    PAYMENT_REFUND,
    PAYMENT_CANCELED,
} from '../../../Utils/contants';

const PaymentRender = ({ text,dispatch }) => {
  const [status, setStatus] = useState(text.paymentStatus);
  

  const updateStatus = (value) => {
    let request = {};
    request.orderId = text.orderId;
    request.orderStatus = text.orderStatus;
    request.paymentStatus = value;
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
        setStatus(PAYMENT_CANCELED);
        updateStatus(PAYMENT_CANCELED);
      }
    });
  };
  
  const handleMenuClick = e => {
    if (e.key === "1") {
      setStatus(PAYMENT_UNPAID);
      updateStatus(PAYMENT_UNPAID);
    }
    if (e.key === "2") {
      setStatus(PAYMENT_PAID);
      updateStatus(PAYMENT_PAID);
    }
    if (e.key === "3") {
      setStatus(PAYMENT_REFUND);
      updateStatus(PAYMENT_REFUND);
    }
    if (e.key === "4") {
        confirm();
    }
  };
  const menu = (
    <Menu onClick={handleMenuClick} className={styles.menu}>
      <Menu.Item key="1">{PAYMENT_UNPAID}</Menu.Item>
      <Menu.Item key="2">{PAYMENT_PAID}</Menu.Item>
      <Menu.Item key="3">{PAYMENT_REFUND}</Menu.Item>
      <Menu.Item key="4">{PAYMENT_CANCELED}</Menu.Item>
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

export default PaymentRender;
