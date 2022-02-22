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
            <Title>Thêm sản phẩm mới</Title>
          </Col>
          <Col span={10}>
            <Form.Item
              label="TÊN SẢN PHẨM"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng điền tên sản phẩm!',
                },
              ]}
            >
              <Input placeholder="Tên sản phẩm" />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item
              label="LOẠI SẢN PHẨM"
              name="category"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng điền loại sản phẩm!',
                },
              ]}
            >
              <Input placeholder="Loại sản phẩm" />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item
              label="THƯƠNG HIỆU"
              name="brand"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng điền loại sản phẩm!',
                },
              ]}
            >
              <Input placeholder="Loại sản phẩm" />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              label="MÔ TẢ"
              name="description"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng điền mô tả sản phẩm!',
                },
              ]}
            >
              <TextArea placeholder="Mô tả sản phẩm" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label="SỐ LƯỢNG"
              name="quantity"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng điền mô tả sản phẩm!',
                },
              ]}
            >
              <InputNumber
                defaultValue={10}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item
              className={styles.formItems}
              label="GIÁ NHẬP"
              name="orignalPrice"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng điền mô tả sản phẩm!',
                },
              ]}
            >
              <InputNumber
                defaultValue={1000}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item
              label="GIÁ BÁN"
              name="price"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng điền mô tả sản phẩm!',
                },
              ]}
            >
              <InputNumber
                defaultValue={1000}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item label="HÌNH ẢNH">
              <Form.Item
                name="dragger"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                noStyle
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng điền mô tả sản phẩm!',
                  },
                ]}
              >
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
          <Col span={10}>
            <Row>
              <Col span={24}>
                <Form.Item
                  label="CHẤT LIỆU"
                  name="material"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng điền chất liệu sản phẩm!',
                    },
                  ]}
                >
                  <Input placeholder="Chất liệu" />
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
