import React from 'react';
import { Modal, Button, Form, Input } from 'antd';
import { useDispatch } from 'dva';
import { connect } from 'dva';

const edit = props => {
  const [form] = Form.useForm();
  form.setFieldsValue({
    brandId: props.value.brandId,
    brandName: props.value.brandName,
    description: props.value.description,
  });

  const handleSubmit = async () => {
    const validatedAllFields = await form.validateFields();
    const { brandId, brandName, description } = validatedAllFields;
    const brandEdit = { brandId, brandName, description };
    props.handleUpdate(brandEdit);
    props.onCancel();
  };
  return (
    <Modal
      title="Edit Brand"
      onCancel={props.onCancel}
      visible={props.visible}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
      width={700}
      bodyStyle={{ height: 'unset' }}
    >
      <Form
        id="formEdit"
        name="edit-brand"
        form={form}
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
            value={props.value.brandId}
            defaultValue={props.value.brandId}
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
            value={props.value.brandName}
            defaultValue={props.value.brandName}
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
            value={props.value.description}
            defaultValue={props.value.description}
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default edit;
