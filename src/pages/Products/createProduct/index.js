import React from 'react';
import styles from './styles.less';
import { Form, Upload, Row, Col, Input, Typography, Button, InputNumber } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { router } from 'umi';
const normFile = e => {
  console.log('Upload event:', e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};
const CreateProduct = () => {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const { Title } = Typography;
  return (
    <div>
      <Form
        name="create-product"
        labelCol={{
          span: 12,
        }}
        wrapperCol={{
          span: 24,
        }}
        initialValues={{
          description: '',
          multiSubmission: true,
          sponsors: [],
        }}
        layout="vertical"
        form={form}
        autoComplete="off"
        className={styles.container}
      >
        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }]}>
          <Col span={24}>
            <Title className={styles.title}>THÊM SẢN PHẨM MỚI</Title>
          </Col>
          <Col span={10}>
            <Row gutter={[{ xs: 8, sm: 16, md: 24 }]}>
            <Col span ={24}>
            <Form.Item
              className={styles.formItems}
              label="TÊN SẢN PHẨM"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng điền tên sản phẩm!',
                },
              ]}
            >
              <Input className={styles.inputItems} placeholder="Tên sản phẩm" />
            </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item
              className={styles.formItems}
              label="LOẠI SẢN PHẨM"
              name="category"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng điền loại sản phẩm!',
                },
              ]}
            >
              <Input  className={styles.inputItems} placeholder="Loại sản phẩm" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              className={styles.formItems}
              label="THƯƠNG HIỆU"
              name="brand"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng điền thương hiệu sản phẩm!',
                },
              ]}
            >
              <Input className={styles.inputItems} placeholder="Thương hiệu" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              className={styles.formItems}
              label="MÔ TẢ"
              name="description"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng điền mô tả sản phẩm!',
                },
              ]}
            >
              <TextArea className={styles.inputItems} placeholder="Mô tả sản phẩm" />
            </Form.Item>
          </Col>
          <Col span={24}>
          <Form.Item 
          className={styles.formItems}
          label="HÌNH ẢNH CHÍNH">
            <Form.Item 
                className={styles.formItems}
                name="dragger"  
                valuePropName="fileList" 
                getValueFromEvent={normFile} noStyle 
                rules={[
                {
                  required: true,
                  message: 'Vui lòng thêm hình ảnh sản phẩm!',
                },
              ]}>
                <Upload.Dragger name="files" action="/upload.do">
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                </Upload.Dragger>
              </Form.Item>
            </Form.Item>
          </Col>
          <Col span={4} offset={15}>
                <Form.Item>
                  <Button
                    className={styles.myButton}
                    onClick={() => {
                      router.push('/products');
                    }}
                    size="large"
                    htmlType="button"
                  >
                    Hủy
                  </Button>
                </Form.Item>
              </Col>
              <Col span={3}>
                <Form.Item>
                  <Button
                    type="primary"
                    className={styles.myButton}
                    size="large"
                    // onClick={handleAllFields}
                    // loading={isLoading}
                  >
                    Thêm mới
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateProduct;
