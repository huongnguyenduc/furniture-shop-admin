import React from 'react';
import styles from './styles.less';
import { Space, Tooltip, Button, Modal } from 'antd';
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
        dispatch({
          type: 'orders/deleteOrder',
          payload: orderId,
        });
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
