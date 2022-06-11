import React, { useState } from 'react';
import styles from './styles.less';
import { connect, useSelector } from 'dva';
import axios from 'axios';
import {
  Affix,
  Form,
  Upload,
  Row,
  Col,
  Input,
  Typography,
  Button,
  message,
  AutoComplete,
  Modal,
} from 'antd';
import { InboxOutlined, UploadOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { router } from 'umi';
import { uploader } from '../../../Utils/uploader';
const normFile = e => {
  console.log('Upload event:', e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
const uploadButton = (
  <div>
    <PlusOutlined className={styles.upload_image} />
  </div>
);
const CreateProduct = props => {
  const { dispatch } = props;
  let productTemp = {
    product_id: 2,
    product_name: '',
    image_file: null,
    image_url: '',
    brand_id: 0,
    description: '',
    category_id: 0,
    variants: [],
  };
  const categories = useSelector(state => state.category.categories);
  const brands = useSelector(state => state.brands.brands);
  const [state, setState] = useState({
    newProduct: productTemp,
    fileOptionList: [],
    optionsCate: [],
    optionsBrands: [],
    isSelectCate: false,
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    variant: {
      sku: '',
      price: '',
      image_file: [],
      image_url: '',
      options: [],
    },
  });

  const [form] = Form.useForm();
  const { TextArea } = Input;
  const { Title } = Typography;

  const searchResultCate = value => {
    let result = categories.filter(item =>
      item.categoryName.toUpperCase().includes(value.toUpperCase()),
    );
    return result.map((item, index) => {
      return {
        value: item.categoryName,
        label: <span>{item.categoryName}</span>,
      };
    });
  };
  const handleSearchCate = value => {
    setState({
      ...state,
      optionsCate: value ? searchResultCate(value) : [],
    });
  };
  const onSelectCate = value => {
    let result = categories.find(item => item.categoryName.toUpperCase() === value.toUpperCase());
    let temp = state.variant;
    temp.options = result.options;
    temp.options.forEach(item => {
      item['option_image'] = [];
      item['image_url'] = '';
      item['option_value'] = '';
    });
    let product = JSON.parse(JSON.stringify(state.newProduct));
    product.variants = [];
    product.category_id = result.categoryId;
    setState({
      ...state,
      isSelectCate: true,
      variant: temp,
      newProduct: product,
    });
  };
  const searchResultBrand = value => {
    let result = brands.filter(item =>
      item.brandName.toUpperCase().includes(value.toUpperCase()),
    );
    return result.map((item, index) => {
      return {
        value: item.brandName,
        label: <span>{item.brandName}</span>,
      };
    });
  }
  const handleSearchBrand = value => {
    setState({
      ...state,
      optionsBrands: value ? searchResultBrand(value) : [],
    });
  }
  const onSelectBrand = value => {
    let result = brands.find(item => item.brandName.toUpperCase() === value.toUpperCase());
    let product = JSON.parse(JSON.stringify(state.newProduct));
    product.brand_id = result.brandId;
    setState({
      ...state,
      newProduct: product,
    });
  }
  const onClickAddVariant = () => {
    if (!state.isSelectCate) {
      message.warning('Vui lòng chọn loại sản phẩm!');
    } else {
      let temp = state.newProduct;
      let arr = state.newProduct.variants;
      arr.push(state.variant);
      temp.variants = arr;
      setState({
        ...state,
        newProduct: temp,
      });
    }
  };
  const onDelete = index => {
    let temp = state.newProduct;
    let arr = state.newProduct.variants;
    arr.splice(index, 1);
    temp.variants = arr;
    setState({
      ...state,
      newProduct: temp,
    });
    onFill();
  };
  const handlePreview = async file => {
    console.log(file);
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setState({
      ...state,
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };
  const  handleChangeImageOption = async (fileList, infor) => {
    var index = parseInt(infor.slice(-1));
    var field = infor.slice(7, -1);
    console.log(index, field);
    var product = JSON.parse(JSON.stringify(state.newProduct));
    var variants = JSON.parse(JSON.stringify(product.variants));
    console.log(variants);
    for (var option of variants[index].options) {
      if (option.optionName === field) {  
        option.option_image = fileList.fileList;
        if( option.option_image.length > 0) {
        //option.option_image[0].status = 'done';
        handleUploadOptionImage(field ,index ,fileList.file.originFileObj);
        }
      }
    }
    product.variants = variants;
    setState({
      ...state,
      newProduct: product,
    });
  };
   const handleUploadOptionImage = async (field, index, file) =>  {
    var product = JSON.parse(JSON.stringify(state.newProduct));
    var variants = JSON.parse(JSON.stringify(product.variants));
    for (var option of variants[index].options) {
      if (option.optionName === field) {  
        option.image_url = await uploader(file);
       // option.option_image[0].thumbUrl = option.image_url ;
      }
    }
    product.variants = variants;
    setState({
      ...state,
      newProduct: product,
    });
    await uploader(file)
   }
  const handleCancel = () => {
    setState({ ...state, previewVisible: false });
  };
  const onFill = () => {
    var product = state.newProduct;
    var formfill = {};
    product.variants.forEach((variant, index) => {
      if (variant.sku !== '') {
        let field = 'variant_sku' + index;
        formfill[field] = variant.sku;
      }
      if (variant.price !== '') {
        let field = 'variant_price' + index;
        formfill[field] = variant.price;
      }
      variant.options.forEach(option => {
        let field = 'option_' + option.option_name + index;
        let fieldImage = 'image_option' + option.option_image + index;
        formfill[field] = option.option_value;
        formfill[fieldImage] = option.option_image;
      });
    });
    form.setFieldsValue(formfill);
  };
  const onValuesChange = values => {
    let flagEdit = false;
    const field = Object.keys(values)[0];
    var product = state.newProduct;

    if (field === 'product_name') {
      flagEdit = true;
      product.product_name = values[field];
    }
    if (field === 'description') {
      flagEdit = true;
      product.description = values[field];
    }
    if (field.slice(0, 7) === 'variant') {
      flagEdit = true;
      let index = parseInt(field.slice(-1));
      product.variants[index][field.slice(8, -1)] = values[field];
    }
    if (field.slice(0, 6) === 'option') {
      flagEdit = true;
      let index = parseInt(field.slice(-1));
      product.variants[index].options.forEach(option => {
        if (option.optionName === field.slice(7, -1)) {
          option.option_value = values[field];
        }
      });
    }
    // if(field.slice(0,5) === 'image') {
    //      let index = parseInt(field.slice(-1))
    //      product.variants[index].options.forEach(option => {
    //       if (option.option_name === field.slice(13, -1)) {
    //         option.option_image = values[field];
    //       }
    //     });
    //}
    if (flagEdit) {
      setState({
        ...state,
        newProduct: product,
      });
    }
    console.log(state.newProduct);
  };
  const setImageProduct = async file => {
    console.log(file);
    var product = JSON.parse(JSON.stringify(state.newProduct));
    product.image_url = await uploader(file.file.originFileObj)
    product.image_file = file.file;
  
    setState({
      ...state,
      newProduct: product,
    });
  };
  const setImageVariant =  (file, index) => {

    var product = JSON.parse(JSON.stringify(state.newProduct));
    product.variants[index].image_file = file.fileList;
    handleUploadImageVariant(file.file.originFileObj, index);
    setState({
      ...state,
      newProduct: product,
    });
    console.log(state.newProduct);
  };
  const handleUploadImageVariant = async (file, index)  => {
    var product = JSON.parse(JSON.stringify(state.newProduct));
    product.variants[index].image_url = await uploader(file);
    setState({
      ...state,
      newProduct: product,
    });

  };
  // validation before submit
  const validator = product => {
    let show = false;
    let result = true;
    if (product.brand_id < 1) {
      message.error(`ID thương hiệu sản phẩm không tồn tại`);
      result = false;
    }
    if (product.category_id < 1 && !show) {
      message.error(`ID phân loại sản phẩm không tồn tại`);
      result = false;
      show = true;
    }
    if (product.variants.length < 1 && !show) {
      message.error(`Thêm ít nhất một phiên bản`);
      result = false;
      show = true;
    }
    product.variants.forEach((variant, index) => {
      variant.options.forEach(option => {
        if (option.option_image.length < 1) {
          if (!show) {
            message.error(`Vui lòng thêm hình ảnh minh họa cho ${option.optionName}`);
            show = true;
            result = false;
          }
        }
      });
    });
    return result;
  };
  //submit
  const onFinish = async values => {
    const validatedAllFields = await form.validateFields();
    if (validator(state.newProduct)) {
      dispatch({
        type: 'products/addProduct',
        payload: state.newProduct,
      });
      console.log(state.newProduct);
    }
  };
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
        layout="vertical"
        form={form}
        autoComplete="off"
        onFinish={onFinish}
        className={styles.container}
        onValuesChange={onValuesChange}
      >
        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }]}>
          <Col span={6}>
            <Affix offsetTop={70}>
              <Title className={styles.title}>THÊM SẢN PHẨM MỚI</Title>
            </Affix>
          </Col>
          <Col span={5} offset={13}>
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
                <Col span={24}>
                  <Form.Item className={styles.formItems} label="TÊN SẢN PHẨM">
                    <Form.Item
                      name="product_name"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng điền tên sản phẩm!',
                        },
                      ]}
                    >
                      <Input className={styles.inputItems} />
                    </Form.Item>
                  </Form.Item>
                </Col>
                <Col span={13}>
                  <Form.Item className={styles.formItems} label="LOẠI SẢN PHẨM">
                    <Form.Item
                      name="product_category"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng điền loại sản phẩm!',
                        },
                      ]}
                    >
                      <AutoComplete
                        className="complete"
                        options={state.optionsCate}
                        onSelect={onSelectCate}
                        onSearch={handleSearchCate}
                      />
                    </Form.Item>
                  </Form.Item>
                </Col>
                <Col span={11}>
                  <Form.Item className={styles.formItems} label="THƯƠNG HIỆU">
                    <Form.Item
                      name="product_brand"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng điền thương hiệu sản phẩm!',
                        },
                      ]}
                    >
                       <AutoComplete
                        className="complete"
                        options={state.optionsBrands}
                        onSelect={onSelectBrand}
                        onSearch={handleSearchBrand}
                      />
                    </Form.Item>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item className={styles.formItems} label="MÔ TẢ" name="description">
                    <TextArea className={styles.inputItems} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item className={styles.formItems} label="HÌNH ẢNH CHÍNH">
                    <Form.Item
                      className={styles.formItems}
                      name="product_image"
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                      noStyle
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng thêm hình ảnh sản phẩm!',
                        },
                      ]}
                    >
                      <Upload.Dragger
                        name="files"
                        action="/upload.do"
                        onChange={file => setImageProduct(file)}
                      >
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
          <Col span={14}>
            <Row gutter={[{ xs: 8, sm: 16, md: 24 }]}>
              {state.newProduct.variants.map((item, index) => {
                let name_image = 'image_variant' + index;
                return (
                  <Col span={24} className={styles.variantContainer}>
                    <Row gutter={[{ xs: 8, sm: 16, md: 24 }]}>
                      {Object.entries(item).map(key => {
                        let label = 'variant_' + key[0] + index;
                        if (key.includes('sku'))
                          return (
                            <Col span={24}>
                              <Row>
                                <Col span={23}>
                                  <Form.Item className={styles.formItems} label="TÊN PHIÊN BẢN">
                                    <Form.Item
                                      name={label}
                                      rules={[
                                        {
                                          required: true,
                                          message: 'Vui lòng điền mã nhập sản phẩm!',
                                        },
                                      ]}
                                    >
                                      <Input className={styles.inputVariantName} />
                                    </Form.Item>
                                  </Form.Item>
                                </Col>
                                <Col span={1}>
                                  <CloseOutlined
                                    className={styles.iconDelete}
                                    onClick={() => onDelete(index)}
                                  />
                                </Col>
                              </Row>
                            </Col>
                          );

                        if (key.includes('price'))
                          return (
                            <Col span={10}>
                              <Form.Item className={styles.formItems} label="Giá bán">
                                <Form.Item
                                  name={label}
                                  rules={[
                                    {
                                      pattern: /^(?:\d*)$/,
                                      message: 'Vui lòng nhập số',
                                    },
                                    {
                                      max: 10,
                                      message: 'Tối đa 10 kí tự',
                                    },
                                    {
                                      required: true,
                                      message: 'Vui lòng nhập giá bán!',
                                    },
                                  ]}
                                >
                                  <Input className={styles.inputVariantItems} />
                                </Form.Item>
                              </Form.Item>
                            </Col>
                          );
                        if (key.includes('options')) {
                          let temp = key[1];
                          return (
                            <Col span={24}>
                              <Row>
                                {temp.map(option => {
                                  let label = 'option_' + option.optionName + index;
                                  let label_image = 'image_option_' + option.optionName + index;
                                  return (
                                    <>
                                      <Col span={9}>
                                        <Form.Item
                                          className={styles.formItems}
                                          label={option.optionName}
                                        >
                                          <Form.Item
                                            className={styles.formItems}
                                            rules={[
                                              {
                                                required: true,
                                                message: 'Vui lòng nhập ' + option.optionName + '!',
                                              },
                                            ]}
                                            name={label}
                                          >
                                            <Input className={styles.inputVariantItems} />
                                          </Form.Item>
                                        </Form.Item>
                                      </Col>
                                      <Col span={1}>
                                        <Form.Item name={label_image}>
                                          <Upload
                                            className="upload_card"
                                            listType="picture-card"
                                           // fileList={option.option_image}
                                            maxCount={1}
                                            onPreview={handlePreview}
                                            onChange={file => handleChangeImageOption(file, label)}
                                          >
                                            {option.option_image.length > 0 ? null : uploadButton}
                                          </Upload>

                                          <Modal
                                            visible={state.previewVisible}
                                            footer={null}
                                            onCancel={handleCancel}
                                          >
                                            <img
                                              alt="example"
                                              style={{ width: '100%' }}
                                              src={state.previewImage}
                                            />
                                          </Modal>
                                        </Form.Item>
                                      </Col>
                                    </>
                                  );
                                })}
                              </Row>
                            </Col>
                          );
                        }
                      })}
                      <Col span={24}>
                        <Form.Item className={styles.formItems} label="Hình ảnh phiên bản">
                          <Form.Item
                            name={name_image}
                            rules={[
                              {
                                required: true,
                                message: 'Vui lòng thêm hình ảnh!',
                              },
                            ]}
                          >
                            <Upload
                             // fileList={item.image_file}
                              listType="picture"
                              maxCount={1}
                              onChange={file => setImageVariant(file, index)}
                            >
                              <Button
                                className={styles.uploader}
                                size="middle"
                                icon={<UploadOutlined />}
                              >
                                Image
                              </Button>
                            </Upload>
                          </Form.Item>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default connect()(CreateProduct);
