import React from 'react';
import styles from './styles.less';
import {Form,Input,DatePicker, Row,Col,InputNumber, Button} from 'antd';
import { router } from 'umi';

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

const createVoucher = props => {
      
  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      className = {styles.container}
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
            name='range-picker'
            label="THỜI GIAN ÁP DỤNG" 
            className={styles.formItems}
            {...rangeConfig}
        >
            <RangePicker className={styles.inputItems} />
        </Form.Item>
        </Col>
        <Col span={24}>
        <Form.Item 
            name='value'
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
            name='min_purchase'
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
            name='description'
            label="MÔ TẢ" 
            className={styles.formItems}
        >
            <TextArea rows={4} className={styles.textareaItems}/>
        </Form.Item>
        </Col>
        <Col span={4} offset={11}>
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
                //onClick={}
            >Hoàn tất</Button>
            </Form.Item>
        </Col>
    </Row>
    </Form>
  );
};

export default createVoucher;
