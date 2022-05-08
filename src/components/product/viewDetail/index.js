import React, { useState } from 'react';
import { connect, useSelector } from 'dva';
import { Modal, Image, Descriptions, Col, Row, Table, Button, Space } from 'antd';
import styles from './styles.less';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { moneyConverter, modifyString, setDataSource } from '../../../Utils/helper';
import ActionRender from '../variant/actionRender/index';
function isNumeric(str) {
  if (typeof str != 'string') return false; // we only process strings!
  return (
    !isNaN(str) && !isNaN(parseFloat(str)) // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
  ); // ...and ensure strings of whitespace fail
}
const ViewDetail = ({ visible, onCancel, products }) => {
  const view = useSelector(state => state.products.view);
  console.log(view)
  var column = [
    {
      title: 'ID',
      dataIndex: 'variantId',
      align: 'left',
      width: '4%',
    },
    {
      title: 'Ảnh',
      dataIndex: 'image',
      align: 'left',
      width: '6%',
      render: item => {
        return <Image width={30} height={40} src={item}></Image>;
      },
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      align: 'center',
    },
    {
      title: 'Giá nhập',
      dataIndex: 'importPrice',
      align: 'center',
      render: item => {
        return moneyConverter(item);
      },
    },
    {
      title: 'Giá bán',
      dataIndex: 'price',
      align: 'center',
      render: item => {
        return moneyConverter(item);
      },
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      align: 'center',
      render: item => {
        return moneyConverter(item);
      },
    },
  ];
  var subcolumn = view?.variants.shift()?.options;
 if(subcolumn !== undefined) subcolumn.forEach(item => {
    var temp = 100 / subcolumn.length + '%';
    column.push({
      title: item.optionName,
      dataIndex: modifyString(item.optionName),
      align: 'center',
      width: temp,
    });
  });
 column.push({
  title: 'Hành động',
  align: 'center',
  render: item => {
    return <ActionRender item={item}/>;
  },
 })
  return (

        <Modal
          className="cc"
          title="CHI TIẾT SẢN PHẨM"
          footer={null}
          visible={visible}
          cancelButtonProps={{ style: { display: 'none' } }}
          okButtonProps={{ style: { display: 'none' } }}
          width={1200}
          bodyStyle={{ height: 'unset' }}
          onCancel={onCancel}
        >
          <Row className={styles.viewContainer}>
            <Col span={24}>
              <Descriptions>
                <Descriptions.Item label="Mã sản phẩm"> {view?.productId}</Descriptions.Item>
                <Descriptions.Item label="Phân loại">{view?.categoryName}</Descriptions.Item>
                <Descriptions.Item label="Hãng">{view?.brandName}</Descriptions.Item>
                <Descriptions.Item label="Tên sản phẩm"> {view?.productName}</Descriptions.Item>
                <Descriptions.Item label="Mô tả">{view?.productDesc}</Descriptions.Item>
              </Descriptions>
            </Col>
            <Col span={4} className={styles.carouContainer}>
              <Image
                className={styles.image}
                width={220}
                height={320}
                src={view?.image}
                preview={false}
              />
            </Col>
            <Col span={19} offset={1} className={styles.inforContainer}>
              <span style={{ marginBottom: '20px' }} className={styles.subtitle}>
                Danh sách phiên bản:
              </span>
              <Table
                className={styles.tableVariant}
                columns={column}
                bordered
                dataSource={setDataSource(view?.variants)}
                pagination={{ position: ['none', 'none'] }}
              ></Table>
            </Col>
          </Row>
        </Modal>
  );
};

export default connect(state => ({
  products: state.products,
}))(ViewDetail);
