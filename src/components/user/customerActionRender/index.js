import React from 'react';
import styles from './styles.less';
import { connect, useSelector } from 'dva';
import { Space, Tooltip, Switch, Popconfirm, message } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { router } from 'umi';
const CusActionRender = ({ dispatch, item }) => {

  async function changeStatus() {
    dispatch({
      type: 'user/lockAccount',
      payload: item.username,
    });
  }
  function onChange(checked) {
    console.log(`switch to ${checked}`);
    changeStatus();
  }
  return (
    <Space size="middle">
      <Tooltip title="Vô hiệu hóa">
      <Switch defaultChecked={item.activeFlag == "B" ? true : false} onChange={onChange} />
      </Tooltip>
    </Space>
  );
};

export default connect()(CusActionRender);
