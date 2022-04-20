import  React, { useState,} from 'react'
import { connect, useSelector } from 'dva';
import { Layout, Table, Button, Modal, Tag } from 'antd';
import {PlusOutlined, } from '@ant-design/icons';
import styles from './styles.less';
import ActionRender from '../../components/voucher/actionRender/index';
import { router } from 'umi';
const { Content, Header } = Layout

const Voucher = props => {
    const vouchers = useSelector(state => state.voucher.vouchers);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            align: 'left',
            width: '4%',
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            align: 'center',
            width: '15%',
        },
        {
          title: 'Mô tả',
          dataIndex: 'description',
          align: 'center',
          width: '15%',
        },
        {
            title: 'Ngày áp dụng',
            dataIndex: 'valid_date',
            align: 'center',
            width: '15%',
        },
        {
            title: 'Ngày hết hạn',
            dataIndex: 'expiration_date',
            align: 'center',
            width: '15%',
        },
        {
            title: 'Giá trị',
            dataIndex: 'value',
            align: 'center',
            width: '15%',
        },
        {
            title: 'Hóa đơn tối thiểu',
            dataIndex: 'min_purchase',
            align: 'center',
            width: '15%',
        },
        {
            title: 'Hành Động',
            align: 'center',
            width: '15%',
            render: () => {return <ActionRender showModal = {showModal} />}
        },
    ];
      const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };
  return (
  <Layout className={styles.layoutContainer}>
      <Header className={styles.productHeader}>
        <span className={styles.title}>DANH SÁCH KHUYẾN MÃI</span> 
        <Button
          type="primary"
          size="large"
          className={styles.myButtonStyling}
          onClick={() => {router.push('/voucher/create'); }}
        >
          <PlusOutlined className ={styles.plusIcon}/>
          <div className={styles.myTextButton}> Tạo mới</div>
        </Button>
      </Header>
      <Content className= {styles.productContent}> 
       <Table 
       className={styles.tableCategory}
       columns={columns}
       bordered
       dataSource={vouchers} 
       >
       </Table>
      </Content>
  </Layout>
  );
}

export default Voucher;
