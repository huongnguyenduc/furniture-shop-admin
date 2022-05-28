import React, { useState } from 'react';
import { connect, useSelector } from 'dva';
import styles from './styles.less';
import { Menu, Dropdown, Spin, Button, Modal, Form, Input, Upload, Row, Col, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { DEFAULT_AVATAR } from '../../Utils/helper';

export function ModalProfile({modalShowed, onFinish,onCancle, state, resetImage, setImageVariant, profile}) {
  var uploading = false;
  const [form] = Form.useForm();
  return (
    <Modal 
    title="THÔNG TIN CHI TIẾT"
    className='modalProfile' 
    okText='Lưu'
    onOk={ () => onFinish(form.getFieldValue())}  
    onCancel={() => onCancle()} 
    cancelButtonProps={{ style: { display: 'none' } }}
    visible={modalShowed}
    width={700}
    >
      <Form
        name="update-profile"
        labelCol={{
          span: 12,
        }}
        wrapperCol={{
          span: 24,
        }}
        layout="vertical"
        form={form}
        autoComplete="off"
        className={styles.formContainer}
      >
        <Row>
          <Col span={6}>
            <Row>
              <Col span={24} className={styles.image}>
                <Spin spinning={uploading}>
                  <Image
                    src={state.imageUrl !== '' ? state.imageUrl : (profile.imgUrl != null ? profile.imgUrl : DEFAULT_AVATAR)}
                    width={200}
                    height={240}
                  ></Image>
                </Spin>
              </Col>
              <Col span={8} offset={8}>
                <Button onClick={() => resetImage()}>Reset</Button>
              </Col>
              <Col span={4} offset={2}>
                <Upload
                  maxCount={1}
                  onChange={file => setImageVariant(file)}
                  showUploadList={false}
                >
                  <Button
                    className={styles.uploadBtn}
                    icon={<UploadOutlined className={styles.uploadIcon} />}
                  ></Button>
                </Upload>
              </Col>
            </Row>
          </Col>
          <Col span={16} offset={1}>
            <Row>
              <Col span={16} offset={2}>
                <Form.Item className={styles.formItems} label="Tên đăng nhập" name="username">
                  <Input
                    disabled={true}
                    defaultValue={profile.username}
                    className={styles.inputItems}
                  />
                </Form.Item>
              </Col>
              <Col span={16} offset={2}>
                <Form.Item className={styles.formItems} label="Tên hiển thị">
                  <Form.Item
                    className={styles.formItems}
                    name="firstName"
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
                    <Input defaultValue={profile.firstName} className={styles.inputItems} />
                  </Form.Item>
                </Form.Item>
              </Col>
              <Col span={16} offset={2}>
                <Form.Item className={styles.formItems} label="Email">
                  <Form.Item
                    className={styles.formItems}
                    name="email"
                    rules={[
                      {
                        required: true,
                        type: 'email',
                        message: 'Đây không phải là địa chỉ Email!',
                      },
                    ]}
                  >
                    <Input defaultValue={profile.email} className={styles.inputItems} />
                  </Form.Item>
                </Form.Item>
              </Col>
              <Col span={16} offset={2}>
                <Form.Item className={styles.formItems} label="Số điện thoại">
                  <Form.Item
                    className={styles.formItems}
                    name="phoneNo"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập số điện thoại',
                      },
                      {
                        pattern: /^(?:\d*)$/,
                        message: 'Vui lòng nhập số',
                      },
                      {
                        max: 10,
                        message: 'Tối đa 10 kí tự',
                      },
                    ]}
                  >
                    <Input defaultValue={profile.phoneNo} className={styles.inputItems} />
                  </Form.Item>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
