import React, { useState } from 'react';
import { Modal, Space, Radio, Image } from 'antd';
import styles from './styles.less';
const VariantModal = props => {
  const [selectedVariant, setSelectedVariant] = useState();

  const onChange = value => {
    setSelectedVariant(value.target.value);
  };

  return (
    <Modal
      className='brand'
      title={'CHỌN PHIÊN BẢN'}
      visible={props.visible}
      onOk={() => props.handleOk(selectedVariant)}
      onCancel={props.handleCancel}
    >  
      <div className={styles.scroll}>
      <Radio.Group onChange={onChange}>
        <Space direction="vertical">
          {props.variants.map((e, index) => {
            return (
              <Radio key={e.sku} value={index}>
                <Image src={e.image} width={100} preview={false} />
                {e.sku}
              </Radio>
            );
          })}
        </Space>
      </Radio.Group>
      </div>
    </Modal>
  );
};

export default VariantModal;
