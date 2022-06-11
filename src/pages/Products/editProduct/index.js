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
  AutoComplete,
  Image,
  message,
  Spin,
  Modal,
} from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';

import { router } from 'umi';
import { uploader } from '../../../Utils/uploader';

const EditProduct = props => {
  const { dispatch, loading } = props;
  var pathArray = window.location.pathname.split('/');
  const idProduct = pathArray[pathArray.length - 1];
  const products = useSelector(state => state.products.products);
  var editProduct = products.find(item => item.productId == idProduct);
  console.log(editProduct);
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const { Title } = Typography;
  const [state, setState] = useState({
    newimageUrl: '',
    image: null,
    optionsBrand: [],
    brandId: null,
    previewImage: '',
    previewVisible: true,
    previewTitle: '',
  });
  const brands = useSelector(state => state.brands.brands);
  React.useEffect(() => {
    var formFill = {};
    formFill['name'] = editProduct.productName;
    formFill['description'] = editProduct.productDesc;
    formFill['brand'] = editProduct.brandName;
    setState({
      ...state,
      brandId: editProduct.brandId,
    });
    console.log(formFill);
    form.setFieldsValue(formFill);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var isLoading = false;
  const searchResult = value => {
    let result = brands.filter(item =>
      item.brandName.toUpperCase().includes(value.toUpperCase()),
    );
    console.log(brands);
    return result.map((item, index) => {
      return {
        value: item.brandName,
        label: <span>{item.brandName}</span>,
      };
    });
  };
  const onSelectBrand = value => {
    let result = brands.find(item => item.brandName.toUpperCase() === value.toUpperCase());
    setState({
      ...state,
      brandId: result.brandId,
    });
  };
  const handleSearchBrand = value => {
    setState({
      ...state,
      optionsBrand: value ? searchResult(value) : [],
      brandId: null,
    });
  };
  const setImageProduct = async file => {
    let url = await uploader(file.file.originFileObj);
    setState({
      ...state,
      newimageUrl: url,
    });
  };
  const resetImage = () => {
    setState({
      ...state,
      newimageUrl: '',
    });
  };
  const onFill = () => {
    var formFill = {};
    formFill['name'] = '';
    formFill['description'] = '';
    formFill['brand'] = '';
    form.setFieldsValue(formFill);
  };

  const onFinish = async values => {
    var newCate = {};
    newCate['productId'] = editProduct.productId;
    newCate['brandId'] = editProduct.categoryId;
    newCate['categoryId'] = state.brand != null ? state.brand : editProduct.brandId;
    newCate['productName'] = values.name;
    newCate['productDesc'] = values.description;
    newCate['image'] = state.newimageUrl !== '' ? state.newimageUrl : editProduct.image;
    isLoading = loading.effects['products/editProduct'];
    console.log(newCate);
    dispatch({
      type: 'products/editProduct',
      payload: newCate,
    });
    if (!isLoading) router.goBack();
    onFill();
  };
  return (
    <div>
      <Spin spinning={isLoading}>
        <Form
          name="edit-product"
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
              <Title className={styles.title}>CHỈNH SỬA SẢN PHẨM</Title>
            </Col>
            <Col span={5}>
              <Row>
                <Col span={24} className={styles.imageContainer}>
                  <Image
                    src={state.newimageUrl !== '' ? state.newimageUrl : editProduct.image}
                    className={styles.image}
                  ></Image>
                </Col>
                <Col span={11} offset={2}>
                  <Button onClick={() => resetImage()}>Reset</Button>
                </Col>
                <Col span={4} offset={6}>
                  <Upload
                    maxCount={1}
                    onChange={file => setImageProduct(file)}
                    showUploadList={false}
                  >
                    <Button icon={<UploadOutlined />}></Button>
                  </Upload>
                </Col>
              </Row>
            </Col>
            <Col span={16}>
                <Row gutter={[{ xs: 8, sm: 16, md: 24 }]}>
                  <Col span={12}>
                    <Form.Item
                      className={styles.formItems}
                      label="TÊN SẢN PHẨM"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng điền tên sản phẩm', 
                        },
                      ]}
                    >
                      <Input className={styles.inputItems} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item className={styles.formItems} label="THƯƠNG HIỆU" name="brand">
                      <AutoComplete
                        className="complete"
                        options={state.optionsBrand}
                        onSelect={onSelectBrand}
                        onSearch={handleSearchBrand}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      className={styles.formItems}
                      label="MÔ TẢ SẢN PHẨM"
                      name="description"
                    >
                      <TextArea className={styles.textArea} />
                    </Form.Item>
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

export default connect(state => ({ loading: state.loading }))(EditProduct);
