import React, { useRef, useState, useEffect } from 'react';
import styles from './styles.less';
import { TweenOneGroup } from 'rc-tween-one';
import { connect, useSelector } from 'dva';
import {
  Affix,
  Form,
  Row,
  Col,
  Input,
  Typography,
  Button,
  Spin,
  notification,
} from 'antd';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { router } from 'umi';

const CreateUser = props => {
  const { dispatch} = props;
  const [form] = Form.useForm();
  const { Title } = Typography;
  const onFinish = values => {
  if(values.password != values.confirmPassword) {
    notification.error({
      message: 'Vui lòng xác nhận lại mật khẩu'
    })
  }
  values.roleId = 1;
  dispatch({
    type: 'user/createUser',
    payload: values,
  })
  router.goBack();
  }
  return (
    <div>    
        <Form
          name="create-category"
          labelCol={{
            span: 12,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            description: '',
            multiSubmission: true,
            sponsors: [],
          }}
          layout="vertical"
          form={form}
          onFinish={onFinish}
          autoComplete="off"
          className={styles.container}
        >
          <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }]}>
            <Col span={20} offset={1}>
              <Affix offsetTop={70}>
                <Title className={styles.title}>TẠO TÀI KHOẢN</Title>
              </Affix>
            </Col>
            <Col span={24}>
              <Affix offsetTop={130}>
                <Row gutter={[{ xs: 8, sm: 16, md: 24 }]}>
                  <Col span={14} offset={4}>
                    <Form.Item className={styles.formItems} label="Tên tài khoản">
                      <Form.Item
                        name="username"
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng nhập tên người dùng',
                          },
                          {
                            max: 30,
                            message: 'Tối đa 30 kí tự',
                          },
                        ]}
                      >
                        <Input className={styles.inputItems} />
                      </Form.Item>
                    </Form.Item>
                  </Col>
                  <Col span={14} offset={4}>
                    <Form.Item className={styles.formItems} label="Email">
                      <Form.Item
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng nhập email',
                          },
                          {
                            max: 30,
                            message: 'Tối đa 30 kí tự',
                          }, 
                          {
                            required: true,
                            type: 'email',
                            message: 'Đây không phải là địa chỉ Email!',
                          },
                        ]}
                      >
                        <Input className={styles.inputItems} />
                      </Form.Item>
                    </Form.Item>
                  </Col>
                  <Col span={14} offset={4}>
                    <Form.Item className={styles.formItems} label="Mật khẩu">
                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu',
                          },
                          {
                            max: 30,
                            message: 'Tối đa 30 kí tự',
                          },
                        ]}
                      >
                        <Input className={styles.inputItems} />
                      </Form.Item>
                    </Form.Item>
                  </Col>
                  <Col span={14} offset={4}>
                    <Form.Item className={styles.formItems} label="Nhập lại mật khẩu">
                      <Form.Item
                        name="confirmPassword"
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng nhập lại mật khẩu',
                          },
                        ]}
                      >
                        <Input className={styles.inputItems} />
                      </Form.Item>
                    </Form.Item>
                  </Col>
                  <Col span={3} offset={13}>
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
          </Row>
        </Form>
    </div>
  );
};

export default connect(state => ({ loading: state.loading }))(CreateUser);
