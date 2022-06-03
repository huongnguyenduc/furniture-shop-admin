import React from 'react';
import { Modal, Button, Form, Input } from 'antd';
import { useDispatch } from 'dva';
import styles from './index.less';
import { connect } from 'dva';

const edit = props => {
  const [form] = Form.useForm();
  form.setFieldsValue({
    brandId: props.value.brandId,
    brandName: props.value.brandName,
    description: props.value.brandDesc,
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
      className='brand'
      title="Chỉnh sửa thương hiệu"
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
        <Form.Item name="brandId" className={styles.formItems} hidden={true}>
          <Input
            className={styles.inputItems}
            style={{ width: '300px' }}
            value={props.value.brandId}
            defaultValue={props.value.brandId}
          />
        </Form.Item>
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
          <Input
            className={styles.inputItems}
            style={{ width: '300px' }}
            value={props.value.brandName}
            defaultValue={props.value.brandName}
          />
        </Form.Item>
        <Form.Item
          className={styles.formItems}
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
            className={styles.inputItems}
            style={{ width: '300px' }}
            value={props.value.brandDesc}
            defaultValue={props.value.brandDesc}
          />
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

export default edit;
