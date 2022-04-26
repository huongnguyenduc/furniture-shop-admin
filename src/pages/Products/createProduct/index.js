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
  message,
  AutoComplete,
  Modal,
} from 'antd';
import { InboxOutlined, UploadOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { router } from 'umi';
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
    product_name: 'HUY NÈ',
    url: '',
    brand_id: 0,
    brand_name: '',
    category_id: 0,
    category_name: '',
    variants: [],
  };
  const categories = useSelector(state => state.category.categories);
  const [state, setState] = useState({
    newProduct: productTemp,
    fileOptionList: [],
    optionsCate: [],
    isSelectCate: false,
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    variant: {
      sku: '',
      price: '',
      options: [],
    },
  });

  const [form] = Form.useForm();
  const { TextArea } = Input;
  const { Title } = Typography;

  const searchResult = value => {
    let result = categories.filter(item => item.name.toUpperCase().includes(value.toUpperCase()));
    return result.map((item, index) => {
      return {
        value: item.name,
        label: <span>{item.name}</span>,
      };
    });
  };
  const handleSearch = value => {
    setState({
      ...state,
      optionsCate: value ? searchResult(value) : [],
    });
  };
  const onSelect = value => {
    let result = categories.find(item => item.name.toUpperCase() === value.toUpperCase());
    let temp = state.variant;
    temp.options = result.options;
    temp.options.forEach(item => {
      item['option_image'] = [];
      item['option_value'] = '';
    });
    let product = state.newProduct;
    product.variants = [];
    setState({
      ...state,
      isSelectCate: true,
      variant: temp,
      newProduct: product,
    });
  };
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
  const handleChange = (fileList, infor) => {
     var index = parseInt(infor.slice(-1));
     var field = infor.slice(7,-1);
     console.log(index,field)
     var product = state.newProduct;
     var variants  = product.variants
    console.log(variants)
    for(var option of variants[index].options) {
      if (option.option_name === field) {
        option.option_image = fileList.fileList;
        console.log(variants)
        console.log('ccccccccccc')
       }
    }
    //  variants[index].options.forEach((option) => {
    //    if (option.option_name === field) {
    //     option.option_image = fileList.fileList;
    //     console.log(variants)
    //    }
    // });
     console.log(product.variants)
   //  product.variants[1] = product_variant;
    // setState({
    //   ...state,
    //   newProduct: product,
    // });
  };

  const handleCancel = () => {
    setState({ ...state, previewVisible: false });
  };
  const onFinish = values => {
    console.log(values);
  };
  const onfieldsChange = values => {
  //  console.log(values);
  };
  const onFill = () => {
    var product = state.newProduct;
    var formfill = {};
    product.variants.forEach( (variant,index) => {
      if(variant.sku !=='') {
          let field = 'variant_sku'+index;
          formfill[field] = variant.sku
      }
      if(variant.price !== '') {
        let field = 'variant_price'+index;
        formfill[field] = variant.price
      }
      variant.options.forEach((option) => {
        let field = 'option_'+option.option_name+index
        let fieldImage = 'image_option'+option.option_image+index
        formfill[field] = option.option_value;
        formfill[fieldImage] = option.option_image;
      })
    })
    console.log(formfill)
    form.setFieldsValue(formfill);
  }
  const onValuesChange = values => {
    let flagEdit = false;
    const field = Object.keys(values)[0];
    var product = state.newProduct;
    if (field.slice(0, 7) === 'variant') {
      flagEdit = true;
      let index = parseInt(field.slice(-1));
      product.variants[index][field.slice(8, -1)] = values[field];
    }
    if (field.slice(0, 6) === 'option') {
      flagEdit = true;
      let index = parseInt(field.slice(-1));
      product.variants[index].options.forEach(option => {
        if (option.option_name === field.slice(7, -1)) {
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
    console.log(values);
    console.log(product);
    if(flagEdit) {
    setState({
      ...state,
      newProduct: product,
    });
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
        onFieldsChange={onfieldsChange}
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
                        onSelect={onSelect}
                        onSearch={handleSearch}
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
                      <Input className={styles.inputItems} />
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
                let name_image = 'variant_image' + index;
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
                                  let label = 'option_' + option.option_name + index;
                                  let label_image = 'image_option_' + option.option_name + index;
                                  return (
                                    <>
                                      <Col span={9}>
                                        <Form.Item
                                          className={styles.formItems}
                                          label={option.option_name}
                                          name={label}
                                        >
                                          <Input className={styles.inputVariantItems} />
                                        </Form.Item>
                                      </Col>
                                      <Col span={1}>
                                        <Form.Item noStyle name={label_image}>
                                          <div className={styles.upload_image_container}>
                                            <Upload
                                              className="upload_card"
                                              action="/upload.do"
                                              listType="picture-card"
                                              fileList={option.option_image}
                                              maxCount={1}
                                              onPreview={handlePreview}
                                              onChange={fileList => handleChange(fileList, label)}
                                            >
                                              {option.option_image.length >= 1
                                                ? null
                                                : uploadButton}
                                            </Upload>
                                          </div>
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
                            <Upload listType="picture" maxCount={1}>
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

export default CreateProduct;
