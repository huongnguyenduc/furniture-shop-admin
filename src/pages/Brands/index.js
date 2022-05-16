import { connect, useSelector } from 'dva';
import { Layout, Table, Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './styles.less';

import React, { useState } from 'react';
import ActionRender from '../../components/brand/actionRender';
import CreateModal from '../../components/brand/create/index';
const { Content, Header } = Layout;

const Brand = props => {
  const brands = useSelector(state => state.brands.brands);

  const { loading, dispatch } = props;
  React.useEffect(() => {
    dispatch({
      type: 'brands/getBrandList',
    });
  }, [brands, dispatch]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleCreate, setIsModalVisibleCreate] = useState(false);
  //update brand
  const handleUpdate = async props => {
    await dispatch({
      type: 'brands/updateBrand',
      payload: props,
    });
  };
  //delete brand
  const handleDelete = async props => {
    await dispatch({
      type: 'brands/deleteBrand',
      payload: props,
    });
  };
  //create brand
  const handleCreate = async props => {
    await dispatch({
      type: 'brands/addBrand',
      payload: props,
    });
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: 'brandId',
      align: 'left',
      width: '5%',
    },

    {
      title: 'Tên thương hiệu',
      dataIndex: 'brandName',
      align: 'center',
      width: '10%',
    },
    {
      title: 'Mô tả',
      dataIndex: 'brandDesc',
      align: 'center',
      width: '15%',
    },
    {
      title: 'Hành Động',
      align: 'center',
      width: '10%',
      render: record => {
        return (
          <ActionRender
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            showModal={showModal}
            record={record}
          />
        );
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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <Layout className={styles.layoutContainer}>
      <CreateModal
        handleCreate={handleCreate}
        onCancel={handleCancelCreate}
        visible={isModalVisibleCreate}
      />
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
