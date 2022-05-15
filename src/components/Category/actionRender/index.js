import React from 'react';
import styles from './styles.less';
import { connect, useSelector } from 'dva';
import { Space, Tooltip, Button, Popconfirm, message } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { router } from 'umi';

const ActionRender = ({ dispatch, item }) => {
  const setEdit = () => {
    dispatch({
        type: 'category/setEdit',
        payload: item,
      });
    router.push(`/category/edit/${item.categoryId}`);
  };
  async function confirm(e) {
    dispatch({
      type: 'category/delCategory',
      payload: item.categoryId,
    });
    message.success('Đã xóa');
  }

  function cancel(e) {
    console.log(e);
  }
  return (
    <Space size="middle">
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
