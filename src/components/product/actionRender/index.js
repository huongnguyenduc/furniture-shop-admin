import React from 'react';
import styles from './styles.less';
import { Space, Tooltip, Button } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
const ActionRender = ({ showModal }) => {
  return (
    <Space size="middle">
      <Tooltip title="Chi tiết">
        <Button className={styles.buttonContainer} onClick={showModal}>
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

export default ActionRender;
