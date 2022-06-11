import React from 'react';
import styles from './styles.less';
import { connect, useSelector } from 'dva';
import { Space, Tooltip, Button, Popconfirm, message } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { router } from 'umi';

const StaffActionRender = ({ dispatch, item }) => {
  async function confirm(e) {
    dispatch({
      type: 'user/delUser',
      payload: item.username,
    });
  }

  function cancel(e) {
    console.log(e);
  }
  return (
    <Space size="middle">
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

export default connect()(StaffActionRender);
