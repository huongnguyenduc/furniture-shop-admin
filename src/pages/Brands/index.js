import { connect, useSelector } from 'dva';
import { Layout, Table, Button, Modal, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './styles.less';
import { router } from 'umi';

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
      {isLoading ? (
        <Spin />
      ) : (
        <div>
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
        </div>
      )}
    </Layout>
  );
};

export default connect(state => ({ loading: state.loading }))(Brand);
