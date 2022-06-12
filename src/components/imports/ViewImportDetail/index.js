import React from 'react';
import { Modal, Table, Image, Button,Row,Col, Descriptions } from 'antd';
import { router } from 'umi';
import styles from './styles.less';
import { moneyConverter } from '../../../Utils/helper';
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
      title: 'Mã SKU',
      dataIndex: 'sku',
      align: 'left',
      width: '40%',
    },
    {
      title: 'Giá nhập',
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
      width: '10%',
    },
    {
      title: 'Thành tiền',
      align: 'center',
      render: item => {
        return moneyConverter(item.price*item.quantity);
      },
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
      className="cc"
      width={1300}
      title="CHI TIẾT NHẬP HÀNG"
      visible={props.visible}
      onCancel={props.onCancel}
      footer={null}
      
    >
       <Row className={styles.viewContainer}>
        <Col span={20}>
        <Descriptions>
        <Descriptions.Item label="Mã hóa đơn nhập"> { props.importDetails?.importId}</Descriptions.Item>
            <Descriptions.Item label="Email người nhập"> { props.importDetails?.emailImporter}</Descriptions.Item>
            <Descriptions.Item label="Ngày nhập">
              {props.importDetails?.createdAt}
            </Descriptions.Item>
            <Descriptions.Item label="Tổng giá trị">
              {moneyConverter( props.importDetails?.totalPrice)}
            </Descriptions.Item>
    
          </Descriptions>
        </Col>
        <Col span={1} offset={2}>
          <Button
            className={styles.buttonExport}
            onClick={() => pdfpreview(props)}
          >
            Export
          </Button>
        </Col>
        <Col span={19} offset={4} className={styles.inforContainer}>
          <span style={{ marginBottom: '20px' }} className={styles.subtitle}>
            Danh sách hàng:
          </span>
      <Table 
      columns={columns} 
      dataSource={data} 
      pagination={{ position: ['none', 'none'] }} 
      scroll={{ y: 400 }}
      bordered>

      </Table>
      </Col>
      </Row>
    </Modal>
  );
};

export default ViewImportDetail;
