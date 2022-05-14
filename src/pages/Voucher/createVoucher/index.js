import React, { useState } from 'react';
import styles from './styles.less';
import {Form,Input,DatePicker, Row,Col,InputNumber, Button} from 'antd';
import { router } from 'umi';
import {connect} from 'dva';
import moment from 'moment';

const { TextArea } = Input;
const {RangePicker} = DatePicker;

const rangeConfig = {
    rules: [
      {
        type: 'array',
        required: true,
        message: 'Please select time!',
      },
    ],
  };

const voucherTemp = {
  name: 'Khuyến mãi ví dụ',
  amount: 10,
  range_picker: [moment("2022-05-15"), moment("2022-05-28")],
  validDate: "2022-05-15T17:00:00.000Z",
  expirationDate: "2022-05-28T17:00:00.000Z",
  voucherValue: 20000,
  cappedAt: 100000,
  voucherDesc: "Đây là mô tả khuyến mãi 5",
}

const CreateVoucher = props => {
  const [newVoucher, setNewVoucher] = useState(voucherTemp);
  const {dispatch} = props;
  
  const onFinish = async values =>{
    console.log(newVoucher);
    
    dispatch({
      type:"voucher/addVoucher",
      payload: newVoucher,
    }).then(()=>{

    }).catch(e =>{
      alert(e);
    })
    
  }
  
  const onValuesChange = async (changedValues, allValues) => {
    const tmp = allValues;
    tmp.validDate = allValues.range_picker[0].toISOString();
    tmp.expirationDate = allValues.range_picker[1].toISOString();
    setNewVoucher(tmp);
  }
 
  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 17 }}
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
        <Form.Item label="TÊN" 
            name='name'
            className={styles.formItems}
            rules={[
                {
                  required: true,
                  message: 'Vui lòng điền tên khuyến mãi!',
                },
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
                  message: 'Vui lòng chọn giá trị khuyến mãi!',
                },
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
