import React from 'react';
import styles from './styles.less';
import { connect, useSelector } from 'dva';
import { Space, Tooltip, Button, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { router } from 'umi';
const ActionRender = ({ dispatch, item }) => {
  const setEdit = () => {
    router.push(`/products/${item.productId}/variant/${item.variantId}`);
  };
  async function confirm(e) {
    dispatch({
      type: 'products/delVariant',
      payload: item.variantId,
    });
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
