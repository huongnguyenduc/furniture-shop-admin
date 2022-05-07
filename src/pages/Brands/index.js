import { connect, useSelector } from 'dva';
import { Layout, Table, Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './styles.less';

import React, { useState } from 'react';
import ViewDetail from '../../components/brand/viewDetail';
import ActionRender from '../../components/brand/actionRender';
import { router } from 'umi';
import CreateModal from '../../components/brand/create/index';
const { Content, Header } = Layout;

const Brand = props => {
  const brands = useSelector(state => state.brands.brands);
  const [listBrand, setListBrand] = useState(brands);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleCreate, setIsModalVisibleCreate] = useState(false);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'brand_id',
      align: 'left',
      width: '10%',
    },

    {
      title: 'Tên thương hiệu',
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
      title: 'Hành Động',
      align: 'center',
      width: '15%',
      render: record => {
        return <ActionRender showModal={showModal} record={record} />;
      },
    },
  ];
  //Create
  const showModalCreate = () => {
    setIsModalVisibleCreate(true);
  };
  const handleCancelCreate = () => {
    setIsModalVisibleCreate(false);
  };
  //
  const handleDelete = () => {};

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <Layout className={styles.layoutContainer}>
      <ViewDetail onCancel={handleCancel} visible={isModalVisible} />
      <CreateModal onCancel={handleCancelCreate} visible={isModalVisibleCreate} />
      <Header className={styles.brandHeader}>
        <span className={styles.title}>DANH SÁCH THƯƠNG HIỆU</span>
        <Button
          type="primary"
          size="large"
          className={styles.myButtonStyling}
          onClick={showModalCreate}
        >
          <PlusOutlined className={styles.plusIcon} />
          <div className={styles.myTextButton}> Tạo mới</div>
        </Button>
      </Header>
      <Content className={styles.brandContent}>
        <Table
          className={styles.tableBrands}
          columns={columns}
          bordered
          dataSource={brands}
        ></Table>
      </Content>
    </Layout>
  );
};
export default connect(({ brands }) => ({
  brands,
}))(Brand);
