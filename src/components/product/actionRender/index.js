import React from 'react';
import styles from './styles.less';
import { connect, useSelector } from 'dva';
import { Space, Tooltip, Button } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';

const ActionRender = ({ dispatch, text, show }) => {
  const setView = () => {
    dispatch({
      type: 'products/setView',
      payload: text.product_id,
    });
  };

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
        <Button className={styles.buttonContainer}>
          <EditOutlined />
        </Button>
      </Tooltip>
      <Tooltip title="Xóa">
        <Button className={styles.buttonContainer}>
          <DeleteOutlined />
        </Button>
      </Tooltip>
    </Space>
  );
};

export default connect()(ActionRender);
