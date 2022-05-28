import React,{useState} from 'react';
import { connect, useSelector } from 'dva';
import { Layout, Table, Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './styles.less';
import { router } from 'umi';
import { create } from 'react-test-renderer';
import { moneyConverter } from '../../Utils/helper';
import OrderRender from '../../components/orders/orderDropdown/index';
import PaymentRender from '../../components/orders/paymentDropdown/index';
import ActionRender from '../../components/orders/actionRender/index';
import ViewDetail from '../../components/orders/viewDetail/index';
const { Content, Header } = Layout;

const Orders = props => {
  const { dispatch, loading } = props;
  const isLoading = loading.effects['orders/getOrderList'];
  React.useEffect(() => {
    dispatch({
      type: 'orders/getOrderList',
    });
  }, [dispatch]);
  const orders = useSelector(state => state.orders.orders);
  const [isShowModal, setIsShowModal] = useState(false);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'orderId',
      align: 'left',
      width: '4%',
    },
    {
      title: 'Tên Khách hàng',
      dataIndex: 'username',
      align: 'center',
      width: '10%',
    },
    {
      title: 'Ngày đặt hàng',
      dataIndex: 'createdAt',
      align: 'center',
      width: '15%',
      render: text => {
          return text.substring(0,10);
      }
    },
    {
      title: 'Tổng hóa đơn',
      dataIndex: 'totalPrice',
      align: 'center',
      width: '20%',
      render: text => {
        return moneyConverter(text);
      },
    },
    {
      title: 'Trạng thái đơn hàng',
      align: 'center',
      width: '15%',
      render: text => <OrderRender text={text} dispatch={dispatch}/>
    },
    {
      title: 'Trạng thái Thanh toán',
      align: 'center',
      width: '15%',
      render: text => <PaymentRender text={text} dispatch={dispatch}/>
    },
    {
      title: 'Hành Động',
      align: 'center',
      width: '15%',
      render: item => <ActionRender showModal={showModal} item={item} dispatch={dispatch} />,
    },
  ];
  const showModal = () => {
    setIsShowModal(true);
  };
  const handleCancle = () => {
    setIsShowModal(false)
  }
  return (
    <Layout className={styles.layoutContainer}>
      <Header className={styles.productHeader}>
        <span className={styles.title}>DANH SÁCH HÓA ĐƠN</span>
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
      <Content className={styles.productContent}>
        <ViewDetail visible={isShowModal} onCancel={handleCancle}/>
        <Table
          className={styles.tableProducts}
          columns={columns}
          bordered
          dataSource={orders}
        ></Table>
      </Content>
    </Layout>
  );
};

export default connect(state => ({ loading: state.loading }))(Orders);
