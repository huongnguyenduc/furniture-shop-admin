import { connect, useSelector } from 'dva';
import { Layout, Table, Button, Modal, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './styles.less';

import React, { useState } from 'react';
import ActionRender from '../../components/brand/actionRender';
import CreateModal from '../../components/brand/create/index';
import EditModal from '../../components/brand/edit/index';
const { Content, Header } = Layout;

const Brand = props => {
  const { loading, dispatch } = props;
  const isLoading = loading.effects['brands/getBrandList'];
  const brands = useSelector(state => state.brands.brands);
  React.useEffect(() => {
    dispatch({
      type: 'brands/getBrandList',
    });
  }, [dispatch]);
  const [value, setValue] = useState({
    brandId: 0,
    brandName: '0',
    brandDesc: '0',
  });
  const [isModalVisibleUpdate, setIsModalVisibleUpdate] = useState(false);
  const [isModalVisibleCreate, setIsModalVisibleCreate] = useState(false);
  //update brand
  const handleUpdate = async props => {
    await dispatch({
      type: 'brands/updateBrand',
      payload: props,
    });
    console.log(brands);
  };
  //delete brand
  const handleDelete = async props => {
    await dispatch({
      type: 'brands/deleteBrand',
      payload: props,
    });
    console.log(brands);
  };
  //create brand
  const handleCreate = async props => {
    await dispatch({
      type: 'brands/addBrand',
      payload: props,
    });
    console.log(brands);
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: 'brandId',
      align: 'center',
      width: '6%',
    },

    {
      title: 'Tên thương hiệu',
      dataIndex: 'brandName',
      align: 'center',
      width: '25%',
    },
    {
      title: 'Mô tả',
      dataIndex: 'brandDesc',
      align: 'center',
    },
    {
      title: 'Hành Động',
      align: 'center',
      width: '20%',
      render: record => {
        return (
          <ActionRender
            showModalUpdate={showModalUpdate}
            handleCancelUpdate={handleCancelUpdate}
            handleDelete={handleDelete}
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

  const showModalUpdate = props => {
    setValue(props);
    setIsModalVisibleUpdate(true);
  };

  const handleCancelUpdate = () => {
    setIsModalVisibleUpdate(false);
  };
  return (
    <Layout className={styles.layoutContainer}>
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
      <Spin spinning={isLoading}>
        <Content className={styles.brandContent}>
          <Table
            className={styles.tableBrands}
            columns={columns}
            bordered
            dataSource={brands}
          ></Table>
        </Content>
      </Spin>
      <CreateModal
        handleCreate={handleCreate}
        onCancel={handleCancelCreate}
        visible={isModalVisibleCreate}
      />
      <EditModal
        value={value}
        handleUpdate={handleUpdate}
        onCancel={handleCancelUpdate}
        visible={isModalVisibleUpdate}
      />
    </Layout>
  );
};

export default connect(state => ({ loading: state.loading }))(Brand);
