import React, { useState } from 'react';
import styles from './styles.less';
import {Form,Input,DatePicker, Row,Col,InputNumber, Button,message} from 'antd';
import { router } from 'umi';
import {connect} from 'dva';
import moment from 'moment';

const { TextArea } = Input;
const {RangePicker} = DatePicker;

function convertViToEn(str, toUpperCase = false) {  
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư

  return toUpperCase ? str.toUpperCase() : str;
}

const rangeConfig = {
    rules: [
      {
        type: 'array',
        required: true,
        message: 'Please select time!',
      },
    ],
  };

// const voucherTemp = {
//   voucherName: 'Khuyến mãi ví dụ',
//   amount: 10,
//   range_picker: [moment(moment().add(1, 'days')), moment(moment().add(3, 'days'))],
//   validDate: "2022-05-15T17:00:00.000Z",
//   expirationDate: "2022-05-28T17:00:00.000Z",
//   voucherValue: 20000,
//   cappedAt: 100000,
//   voucherDesc: "Đây là mô tả khuyến mãi ",
// }

const voucherTemp = {
    voucherName: '',
    amount: '',
    range_picker: null,
    validDate: "2022-05-15T17:00:00.000Z",
    expirationDate: "2022-05-28T17:00:00.000Z",
    voucherValue: '',
    cappedAt: '',
    voucherDesc: "",
  }

const CreateVoucher = props => {
  const [newVoucher, setNewVoucher] = useState(voucherTemp);
  const [nameVoucher, setNameVoucher] = useState('');
  const {dispatch} = props;
  
  const validFields = (voucher) =>{
    const tomorow = moment(moment().add(1, 'days'));
    const validDate = voucher.range_picker[0];

    if (validDate.format("YYYYMMDD") < tomorow.format('YYYYMMDD')){
      message.error(`Ngày áp dụng phải bắt đầu từ hôm sau (`+ tomorow.format("DD-MM-YYYY") + `)` );
      return false;
    }

    return true;
  }

  const onFinish = async values =>{
    if (validFields(newVoucher)){
      dispatch({
        type:"voucher/addVoucher",
        payload: newVoucher,
      })
      //router.goBack();
    }
  }
  
  const onValuesChange = async (changedValues, allValues) => {
    const tmp = {...allValues};

    // -- fill validDate, expirationDate to FORM
    if (tmp.range_picker !== undefined && tmp.range_picker !== null){
      tmp.validDate = allValues.range_picker[0].toISOString();
      tmp.expirationDate = allValues.range_picker[1].toISOString();
    }

    console.log(tmp)
    setNewVoucher(tmp);
  }
 
  return (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 15 }}
      layout="horizontal"
      labelAlign = "left"
      className = {styles.container}
      onFinish = {onFinish}
      onValuesChange = {onValuesChange}
      initialValues = {voucherTemp}
    >
    <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }]}>
        <h1 className={styles.title}>THÊM MỚI KHUYẾN MÃI</h1>
        <Col span={24}>
        <Form.Item label="MÃ VOUCHER" 
            name='voucherName'
            className={styles.formItems}
            rules={[
                {
                  required: true,
                  message: 'Vui lòng điền mã khuyến mãi!',
                },
                { 
                  pattern: "^[A-Z0-9]*$",
                  message: 'Mã chỉ bao gồm kí tự A-Z và chữ số 0-9',
                }
              ]}
        >
            <Input className={styles.inputItems} />
        </Form.Item>
        </Col>
        <Col span={24}>
        <Form.Item 
            name='range_picker'
            label="THỜI GIAN ÁP DỤNG" 
            className={styles.formItems}
            {...rangeConfig}
        >
            <RangePicker className={styles.inputItems} />
        </Form.Item>
        </Col>
        <Col span={24}>
        <Form.Item 
            name='voucherValue'
            label="GIÁ TRỊ" 
            className={styles.formItems}
            rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập giá trị khuyến mãi!',
                },
                {
                  type:"number",
                  min: 1,
                  message: "Giá trị phải lớn hơn 0",
                }
              ]}
        >
            <InputNumber className={styles.numberInputItems}/>
        </Form.Item>
        </Col>
        <Col span={24}>
        <Form.Item 
            name='amount'
            label="SỐ LƯỢNG" 
            className={styles.formItems}
            rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn số lượng khuyến mãi!',
                },
                {
                  type:"number",
                  min: 1,
                  message: "Số lương phải lớn hơn 0",
                }
              ]}
        >
            <InputNumber className={styles.numberInputItems}/>
        </Form.Item>
        </Col>
        <Col span={24}>
        <Form.Item 
            name='cappedAt'
            label="HÓA ĐƠN TỐI THIỂU" 
            className={styles.formItems}
            rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn giá tiền hóa đơn tối thiểu để áp dụng khuyễn mãi!',
                },
                {
                  type:"number",
                  min: 1,
                  message: "Hóa đơn phải lớn hơn 0",
                }
              ]}
        >
            <InputNumber className={styles.numberInputItems}/>
        </Form.Item>
        </Col>
        <Col span={24}>
        <Form.Item 
            name='voucherDesc'
            label="MÔ TẢ" 
            className={styles.formItems}
        >
            <TextArea rows={4} className={styles.textareaItems}/>
        </Form.Item>
        </Col>
        <Col span={4} offset={15}>
            <Form.Item>
            <Button
                className={styles.myButtonCancel}
                size='large'
                onClick={() => {
                    router.goBack();
                  }}
            >Hủy</Button>      
            </Form.Item>
        </Col>
        <Col span={4}>
            <Form.Item>
            <Button
                className={styles.myButton}
                size='large'
                type='primary'
                htmlType="submit"
                //onClick={}
            >Hoàn tất</Button>
            </Form.Item>
        </Col>
    </Row>
    </Form>
  );
};

export default connect() (CreateVoucher);
