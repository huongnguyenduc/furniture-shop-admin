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
  const products = useSelector(state => state.products.products);
  const editProduct = products.find(item => item.productId == idProduct);
  let editVariant = editProduct.variants.find(item => (item.variantId = idVariant));
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
    const {name, price, quantity} = values;
    if(name !== undefined && name !== '') editVariant.sku = name;
    if(price !== undefined) editVariant.price = price;
    if(quantity !== undefined) editVariant.quantity = quantity;
    if(state.newimageUrl !== '') editVariant.image = state.newimageUrl;
    editVariant.options.forEach((item) => {
      if(values[item.optionName] !== undefined) item.optionValue = values[item.optionName];
    })
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
                <Col span={24} className={styles.imageContainer} >
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
              <Affix offsetTop={130}>
                <Row gutter={[{ xs: 8, sm: 16, md: 24 }]}>
                  <Col span={23} offset={1}>
                    <Form.Item
                      className={styles.formItems}
                      label="TÊN SẢN PHIÊN BẢN"
                      name="name"
                    >
                      <Input defaultValue={editVariant.sku} className={styles.inputItems} />
                    </Form.Item>
                  </Col>
                  <Col span={11}  offset={1}>
                    <Form.Item className={styles.formItems} label="GIÁ BÁN" name="price">
                      <InputNumber 
                      defaultValue={editVariant.price} 
                      className={styles.inputNumberItems}
                      min={1000} 
                      formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item className={styles.formItems} label="SỐ LƯỢNG" name="quantity">
                      <InputNumber 
                      defaultValue={editVariant.quantity} 
                      className={styles.inputNumberItems} 
                      min={0} 
                      formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}/>
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
                              label={item.optionName}
                              name={item.optionName}
                            >
                              <Input defaultValue={item.optionValue} className={styles.inputItems} />
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
              </Affix>
            </Col>
          </Row>
        </Form>
      </Spin>
    </div>
  );
};

export default  connect(state => ({ loading: state.loading })) (EditVariant);
