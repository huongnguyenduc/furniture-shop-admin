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
  const isLoading = loading.effects[('products/getProductList', 'products/setView')];
  const products = useSelector(state => state.products.products);
  const [isShowModal, setIsShowModal] = useState(false);
  React.useEffect(() => {
    dispatch({
      type: 'products/getProductList',
    });
  }, [dispatch]);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'product_id',
      align: 'left',
      width: '4%',
    },
    {
      title: 'Tên Sản Phẩm',
      dataIndex: 'category_name',
      align: 'center',
      width: '15%',
    },
    {
      title: 'Thương hiệu',
      dataIndex: 'brand_name',
      align: 'center',
      width: '15%',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
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
      {isLoading ? (
        <Spin />
      ) : (
        <div>
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
              loading={isLoading}
              dataSource={products}
            ></Table>
          </Content>
        </div>
      )}
    </Layout>
  );
};

export default connect(state => ({ loading: state.loading }))(Product);
