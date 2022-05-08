import React from 'react';
import styles from './styles.less';
import { connect, useSelector } from 'dva';
import { Space, Tooltip, Button } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';

const ActionRender = ({ dispatch, item }) => {
  const setEdit = () => {
    // dispatch({
    //   type: 'products/setView',
    //   payload: text.productId,
    // });
  };

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
        <Button className={styles.buttonContainer}>
          <DeleteOutlined />
        </Button>
      </Tooltip>
    </Space>
  );
};

export default connect()(ActionRender);
