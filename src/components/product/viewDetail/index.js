import React from 'react'
import { connect,useSelector } from 'dva';
import {  Modal, Carousel, Image, Descriptions } from 'antd';
import styles from './styles.less'; 
import {  LeftOutlined, RightOutlined }from '@ant-design/icons';
const ViewDetail = ({visible, onCancel, products}) => {
  const view = useSelector(state => state.products.productview);
  return (
    <Modal 
    className= 'cc'
    title= {view.name} 
    footer={null}
    visible={visible} 
    cancelButtonProps={{ style: { display: 'none' } }}
    okButtonProps={{ style: { display: 'none' } }}
    width={1000} 
    bodyStyle={ { height: 'unset' }} 
    onCancel={onCancel}>
    <div className={styles.viewContainer}>
    <div className={styles.carouContainer}>
    <div className={styles.codeContainer}>
        <span>ID: {view.product_id}</span> 
        <span>Mã sản phẩm: {view.code}</span>
    </div>
    <Carousel 
      autoplay
      arrows={true} prevArrow={<LeftOutlined />} nextArrow={<RightOutlined />}
    >
        {view.images.map((item, index)  => {
            return (
              <div className={styles.imageContainer}>
              <Image width={200} height={300} src={item} preview={false}/>   
              </div>    
            )
        })}
    </Carousel>
    </div>
    <div className={styles.inforContainer}>
    <Descriptions title=" Thông tin sản phẩm:">
    <Descriptions.Item label="Tên sản phẩm" span={3}> {view.name}</Descriptions.Item>
    <Descriptions.Item label="Mô tả" span={3}>{view.description}</Descriptions.Item>
    <Descriptions.Item label="Phân loại">{view.categories}</Descriptions.Item>
    <Descriptions.Item label="Số lượng">{view.quantity}</Descriptions.Item>
    <Descriptions.Item label="Kích thước">{view.size}</Descriptions.Item>
    <Descriptions.Item label="Giá nhập">{view.orignalprice}</Descriptions.Item>
    <Descriptions.Item label="Giá bán">{view.price}</Descriptions.Item>
    <Descriptions.Item label="Chất liệu">{view.material}</Descriptions.Item>
    <Descriptions.Item label="Hãng">{view.brand}</Descriptions.Item>
  </Descriptions>
    </div>
    </div>
    </Modal>
  )
}

export default  connect( state => ({
    products: state.products
  })) (ViewDetail)