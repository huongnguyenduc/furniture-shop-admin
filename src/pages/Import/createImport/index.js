import React, { useState } from 'react';
import { connect, useSelector } from 'dva';
import styles from './styles.less';
import {
  Form,
  DatePicker,
  Row,
  Col,
  Affix,
  Input,
  Typography,
  Image,
  Button,
  InputNumber,
  AutoComplete,
} from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import { router } from 'umi';
import moment from 'moment';
import ItemSearch from '../../../components/imports/ItemSearch';
const searchResult = (arr, query) => {
  let result = arr.filter(item => item.product_name.toUpperCase().includes(query.toUpperCase()));
  return result.map((item, index) => {
    let key = item.product_name;
    return {
      value: key,
      label: <ItemSearch url={item.image_url} name={item.product_name} />,
    };
  });
};
const getdateTime = () => {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  if (month.toString().length == 1) {
    month = '0' + month;
  }
  if (day.toString().length == 1) {
    day = '0' + day;
  }
  var dateTime = day + '-' + month + '-' + year;
  return dateTime;
};
const NewImport = props => {
  const { dispatch } = props;
  const current_date = getdateTime();
  const products = useSelector(state => state.products.products);
  const [options, setOptions] = useState([]);

  let importItem = {
    id: 2,
    username: 'HUY NÈ',
    description: '',
    total_price: 0,
    create_day: current_date,
    items: [],
  };
  const [importState, setimportSate] = useState(importItem);

  const handleSearch = value => {
    setOptions(value ? searchResult(products, value) : []);
    console.log(options);
  };
  const onSelect = value => {
    let item = {
      url: 'https://cdn.pixabay.com/photo/2020/02/14/03/20/coffee-4847393__340.jpg',
      name: 'Bàn ăn loại lớn',
      product_id: 0,
      variant_id: 0,
      quantity: 0,
      price: 0,
    };
    console.log(value)
    item.product_id = importState.items.length;
    let array = importState.items;
    array.push(item);
    setimportSate({
      ...importState,
      items: array,
    });
  };
  const onDelete = item => {
    let index = importState.items.indexOf(item);
    if (index !== -1) {
      console.log(index);
      var array = importState.items;
      array.splice(index, 1);
      console.log(array);
      console.log(array.length);
      setimportSate({
        ...importState,
        items: array,
      });
    }
  };
  function onChangeDate(date, dateString) {
    console.log(date, dateString);
  }
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const { Title } = Typography;
  const dateFormat = 'DD-MM-YYY';
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
          total: 0,
        }}
        layout="vertical"
        form={form}
        autoComplete="off"
        className={styles.container}
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
                  <Form.Item
                    className={styles.formItems}
                    label="NGƯỜI NHẬP"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng điền tên người nhập!',
                      },
                    ]}
                  >
                    <Input className={styles.inputItems} defaultValue="CCC" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    className={styles.formItems}
                    label="NGÀY NHẬP"
                    name="create_day"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng điền loại sản phẩm!',
                      },
                    ]}
                  >
                    <DatePicker
                      className={styles.inputItems}
                      defaultValue={moment(current_date, dateFormat)}
                      format={dateFormat}
                      onChange={onChangeDate}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    className={styles.formItems}
                    label="MÔ TẢ"
                    name="decription"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng điền mô tả',
                      },
                    ]}
                  >
                    <TextArea className={styles.inputItems} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item className={styles.formItems} label="TỔNG CỘNG ĐƠN NHẬP" name="total">
                    <Input className={styles.inputItems} disabled />
                  </Form.Item>
                </Col>
                <Col span={4} offset={15}>
                  <Form.Item>
                    <Button
                      className={styles.myButton}
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
                      // onClick={handleAllFields}
                      // loading={isLoading}
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
            {importState.items.map((item, index) => {
              let quantity = 'quantity' + index;
              let orignalPrice = 'origanal_price' + index;
              let price = 'price' + index;
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
                      <span className={styles.importItemName}> {item.name}</span>
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
                    >
                      <InputNumber className={styles.numberInputItems} />
                    </Form.Item>
                    <Form.Item className={styles.formImportItem} label="GIÁ BÁN" name={price}>
                      <InputNumber className={styles.numberInputItems} />
                    </Form.Item>
                    <Form.Item className={styles.formImportItem} label="SỐ LƯỢNG" name={quantity}>
                      <InputNumber className={styles.numberInputItems} />
                    </Form.Item>
                  </Row>
                </Col>
              );
            })}
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default NewImport;
