import React, { useState } from 'react';
import styles from './styles.less';
import {Form,Input,DatePicker, Row,Col,InputNumber, Button,message} from 'antd';
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

// -- //  

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

 
// -- //


const EditVoucher = props => {
  const [newVoucher, setNewVoucher] = useState(voucherTemp);
  const {dispatch} = props;
  const voucherTemp = JSON.parse(props.location.query.voucher);

  React.useEffect(() => {
    
  }, []);
  
  const validFields = (voucher) =>{
    const tomorow = moment(moment().add(1, 'days'));
    const validDate = voucher.range_picker[0];

    if (validDate.format("YYYYMMDD") < tomorow.format("YYYYMMDD")){
      message.error(`Ngày áp dụng phải bắt đầu từ hôm sau (`+ tomorow.format("DD-MM-YYYY") + `)` );
      return false;
    }

    return true;
  }

  const onFinish = async values =>{
    //console.log(newVoucher);
    if (validFields(newVoucher)){
      dispatch({
        type:"voucher/editVoucher",
        payload: newVoucher,
      })
    }
  }
  
  const onValuesChange = async (changedValues, allValues) => {
    const tmp = allValues;
    if (tmp.range_picker !== null && tmp.range_picker !== undefined){
      tmp.validDate = allValues.range_picker[0].toISOString();
      tmp.expirationDate = allValues.range_picker[1].toISOString();
    }
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
        <h1 className={styles.title}>CẬP NHẬT KHUYẾN MÃI</h1>
        <Col span={24}>
        <Form.Item label="ID" 
            name='voucherId'
            className={styles.formItems}
        >
            <Input className={styles.inputItems} disabled={true}/>
        </Form.Item>
        </Col>
        <Col span={24}>
        <Form.Item label="MÃ" 
            name='voucherName'
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
            >Cập nhât</Button>
            </Form.Item>
        </Col>
    </Row>
    </Form>
  );
};

export default connect() (EditVoucher);
