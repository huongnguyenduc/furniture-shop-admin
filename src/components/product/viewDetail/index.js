import React from 'react'
import { connect } from 'dva';
import {  Modal, Carousel, Image, Descriptions } from 'antd';
import styles from './styles.less'; 
import {  LeftOutlined, RightOutlined }from '@ant-design/icons';
const ViewDetail = ({visible, onCancel, products}) => {
  return (
    <Modal 
    className= 'cc'
    title= {products[1].name} 
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
        <span>ID: {products[1].id}</span> 
        <span>Mã sản phẩm: {products[1].code}</span>
    </div>
    <Carousel 
      autoplay
      arrows={true} prevArrow={<LeftOutlined />} nextArrow={<RightOutlined />}
    >
        {products[1].images.map((item, index)  => {
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
    <Descriptions.Item label="Tên sản phẩm" span={3}> {products[1].name}</Descriptions.Item>
    <Descriptions.Item label="Mô tả" span={3}>{products[1].description}</Descriptions.Item>
    <Descriptions.Item label="Phân loại">{products[1].categories}</Descriptions.Item>
    <Descriptions.Item label="Số lượng">{products[1].quantity}</Descriptions.Item>
    <Descriptions.Item label="Kích thước">{products[1].size}</Descriptions.Item>
    <Descriptions.Item label="Giá nhập">{products[1].orignalprice}</Descriptions.Item>
    <Descriptions.Item label="Giá bán">{products[1].price}</Descriptions.Item>
    <Descriptions.Item label="Chất liệu">{products[1].material}</Descriptions.Item>
    <Descriptions.Item label="Hãng">{products[1].brand}</Descriptions.Item>
  </Descriptions>
    </div>
    </div>
    </Modal>
  )
}

export default  connect( state => ({
    products: state.products
  })) (ViewDetail)