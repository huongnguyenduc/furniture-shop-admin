import React, { useState } from 'react';
import { connect, useSelector } from 'dva';
import { Layout, Table, Button, Space, Spin,Input } from 'antd';
import styles from './styles.less';
import { moneyConverter } from '../../Utils/helper';
import { SearchOutlined } from '@ant-design/icons';
import OrderRender from '../../components/orders/orderDropdown/index';
import PaymentRender from '../../components/orders/paymentDropdown/index';
import ActionRender from '../../components/orders/actionRender/index';
import ViewDetail from '../../components/orders/viewDetail/index';
import Highlighter from 'react-highlight-words';
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
  const [state, setState] = useState({
    searchText: '',
    searchedColumn: '',
  });
  let searchInput;
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 10 }}>
        <Input
          ref={node => {
            searchInput = node;
          }}
          placeholder={`Search`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            className={styles.buttonSearch}
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            size="small"
            style={{ width: 50 }}
          >
            <SearchOutlined />
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 70 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: text =>
      state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const handleReset = clearFilters => {
    clearFilters();
    setState({ searchText: '' });
  };
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: 'orderId',
      align: 'left',
      width: '4%',
      sorter: (a, b) => a.orderId - b.orderId,
    },
    {
      title: 'Tên Khách hàng',
      dataIndex: 'username',
      align: 'center',
      width: '10%',
      ...getColumnSearchProps('username'),
    },
    {
      title: 'Ngày đặt hàng',
      dataIndex: 'createdAt',
      align: 'center',
      width: '15%',
      render: text => {
        return text.substring(0, 10);
      },
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
      render: text => <OrderRender text={text} dispatch={dispatch} />,
    },
    {
      title: 'Trạng thái Thanh toán',
      align: 'center',
      width: '15%',
      render: text => <PaymentRender text={text} dispatch={dispatch} />,
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
    setIsShowModal(false);
  };
  return (
    <Layout className={styles.layoutContainer}>
      <Header className={styles.productHeader}>
        <span className={styles.title}>DANH SÁCH HÓA ĐƠN</span>
      </Header>
      <Spin spinning={isLoading}>
        <Content className={styles.productContent}>
          <ViewDetail visible={isShowModal} onCancel={handleCancle} />
          <Table
            className={styles.tableProducts}
            columns={columns}
            bordered
            dataSource={orders}
          ></Table>
        </Content>
      </Spin>
    </Layout>
  );
};

export default connect(state => ({ loading: state.loading }))(Orders);
