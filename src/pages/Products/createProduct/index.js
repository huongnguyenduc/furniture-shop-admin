import React, {useState} from 'react';
import styles from './styles.less';
import { connect, useSelector } from 'dva';
import {Affix, Form, Upload, Row, Col, Input, Typography, Button, InputNumber } from 'antd';
import { InboxOutlined,UploadOutlined,CloseOutlined } from '@ant-design/icons';
import { router } from 'umi';
const normFile = e => {
  console.log('Upload event:', e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};
const CreateProduct = props => {
  const { dispatch } = props;
  let productTemp = {
    product_id: 2,
    product_name: 'HUY NÈ', 
    url: '',
    brand_id: 0,
    brand_name: '',
    category_id: 0, 
    category_name: '',
    variants : []
  };
  let variant ={
    name:'',
    price: '',
  }
  const categories = useSelector(state => state.category.categories);
  categories[0].options.forEach(element => {
    variant[element] = '';
  });
  productTemp.variants.push(variant);
  const [newProduct, setnewProduct] = useState(productTemp);
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const { Title } = Typography;
  const onClickAddVariant = () => {
    let arr = newProduct.variants;
    arr.push(variant);
    setnewProduct({
      ...newProduct,
      variants: arr
    });
    console.log(arr);
  };
  const onDelete =  (item) => {

  }
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
          <Col span={6}>
            <Affix offsetTop={70}>
              <Title className={styles.title}>THÊM SẢN PHẨM MỚI</Title>
            </Affix>
          </Col>
          <Col span ={5} offset={13}>
          <Button
                    type="primary"
                    className={styles.buttonAddVariant}
                    size="medium"
                     onClick={onClickAddVariant}
                    // loading={isLoading}
                  >
                    Thêm phiên bản
            </Button>
          </Col>
          <Col span={9}>
          <Affix offsetTop={130}>
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
              <Input className={styles.inputItems} />
            </Form.Item>
            </Col>
            <Col span={13}>
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
              <Input  className={styles.inputItems} />
            </Form.Item>
          </Col>
          <Col span={11}>
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
              <Input className={styles.inputItems} />
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
              <TextArea className={styles.inputItems} />
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
                    Hoàn tất
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Affix>
          </Col>
          <Col span={14}>
            <Row gutter={[{ xs: 8, sm: 16, md: 24 }]}>
            {newProduct.variants.map((item, index) => {
              return (
                <Col span={24} className={styles.variantContainer}>
                <Row gutter={[{ xs: 8, sm: 16, md: 24 }]}>
                  { Object.entries(item).map((key, value) => {
                  let label = key +index;
                  let temp = key.toString().toUpperCase().replace(/,/,'')
                  if(key.includes('name')) 
                  return (
                    <Col span={24}>
                      <Row> 
                        <Col span={23}>
                          <Form.Item
                          className={styles.formItems}
                          label="TÊN PHIÊN BẢN"
                          name={label}
                          rules={[
                          {
                            required: true,
                            message: 'Vui lòng điền thương hiệu sản phẩm!',
                          },
                          ]}
                          >
                            <Input className={styles.inputVariantName} />
                          </Form.Item>
                        </Col>
                      <Col span={1}>
                        <CloseOutlined className={styles.iconDelete} onClick={() => onDelete(item)} />
                      </Col>
                      </Row>
                    </Col>
                  )
                  return(
                    <Col span={10}>
                      <Form.Item
                      className={styles.formItems}
                      label={temp}
                      name={label}
                      rules={[
                      {
                        required: false,
                        message: 'Vui lòng điền thương hiệu sản phẩm!',
                      },
                      ]}
                    >
                        <Input className={styles.inputVariantItems} />
                      </Form.Item>
                    </Col>
                  );
                })}
                  <Col span={24} >
                    <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture"
                    maxCount={1}
                    >
                       <Button className={styles.uploader} size='middle' icon={<UploadOutlined />}>Image</Button>
                    </Upload>
                  </Col>
                </Row>
                </Col>
              )
            })}
            </Row>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateProduct;
