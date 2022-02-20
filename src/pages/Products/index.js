import  React, { useState,} from 'react'
import { connect } from 'dva';
import { Layout, Table, Button, Modal } from 'antd';
import styles from './styles.less';
import ActionRender from '../../components/product/actionRender/index';
import ViewDetail from '../../components/product/viewDetail/index';
import { router } from 'umi';
const { Content, Header } = Layout

const Product = props => {
    const {products} = props;
    const [isModalVisible, setIsModalVisible] = useState(true);
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            align: 'left',
            width: '4%',
        },
        {
            title: 'Mã SP',
            dataIndex: 'code',
            align: 'center',
            width: '6%',
        },
        {
            title: 'Tên Sản Phẩm',
            dataIndex: 'name',
            align: 'center',
            width: '15%',
        },
        {
            title: 'Số lượng tồn',
            dataIndex: 'quantity',
            align: 'center',
            width: '15%',
        },
        {
            title: 'Giá Bán',
            dataIndex: 'price',
            align: 'center',
            width: '15%',
        },
        {
            title: 'Giá Nhập',
            dataIndex: 'orignalprice',
            align: 'center',
            width: '15%',
        },
        {
            title: 'Hành Động',
            dataIndex: 'name',
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
      <ViewDetail onCancel={handleCancel} visible = {isModalVisible} />
      <Header className={styles.productHeader}>
        <span>PRODUCTS LIST</span> 
        <Button
          type="primary"
          size="large"
          className={styles.myButtonStyling}
          onClick={() => {
            router.push('/products/create');
          }}
        >
          <div className={styles.myTextButton}>Thêm sản phẩm</div>
        </Button>
      </Header>
      <Content className= {styles.productContent}>
       <Table 
       className={styles.tableProducts}
       columns={columns}
       bordered
       dataSource={products} 
       >
       </Table>
      </Content>
  </Layout>
  );
}

export default connect(({ products }) => ({
    products,
  })) (Product);
