import React from 'react';
import { Modal, Table, Image, Button } from 'antd';

const ViewImportDetail = props => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'variantId',
      align: 'left',
      width: '10%',
    },
    {
      title: 'Ảnh',
      dataIndex: 'image',
      align: 'left',
      width: '40%',
      render: item => {
        return <Image width={200} src={item}></Image>;
      },
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      align: 'center',
      width: '30%',
    },
    {
      title: 'Giá nhập',
      dataIndex: 'price',
      align: 'center',
      // render: item => {
      //   return moneyConverter(item);
      // },
    },
  ];

  const data = props.importDetails.map(value => ({
    price: value.price,
    quantity: value.quantity,
    variantId: value.variant.variantId,
    image: value.variant.image,
  }));

  return (
    <Modal
      width={1020}
      title="Import detail"
      visible={props.visible}
      onCancel={props.onCancel}
      footer={[
        <Button key="back" onClick={props.onCancel}>
          Return
        </Button>,
      ]}
    >
      <Table columns={columns} dataSource={data}></Table>
    </Modal>
  );
};

export default ViewImportDetail;
