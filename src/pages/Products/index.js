import React, { useState } from 'react';
import { connect, useSelector } from 'dva';
import { Layout, Table, Button, Modal, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './styles.less';
import ActionRender from '../../components/product/actionRender/index';
import ViewDetail from '../../components/product/viewDetail/index';
import { router } from 'umi';

const { Content, Header } = Layout;

const Product = props => {
  const { dispatch, loading } = props;
  React.useEffect(() => {
    dispatch({
      type: 'products/getProductList',
    });
  }, [dispatch]);
  const isLoading = loading.effects[('products/getProductList')];
  const products = useSelector(state => state.products.products);
  const [isShowModal, setIsShowModal] = useState(false);
  console.log(products);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'productId',
      align: 'left',
      width: '4%',
    },
    {
      title: 'Tên Sản Phẩm',
      dataIndex: 'categoryName',
      align: 'center',
      width: '15%',
    },
    {
      title: 'Thương hiệu',
      dataIndex: 'brandName',
      align: 'center',
      width: '15%',
    },
    {
      title: 'Mô tả',
      dataIndex: 'productDesc',
      align: 'center',
      width: '25%',
    },
    {
      title: 'Hành Động',
      align: 'center',
      width: '15%',
      render: text => {
        return <ActionRender text={text} show={showModal} />;
      },
    },
  ];
  const showModal = () => {
    setIsShowModal(true);
  };
  const handleCancel = () => {
    setIsShowModal(false);
  };
  return (
    <Layout className={styles.layoutContainer}>
      {isLoading ? ( <Spin />) : (
        <>
          <ViewDetail onCancel={handleCancel} visible={isShowModal} />
          <Header className={styles.productHeader}>
            <span className={styles.title}>DANH SÁCH SẢN PHẨM</span>
            <Button
              type="primary"
              size="large"
              className={styles.myButtonStyling}
              onClick={() => {
                router.push('/product/create');
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
        </>
      )}
    </Layout>
  );
};

export default connect(state => ({ loading: state.loading }))(Product);
