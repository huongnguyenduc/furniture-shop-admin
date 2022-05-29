import styles from './index.less';

import { Table, Layout, Button } from 'antd';
import { getdateTime, moneyConverter } from '../../Utils/helper';
import React, { forwardRef, useRef } from 'react';
const { Content } = Layout;

const Invoice = forwardRef((props, ref) => {
  console.log(props);
  const columns = [
    {
      title: 'SKU',
      dataIndex: 'sku',
      align: 'center',
      width: '20%',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productName',
      align: 'center',
      width: '20%',
    },

    {
      title: 'Quantity',
      dataIndex: 'quantity',
      align: 'center',
      width: '10%',
    },
    {
      title: 'Giá nhập',
      dataIndex: 'price',
      align: 'center',
      width: '10%',
    },
    {
      title: 'Thành tiền',
      dataIndex: 'total',
      align: 'center',
      width: '10%',
    },
  ];
  const data = props.data.location.state.items.map(value => ({
    sku: value.variant.sku,
    productName: value.variant.productName,
    price: moneyConverter(value.variant.price),
    quantity: value.quantity,
    total: moneyConverter(value.variant.price * value.quantity),
  }));
  return (
    <div ref={ref} className={styles.layout}>
      <main className={styles.main}>
        <header>
          <h2 className={styles.header}>HÓA ĐƠN BÁN HÀNG</h2>
        </header>
        <section className={styles.section}>
          <div>
            <p>Mã hóa đơn: {props.data.location.state.orderID}</p>
            <p>Người đặt: {props.data.location.state.username}</p>
            <p>Người xuất hóa đơn: {props.data.location.state.emailExport}</p>
          </div>
          <div></div>
          <div>
            <p>Ngày đặt hàng: {props.data.location.state.createdAt.substring(0, 10)}</p>
            <p>Tình trạng thanh toán: {props.data.location.state.paymentStatus}</p>
          </div>
          <div></div>
        </section>
        <Content className={styles.invoiceContent}>
          <Table
            className={styles.tableInvoices}
            columns={columns}
            bordered
            pagination={false}
            dataSource={data}
          ></Table>
        </Content>
        <div className={styles.styleTotal}>
          <p className={styles.total}>
            Tổng: {moneyConverter(props.data.location.state.totalPrice)}
          </p>
        </div>
      </main>
    </div>
  );
});
export default Invoice;
