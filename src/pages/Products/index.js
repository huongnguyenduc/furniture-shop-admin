import React, { useState } from 'react';
import { connect, useSelector } from 'dva';
import { Layout, Table, Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './styles.less';
import ActionRender from '../../components/product/actionRender/index';
import ViewDetail from '../../components/product/viewDetail/index';
import { router } from 'umi';
const { Content, Header } = Layout;

const Product = props => {
  const products = useSelector(state => state.products.products);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'product_id',
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
      render: () => {
        return <ActionRender showModal={showModal} />;
      },
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
      <ViewDetail onCancel={handleCancel} visible={isModalVisible} />
      <Header className={styles.productHeader}>
        <span className={styles.title}>DANH SÁCH SẢN PHẨM</span>
        <Button
          type="primary"
          size="large"
          className={styles.myButtonStyling}
          onClick={() => {
            router.push('/products/create');
          }}
        >
          <PlusOutlined className={styles.plusIcon} />
          <div className={styles.myTextButton}> Tạo mới</div>
        </Button>
      </Header>
      <Content className={styles.productContent}>
        <Table
          className={styles.tableProducts}
          columns={columns}
          bordered
          dataSource={products}
        ></Table>
      </Content>
    </Layout>
  );
};

export default connect(({ products }) => ({
  products,
}))(Product);
