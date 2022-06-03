import React from 'react';
import { connect, useSelector } from 'dva';
import { Layout, Table, Spin } from 'antd';
import styles from './styles.less';
import { moneyConverter } from '../../../Utils/helper';
import moment from 'moment';
const { Content } = Layout;

const VoucherTable = props => {
  const { dispatch, loading } = props;
  const isLoading = loading.effects['voucher/getVoucherList'];
  const vouchers = useSelector(state => state.voucher.vouchers);
  const validVoucher = Array.from(vouchers).filter(function(value) {
    return new Date(value.validDate) <= new Date() && new Date() <= new Date(value.expirationDate);
  });

  React.useEffect(() => {
    dispatch({
      type: 'voucher/getVoucherList',
    });
  }, [dispatch]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'voucherId',
      align: 'left',
      width: '4%',
      sorter: (a, b) => parseInt(a.voucherId) - parseInt(b.voucherId),
    },
    {
      title: 'Tên voucher',
      dataIndex: 'voucherName',
      align: 'center',
      width: '13%',
    },
    {
      title: 'Mô tả',
      dataIndex: 'voucherDesc',
      align: 'center',
      width: '15%',
    },
    {
      title: 'Số lượng',
      dataIndex: 'amount',
      align: 'center',
      width: '7%',
      sorter: (a, b) => parseInt(a.amount) - parseInt(b.amount),
    },
    {
      title: 'Ngày áp dụng',
      dataIndex: 'validDate',
      align: 'center',
      width: '13%',
      render: item => {
        return moment(item).format('DD-MM-YYYY');
      },
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'expirationDate',
      align: 'center',
      width: '13%',
      render: item => {
        return moment(item).format('DD-MM-YYYY');
      },
    },
    {
      title: 'Giá trị',
      dataIndex: 'voucherValue',
      align: 'center',
      width: '15%',
      sorter: (a, b) => parseInt(a.voucherValue) - parseInt(b.voucherValue),
      render: item => {
        return moneyConverter(item) + 'đ';
      },
    },
    {
      title: 'Hóa đơn tối thiểu',
      dataIndex: 'cappedAt',
      align: 'center',
      width: '15%',
      render: item => {
        return moneyConverter(item) + 'đ';
      },
    },
  ];
  return (
    <Layout className={styles.layoutContainer}>
      <Spin spinning={isLoading}>
        <Content className={styles.productContent}>
          <Table
            className={styles.tableCategory}
            columns={columns}
            bordered
            dataSource={validVoucher}
          ></Table>
        </Content>
      </Spin>
    </Layout>
  );
};

export default connect(state => ({ loading: state.loading }))(VoucherTable);
