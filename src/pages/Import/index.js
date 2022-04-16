import React from 'react'
import { connect, useSelector } from 'dva';
import { Layout, Table, Button, Modal } from 'antd';
import {PlusOutlined, } from '@ant-design/icons';
import styles from './styles.less';
import { router } from 'umi';
import { create } from 'react-test-renderer';
import {
    moneyConverter
} from '../../Utils/helper';
import ActionRender from '../../components/imports/actionRender/index';
const { Content, Header } = Layout

const Import = props => {
    
    const imports = useSelector(state => state.imports.imports);
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            align: 'left',
            width: '4%',
        },
        {
            title: 'Người Nhập',
            dataIndex: 'username',
            align: 'center',
            width: '10%',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            align: 'center',
            width: '15%',
        },
        {
            title: 'Tổng giá trị',
            dataIndex: 'total_price',
            align: 'center',
            width: '20%',
            render: text => { return moneyConverter(text) }
        },
        {
            title: 'Ngày nhập',
            dataIndex: 'create_day',
            align: 'center',
            width: '15%',
        },
        {
            title: 'Hành Động',
            align: 'center',
            width: '15%',
            render: text =>  <ActionRender showModal = {showModal} text = {text} />
        },
    ];
   const showModal = () => {
      return 0;
   };
   const editItem = () => {

   }
  return (
   <Layout className={styles.layoutContainer}>
     <Header className={styles.productHeader}>
        <span className={styles.title}>DANH SÁCH PHIẾU NHẬP</span> 
        <Button
          type="primary"
          size="large"
          className={styles.myButtonStyling}
          onClick={() => {
              router.push('/import/create')
          }}
        >
          <PlusOutlined className ={styles.plusIcon}/>
          <div className={styles.myTextButton}> Tạo mới</div>
        </Button>
      </Header>
      <Content className= {styles.productContent}>
       <Table 
       className={styles.tableProducts}
       columns={columns}
       bordered
       dataSource={imports}
       >
       </Table>
      </Content>
   </Layout>
  )
}

export default connect() (Import);