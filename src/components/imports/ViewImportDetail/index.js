import React from 'react';
import { Modal, Table, Image, Button } from 'antd';
import { router } from 'umi';

const pdfpreview = props => {
  console.log(props);
  router.push(`/import/invoice/${props.importDetails.importId}`, {
    items: props.importDetails.importDetails,
    idInvoice: props.importDetails.importId,
    importDesc: props.importDetails.importDesc,
    emailImporter: props.importDetails.emailImporter,
    createdAt: props.importDetails.createdAt,
    totalPrice: props.importDetails.totalPrice,
    emailExport: props.emailExport,
  });
};
const ViewImportDetail = props => {
  const columns = [
    {
      title: 'Variant ID',
      dataIndex: 'variantId',
      align: 'center',
      width: '10%',
    },
    {
      title: 'Ảnh',
      dataIndex: 'image',
      align: 'left',
      width: '10%',
      render: item => {
        return <Image width={50} src={item}></Image>;
      },
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      align: 'left',
      width: '50%',
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
      // render: item => {
      //   return moneyConverter(item);
      // },
    },
  ];
  const listImport = props.importDetails.importDetails;
  let data = null;
  if (listImport != null) {
    data = listImport.map(value => ({
      sku: value.variant.sku,
      price: value.price,
      quantity: value.quantity,
      variantId: value.variant.variantId,
      image: value.variant.image,
    }));
  }

  return (
    <Modal
      width={1020}
      title="Import detail"
      visible={props.visible}
      onCancel={props.onCancel}
      footer={[
        <Button key="Ok" onClick={() => pdfpreview(props)}>
          Export
        </Button>,
      ]}
    >
      <Table columns={columns} dataSource={data}></Table>
    </Modal>
  );
};

export default ViewImportDetail;
