import React from 'react';
import { Modal, Button, Form, Input } from 'antd';
import styles from './index.less';
import { useDispatch } from 'dva';
import { connect } from 'dva';

const create = props => {
  const [form] = Form.useForm();
  const handleSubmit = async () => {
    const validatedAllFields = await form.validateFields();
    const { brandName, description } = validatedAllFields;
    const brandCreate = { brandName, description };
    document.getElementById('formCreate').reset();
    props.handleCreate(brandCreate);
    props.onCancel();
  };
  return (
    <Modal
      className='brand'
      title="Tạo mới thương hiệu"
      onCancel={props.onCancel}
      visible={props.visible}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
      width={700}
      bodyStyle={{ height: 'unset' }}
    >
      <Form
        id="formCreate"
        name="create-brand"
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
        <Form.Item
          className={styles.formItems}
          label="Tên thương hiệu"
          name="brandName"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên thương hiệu!',
            },
          ]}
        >
          <Input className={styles.inputItems} style={{ width: '300px' }} />
        </Form.Item>
        <Form.Item
          label="Mô tả"
          className={styles.formItems}
          name="description"
          rules={[
            {
              required: true,
              message: 'Vui lòng mô tả thương hiệu!',
            },
          ]}
        >
          <Input className={styles.inputItems} style={{ width: '300px' }} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            type="primary"
            className={styles.myButton}
            htmlType="submit"
            onClick={handleSubmit}
          >
            Hoàn tất
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default create;
