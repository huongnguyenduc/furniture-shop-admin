import React, { useState } from 'react';
import { connect, useSelector } from 'dva';
import styles from './styles.less';
import {
  Form,
  Row,
  Col,
  Affix,
  Input,
  Typography,
  Image,
  Button,
  InputNumber,
  AutoComplete,
  Spin,
} from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import { router } from 'umi';
import ItemSearch from '../../../components/imports/ItemSearch';
import VariantModal from '../../../components/imports/VariantModal';

const searchResult = (arr, query) => {
  let products = arr.filter(product =>
    product.productName.toUpperCase().includes(query.toUpperCase()),
  );

  return products.map(item => {
    return {
      variants: item.variants,
      value: item.productName,
      label: <ItemSearch url={item.image} name={item.productName} />,
    };
  });
};

const NewImport = props => {
  const { dispatch, loading } = props;
  React.useEffect(() => {
    dispatch({
      type: 'products/getProductList',
    });
  }, [dispatch]);

  const isLoading = loading.effects['products/getProductList'];
  const products = useSelector(state => state.products.products);
  const profile = useSelector(state => state.profile.account);
  var today = new Date();
  let month = (today.getMonth() + 1);
  if (month < 10) month = '0'+month;
  var date = today.getDate() + '-' + month + '-' + today.getFullYear();
  const [options, setOptions] = useState([]);
  const [variants, setVariants] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [importItems, setImportItems] = useState([]);

  const handleOk = index => {
    const item = {
      url: variants.at(index).image,
      sku: variants.at(index).sku,
      variant_id: variants.at(index).variantId,
    };

    importItems.push(item);

    setImportItems(importItems);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSearch = value => {
    setOptions(value ? searchResult(products, value) : []);
  };

  const onSelect = (_value, option) => {
    setVariants(option.variants);
    setIsModalVisible(true);
  };

  const onDelete = item => {
    setImportItems(items => items.filter(product => product.variant_id !== item.variant_id));
  };

  const onFinish = values => {
    const importDto = {
      importDesc: '',
      totalPrice: 0,
      importDetails: [],
    };

    importItems.forEach((item, index) => {
      const origanal_price = document.getElementById(`create_import_origanal_price_${index}`).value;
      const quantity = document.getElementById(`create_import_quantity_${index}`).value;

      importDto.importDetails.push({
        variantId: item.variant_id,
        quantity: parseInt(quantity),
        price: parseInt(origanal_price),
      });

      importDto.totalPrice += parseInt(quantity) * parseInt(origanal_price);
    });

    importDto.importDesc = document.getElementById(`create_import_decription`).innerHTML;

    console.log(importDto);

    dispatch({
      type: 'imports/createImport',
      payload: importDto,
    });
  };

  const [form] = Form.useForm();
  const { TextArea } = Input;
  const { Title } = Typography;
  return (
    <div>
      <Spin spinning={isLoading}>
        <Form
          name="create_import"
          labelCol={{
            span: 12,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            description: '',
            total: 0,
          }}
          layout="vertical"
          form={form}
          autoComplete="off"
          className={styles.container}
          onFinish={onFinish}
        >
          <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }]}>
            <Col span={24}>
              <Affix offsetTop={70}>
                <Title className={styles.title}>THÊM PHIẾU NHẬP MỚI</Title>
              </Affix>
            </Col>
            <Col span={10}>
              <Affix offsetTop={130}>
                <Row gutter={[{ xs: 8, sm: 16, md: 24 }]}>
                  <Col span={24}>
                    <Title className={styles.subTitle}>THÔNG TIN CHUNG</Title>
                  </Col>
                  <Col span={12}>
                    <Form.Item className={styles.formItems} label="Người nhập" name="name">
                      <Input
                        className={styles.inputItems}
                        defaultValue={
                          profile.firstName != null ? profile.firstName : profile.username
                        }
                        disabled
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item className={styles.formItems} label="Ngày nhập" name="date">
                      <Input className={styles.inputItems} disabled defaultValue={date} />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item className={styles.formItems} label="MÔ TẢ" name="decription">
                      <TextArea className={styles.areaItems} />
                    </Form.Item>
                  </Col>
                  <Col span={4} offset={15}>
                    <Form.Item>
                      <Button
                        className={styles.myButtonCancle}
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
                        loading={isLoading}
                        htmlType="submit"
                      >
                        Thêm mới
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Affix>
            </Col>
            <Col span={14}>
              <Col span={24} className={styles.listTitle}>
                <span className={styles.subTitle}>DANH SÁCH NHẬP HÀNG</span>
                <AutoComplete
                  className={styles.search}
                  dropdownMatchSelectWidth={380}
                  style={{ width: 300, height: 20 }}
                  options={options}
                  onSelect={onSelect}
                  onSearch={handleSearch}
                >
                  <Input.Search size="medium" placeholder="Search product here" enterButton />
                </AutoComplete>
              </Col>
              <div className={styles.importList}>
                {importItems.map((item, index) => {
                  let quantity = `quantity_${index}`;
                  let orignalPrice = `origanal_price_${index}`;
                  return (
                    <Col span={18} key={index}>
                      <Row className={styles.importItemContainer}>
                        <Col span={4}>
                          <Image
                            className={styles.importItemAvatar}
                            src={item.url}
                            width={40}
                            preview={false}
                          />
                        </Col>
                        <Col span={20} className={styles.importItemInfor}>
                          <span className={styles.importItemName}> {item.sku}</span>
                          <DeleteTwoTone
                            className={styles.importItemIcon}
                            style={{ fontSize: '22px' }}
                            twoToneColor="#aeaeae"
                            onClick={() => onDelete(item)}
                          />
                        </Col>
                        <Form.Item
                          className={styles.formImportItem}
                          label="GIÁ NHẬP"
                          name={orignalPrice}
                          required={true}
                        >
                          <InputNumber
                            className={styles.numberInputItems}
                            defaultValue={1}
                            min={1}
                          />
                        </Form.Item>
                        <Form.Item
                          className={styles.formImportItem}
                          label="SỐ LƯỢNG"
                          name={quantity}
                          required={true}
                        >
                          <InputNumber
                            className={styles.numberInputItems}
                            defaultValue={1}
                            min={1}
                          />
                        </Form.Item>
                      </Row>
                    </Col>
                  );
                })}
              </div>
            </Col>
          </Row>
        </Form>
        <VariantModal
          visible={isModalVisible}
          handleOk={handleOk}
          handleCancel={handleCancel}
          variants={variants}
        />
      </Spin>
    </div>
  );
};
export default connect(state => ({ loading: state.loading }))(NewImport);
