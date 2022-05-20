import React from 'react';
import styles from './styles.less';
import { Space, Tooltip, Button } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
const ActionRender = ({ showModal, text }) => {
  return (
    <Space size="middle">
      <Tooltip title="Chi tiết">
        <Button className={styles.buttonContainer} onClick={showModal}>
          <EyeOutlined />
        </Button>
      </Tooltip>
    </Space>
  );
};

export default ActionRender;
