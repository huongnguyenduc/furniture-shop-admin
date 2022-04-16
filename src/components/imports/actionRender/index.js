import React from 'react'
import styles from './styles.less';
import { Space, Tooltip, Button } from 'antd';
import {
    EditOutlined,
    EyeOutlined,
    DeleteOutlined,
  } from '@ant-design/icons';
import { router } from 'umi';
const ActionRender = ({showModal, text}) => {
 const navigateImportEdit = () => {
     console.log(text)
     router.push(`/import/edit/${text.id}`);
 }
  return (
    <Space size="middle">
      <Tooltip title ="Chi tiết">
        <Button className={styles.buttonContainer} onClick={showModal}>
          <EyeOutlined />
          </Button>
      </Tooltip>
      <Tooltip title ="Sửa">
        <Button className={styles.buttonContainer} onClick={navigateImportEdit}>
          <EditOutlined />
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