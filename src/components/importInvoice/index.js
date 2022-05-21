import styles from './index.less';
import { Table, Layout, Button } from 'antd';
import { getdateTime, moneyConverter } from '../../Utils/helper';
import React, { forwardRef, useRef } from 'react';
const { Content } = Layout;

const Invoice = forwardRef((props, ref) => {
  const listItems = props.data.location.state.items;

  const columns = [
    {
      title: 'Variant ID',
      dataIndex: 'variantId',
      align: 'left',
      width: '5%',
    },

    {
      title: 'SKU',
      dataIndex: 'sku',
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
  ];
  const data = listItems.map(value => ({
    sku: value.variant.sku,
    price: moneyConverter(value.price),
    quantity: value.quantity,
    variantId: value.variant.variantId,
  }));
  return (
    <div ref={ref} className={styles.layout}>
      <main className={styles.main}>
        <header>
          <h2 className={styles.header}>INVOICE IMPORT</h2>
        </header>
        <section className={styles.section}>
          <div>
            <p>ID Invoice: {props.data.location.state.idInvoice}</p>
            <p>Người nhập: {props.data.location.state.emailImporter}</p>
          </div>
          <div></div>
          <div>
            <p>Ngày nhập: {getdateTime(props.data.location.state.createdAt)}</p>
            <p>Mô tả: {props.data.location.state.importDesc}</p>
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
