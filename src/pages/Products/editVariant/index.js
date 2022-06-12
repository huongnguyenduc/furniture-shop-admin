import React, { useState } from 'react';
import styles from './styles.less';
import { connect, useSelector } from 'dva';
import {
  Affix,
  Form,
  Upload,
  Row,
  Col,
  Input,
  Typography,
  Button,
  InputNumber,
  Image,
  message,
  Spin,
  Modal,
} from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';

import { router } from 'umi';
import { uploader } from '../../../Utils/uploader';
const EditVariant = props => {
  const { dispatch, loading } = props;
  var isLoading = false;
  var uploading = false;
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const { Title } = Typography;
  var pathArray = window.location.pathname.split('/');
  const idProduct = pathArray[pathArray.length - 3];
  const idVariant = pathArray[pathArray.length - 1];
  let products = useSelector(state => state.products.products);
  let editProduct;
  let editVariant;
  editProduct = products.find(item => item.productId == idProduct);
  editVariant = editProduct.variants.find(item => (item.variantId == idVariant));
  React.useEffect(() => {
     console.log(editVariant.variantId);
    var formFill = {};
    formFill['name'] = editVariant.sku;
    formFill['quantity'] = editVariant.quantity;
    formFill['price'] = editVariant.price;
    editVariant.options.forEach(item => {
      formFill[item.optionName] = item.optionValue;
    });
    console.log(formFill);
    form.setFieldsValue(formFill);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(editVariant.variantId);
  const [state, setState] = useState({
    newimageUrl: '',
    image: null,
  });
  const resetImage = () => {
    setState({
      ...state,
      newimageUrl: '',
    });
  };
  const setImageVariant = async file => {
    uploading = true;
    let url = await uploader(file.file.originFileObj);
    uploading = false;
    setState({
      ...state,
      newimageUrl: url,
    });
  };
  const onFinish = values => {
    isLoading = loading.effects['products/editVariant'];
    const { name, price, quantity } = values;
    if (name !== undefined && name !== '') editVariant.sku = name;
    if (price !== undefined) editVariant.price = price;
    if (quantity !== undefined) editVariant.quantity = parseInt(quantity);
    if (state.newimageUrl !== '') editVariant.image = state.newimageUrl;
    editVariant.options.forEach(item => {
      if (values[item.optionName] !== undefined) item.optionValue = values[item.optionName];
    });
    console.log(values);
    console.log(editVariant);
    dispatch({
      type: 'products/editVariant',
      payload: editVariant,
    });
    if (!isLoading) router.goBack();
  };
  return (
    <div>
      <Spin spinning={isLoading}>
        <Form
          name="edit-variant"
          labelCol={{
            span: 12,
          }}
          wrapperCol={{
            span: 24,
          }}
          layout="vertical"
          form={form}
          onFinish={onFinish}
          autoComplete="off"
          className={styles.container}
        >
          <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }]}>
            <Col span={24}>
              <Title className={styles.title}>CHỈNH SỬA PHÂN LOẠI</Title>
            </Col>
            <Col span={5}>
              <Row>
                <Col span={24} className={styles.imageContainer}>
                  <Spin spinning={uploading}>
                    <Image
                      src={state.newimageUrl !== '' ? state.newimageUrl : editVariant.image}
                      className={styles.image}
                    ></Image>
                  </Spin>
                </Col>
                <Col span={11} offset={2}>
                  <Button onClick={() => resetImage()}>Reset</Button>
                </Col>
                <Col span={4} offset={6}>
                  <Upload
                    maxCount={1}
                    onChange={file => setImageVariant(file)}
                    showUploadList={false}
                  >
                    <Button icon={<UploadOutlined />}></Button>
                  </Upload>
                </Col>
              </Row>
            </Col>
            <Col span={16}>
              <Row gutter={[{ xs: 8, sm: 16, md: 24 }]}>
                <Col span={23} offset={1}>
                  <Form.Item className={styles.formItems} label="TÊN PHIÊN BẢN">
                  <Form.Item name="name"
                   rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập tên!',
                    },
                    {
                      max: 50,
                      message: 'Tối đa 50 kí tự',
                    },
                  ]}
                    >
                    <Input className={styles.inputItems} />
                  </Form.Item>
                  </Form.Item>
                </Col>
                <Col span={11} offset={1}>
                  <Form.Item className={styles.formItems} label="GIÁ BÁN">
                  <Form.Item name="price"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập giá!',
                    },
                    {
                      pattern: /^(?:\d*)$/,
                      message: 'Vui lòng nhập số',
                    },
                    {
                      max: 10,
                      message: 'Tối đa 10 kí tự',
                    },
                  ]}
                  >
                    <Input
                      className={styles.inputNumberItems}
                    />
                  </Form.Item>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item className={styles.formItems} label="SỐ LƯỢNG">
                    <Form.Item
                      name="quantity"
                    >
                      <Input disabled className={styles.inputNumberItems} />
                    </Form.Item>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Title className={styles.subtitle}>CHỈNH SỬA THUỘC TÍNH</Title>
                </Col>
                <Col span={24}>
                  <Row>
                    {editVariant.options.map((item, index) => {
                      return (
                        <Col span={11} offset={1}>
                          <Form.Item
                            className={styles.formItems}
                            label={item.optionName}>
                            <Form.Item name={item.optionName}
                             rules={[
                              {
                                required: true,
                                message: `Vui lòng nhập ${item.optionName}`,
                              },
                              {
                                max: 50,
                                message: 'Tối đa 50 kí tự',
                              },
                            ]}
                            >
                            <Input className={styles.inputItems} />
                          </Form.Item>
                          </Form.Item>
                        </Col>
                      );
                    })}
                  </Row>
                </Col>
                <Col span={4} offset={15}>
                  <Form.Item>
                    <Button
                      className={styles.myButtonCancel}
                      onClick={() => {
                        router.goBack();
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
                      htmlType="submit"
                      // onClick={handleAllFields}
                      // loading={isLoading}
                    >
                      Hoàn tất
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Spin>
    </div>
  );
};

export default connect(state => ({ loading: state.loading }))(EditVariant);
