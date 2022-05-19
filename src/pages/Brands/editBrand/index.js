import React from 'react';

import { Form, Input, Typography, Button } from 'antd';
import { connect } from 'dva';
import { router } from 'umi';
const { Title } = Typography;

const editBrand = props => {
  const { dispatch } = props;
  const [form] = Form.useForm();
  form.setFieldsValue({
    brandId: props.location.state.brandId,
    brandName: props.location.state.brandName,
    description: props.location.state.description,
  });
  const handleClick = async () => {
    const validatedAllFields = await form.validateFields();
    const { brandId, brandName, description } = validatedAllFields;
    const brandEdit = { brandId, brandName, description };
    console.log(brandEdit);
    await dispatch({
      type: 'brands/updateBrand',
      payload: brandEdit,
    });
    router.goBack();
  };
  return (
    <div>
      <Title level={3} style={{ margin: '50px' }}>
        Edit brand
      </Title>
      <Form
        form={form}
        name="edit-brand"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <Form.Item name="brandId" hidden={true}>
          <Input
            style={{ width: '300px' }}
            value={props.location.state.brandId}
            defaultValue={props.location.state.brandId}
          />
        </Form.Item>
        <Form.Item
          label="Tên thương hiệu"
          name="brandName"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên thương hiệu!',
            },
          ]}
        >
          <Input
            style={{ width: '300px' }}
            value={props.location.state.brandName}
            defaultValue={props.location.state.brandName}
          />
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
          <Input
            style={{ width: '300px' }}
            value={props.location.state.brandDesc}
            defaultValue={props.location.state.brandDesc}
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" onClick={handleClick}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default connect()(editBrand);
