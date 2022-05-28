import React from 'react';
import styles from './styles.less';
import { connect, useSelector } from 'dva';
import { Space, Tooltip, Button, Popconfirm, message } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { router } from 'umi';
const ActionRender = ({ dispatch, text, show }) => {
  const setView = () => {
    dispatch({
      type: 'products/setView',
      payload: text.productId,
    });
  };
  const setEdit = () => {
    router.push(`/products/edit/${text.productId}`);
  };
  async function confirm(e) {
    dispatch({
      type: 'products/delProduct',
      payload: text.productId,
    });
  }

  function cancel(e) {
    console.log(e);
  }
  return (
    <Space size="middle">
      <Tooltip title="Chi tiết">
        <Button
          className={styles.buttonContainer}
          onClick={() => {
            setView();
            show();
          }}
        >
          <EyeOutlined />
        </Button>
      </Tooltip>
      <Tooltip title="Sửa">
        <Button
          className={styles.buttonContainer}
          onClick={() => {
            setEdit();
          }}
        >
          <EditOutlined />
        </Button>
      </Tooltip>
      <Tooltip title="Xóa">
        <Popconfirm
          title="Bạn có chắc chắn muốn xóa?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button className={styles.buttonContainer}>
            <DeleteOutlined />
          </Button>
        </Popconfirm>
      </Tooltip>
    </Space>
  );
};

export default connect()(ActionRender);
