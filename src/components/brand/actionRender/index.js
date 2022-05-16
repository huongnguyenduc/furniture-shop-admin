import React from 'react';
import styles from './styles.less';
import { Space, Tooltip, Button, Modal } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { router } from 'umi';

const ActionRender = props => {
  const handleClickDelete = async () => {
    Modal.confirm({
      title: 'Bạn chắc chắn muốn xóa?',
      onOk: () => {
        const brandId = props.record.brandId;
        props.handleDelete(brandId);
      },
    });
  };

  return (
    <Space size="middle">
      <Tooltip title="Sửa">
        <Button
          className={styles.buttonContainer}
          onClick={() => {
            router.push(`/brand/edit/${props.record.brandId}`, props.record);
          }}
        >
          <EditOutlined />
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
