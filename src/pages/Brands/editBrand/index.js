import React, { useState } from 'react';
import styles from './styles.less';

import { connect, useSelector } from 'dva';
import { Form, Upload, Row, Col, Input, Typography, Button, InputNumber } from 'antd';
import { InboxOutlined, UploadOutlined, CloseOutlined } from '@ant-design/icons';
import { router } from 'umi';

const { Title } = Typography;

const editBrand = props => {
  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div>
      <Title level={3} style={{ margin: '50px' }}>
        Edit brand
      </Title>
      <Form
        name="create-brand"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Tên thương hiệu"
          name="name"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên thương hiệu!',
            },
          ]}
        >
          <Input style={{ width: '300px' }} defaultValue={props.location.state.name} />
        </Form.Item>
        <Form.Item
          label="Mô tả"
          name="description"
          rules={[
            {
              required: true,
              message: 'Vui lòng mô tả thương hiệu!',
            },
          ]}
        >
          <Input style={{ width: '300px' }} defaultValue={props.location.state.description} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default editBrand;