import React from 'react';
import styles from './styles.less';
import { Space, Tooltip, Button, Modal, notification } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { router } from 'umi';
const ActionRender = ({ showModal, item, dispatch }) => {
  const setView = () => {
    dispatch({
      type: 'orders/setviewDetail',
      payload: item,
    });
    dispatch({
      type: 'profile/getProfile',
    });
    showModal();
  };
  const handleClickDelete = async () => {
    Modal.confirm({
      title: 'Bạn chắc chắn muốn xóa?',
      onOk: () => {
        const orderId = item.orderId;
        let roles = localStorage.getItem('roles');
        roles = typeof roles === 'string' ? [roles] : roles;
        const isAdmin = roles.indexOf('ADMIN') !== -1;
        if(isAdmin) {
        dispatch({
          type: 'orders/deleteOrder',
          payload: orderId,
        });}
        else {
          notification.warning({message: "You don't have a permission to delete this!"})
        }
      },
    });
  };
  return (
    <Space size="middle">
      <Tooltip title="Chi tiết">
        <Button className={styles.buttonContainer} onClick={setView}>
          <EyeOutlined />
        </Button>
      </Tooltip>
      <Tooltip title="Xóa">
        <Button className={styles.buttonContainer} onClick={handleClickDelete}>
          <DeleteOutlined />
        </Button>
      </Tooltip>
    </Space>
  );
};

export default ActionRender;
