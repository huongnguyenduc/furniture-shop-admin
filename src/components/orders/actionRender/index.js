import React from 'react'
import styles from './styles.less';
import { Space, Tooltip, Button } from 'antd';
import {
    EyeOutlined,
    DeleteOutlined,
  } from '@ant-design/icons';
import { router } from 'umi';
const ActionRender = ({showModal, item ,dispatch}) => {
  const setView = () => {
      dispatch({
          type:'orders/setviewDetail',
          payload: item,
      })
    showModal();
  }
  return (
    <Space size="middle">
      <Tooltip title ="Chi tiết">
        <Button className={styles.buttonContainer} onClick={setView}>
          <EyeOutlined />
          </Button>
      </Tooltip>
      <Tooltip title ="Xóa" > 
        <Button className={styles.buttonContainer}>
           <DeleteOutlined />
        </Button>
      </Tooltip>
    </Space>
  )
}

export default ActionRender