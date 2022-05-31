import React, { useState } from 'react';
import { connect, useSelector } from 'dva';
import styles from './styles.less';
import {
  Typography,
  Dropdown,
  Spin,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  Row,
  Col,
  Image,
  notification,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export const ModalChangePass = ({ dispatch, onCancle, visible,username }) => {
  const [form] = Form.useForm();
  const { Title } = Typography;
  const onFinish = (values) => {
   console.log(values);
   values.username = username;
   if(values.newPassword == values.oldPassword) {
    notification.error({
        message: 'Vui lòng nhập mật khẩu khác'
    })
    return;
}
   if(values.newPassword != values.confirmPassword) {
       notification.error({
           message: 'Mật khẩu mới không khớp'
       })
       return;
   }
   dispatch({
       type: 'profile/changePassWord',
       payload: values
   })
   onCancle();
  }
  return (
    <Modal
      className="changePass"
      visible={visible}
      onCancel={() => onCancle()}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
    >
      <Form
        name="change-pass"
        labelCol={{
          span: 12,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="vertical"
        form={form}
        autoComplete="off"
        onFinish={onFinish}
        className={styles.formContainer}
      >
        <Row>
          <Col span={16} offset={7}>
            <Title className={styles.title}>ĐỔI MẬT KHẨU</Title>
          </Col>
          <Col span={24} offset={4}>
            <Form.Item className={styles.formItems} label="Mật khẩu cũ">
              <Form.Item
                className={styles.formItems}
                name="oldPassword"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu cũ'
                  },
                  {
                    max: 30,
                    message: 'Tối đa 30 kí tự',
                  },
                ]}
              >
                <Input.Password  className={styles.inputItems} />
              </Form.Item>
            </Form.Item>
          </Col>
          <Col span={24} offset={4}>
            <Form.Item className={styles.formItems} label="Mật khẩu mới">
              <Form.Item
                className={styles.formItems}
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu mới'
                  },
                  {
                    max: 30,
                    message: 'Tối đa 30 kí tự',
                  },
                ]}
              >
                <Input.Password  className={styles.inputItems} />
              </Form.Item>
            </Form.Item>
          </Col>
          <Col span={24} offset={4}>
            <Form.Item className={styles.formItems} label="Nhập lại mật khẩu mới">
              <Form.Item
                className={styles.formItems}
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập lại mật khẩu mới'
                  },
                  {
                    max: 30,
                    message: 'Tối đa 30 kí tự',
                  },
                ]}
              >
                <Input.Password  className={styles.inputItems} />
              </Form.Item>
            </Form.Item>
          </Col>
          <Col span={3} offset={12}>
            <Form.Item>
              <Button
                type="primary"
                className={styles.myButton}
                size="medium"
                htmlType="submit"
                // onClick={handleAllFields}
                // loading={isLoading}
              >
                Lưu thay đổi
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
