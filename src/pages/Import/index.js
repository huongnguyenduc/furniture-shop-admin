import React, { useState } from 'react';
import { connect, useSelector } from 'dva';
import { Layout, Table, Button, Spin, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './styles.less';
import { router } from 'umi';
import { moneyConverter } from '../../Utils/helper';
import ActionRender from '../../components/imports/actionRender/index';
import ViewImportDetail from '../../components/imports/ViewImportDetail';
const { Content, Header } = Layout;

const Import = props => {
  const { dispatch, loading } = props;
  React.useEffect(() => {
    dispatch({
      type: 'imports/getImports',
    });
  }, [dispatch]);
  React.useEffect(() => {
    dispatch({
      type: 'profile/getProfile',
    });
  }, [dispatch]);
  const isLoading = loading.effects['imports/getImports'];
  const imports = useSelector(state => state.imports.imports);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const profile = useSelector(state => state.profile.account);
  const [importDetails, setImportDetails] = useState([]);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'importId',
      align: 'center',
      width: '4%',
    },
    {
      title: 'Người Nhập',
      dataIndex: 'emailImporter',
      align: 'center',
      width: '10%',
    },
    {
      title: 'Mô tả',
      dataIndex: 'importDesc',
      align: 'center',
      width: '15%',
    },
    {
      title: 'Tổng giá trị',
      dataIndex: 'totalPrice',
      align: 'center',
      width: '20%',
      render: text => {
        return moneyConverter(text);
      },
    },
    {
      title: 'Ngày nhập',
      dataIndex: 'createdAt',
      align: 'center',
      width: '15%',
    },
    {
      title: 'Hành Động',
      align: 'center',
      width: '15%',
      render: importData => {
        console.log(importData);
        return (
          <div onClick={() => setImportDetails(importData)}>
            <ActionRender showModal={showModal} />
          </div>
        );
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
      <Header className={styles.productHeader}>
        <span className={styles.title}>DANH SÁCH PHIẾU NHẬP</span>
        <Button
          type="primary"
          size="large"
          className={styles.myButtonStyling}
          onClick={() => {
            router.push('/import/create');
          }}
        >
          <PlusOutlined className={styles.plusIcon} />
          <div className={styles.myTextButton}> Tạo mới</div>
        </Button>
      </Header>
      <Spin spinning={isLoading}>
        <Content className={styles.productContent}>
          <Table
            className={styles.tableProducts}
            columns={columns}
            bordered
            dataSource={imports}
          ></Table>
        </Content>
        <ViewImportDetail
          visible={isModalVisible}
          onCancel={handleCancel}
          importDetails={importDetails}
          emailExport={profile.email}
          dispatch={dispatch}
        />
      </Spin>
    </Layout>
  );
};

export default connect(state => ({ loading: state.loading }))(Import);
