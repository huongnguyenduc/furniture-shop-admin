import React from 'react'
import styles from './styles.less'
import { Row, Col,  } from 'antd'
const ProductItems = props => {
   const format = v =>{
        return `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`)
    }
    const {products } = props;
  return (
    <div>
        <Row className={styles.tabletitle}>
            <Col span={4} offset={1}>Tên sản phẩm</Col>
            <Col span={4} offset={1}>Doanh số</Col>
            <Col span={4} offset={1}>Đánh giá</Col>
            <Col span={4} offset={1}>Giá bán</Col>
            <Col span={4}>Trạng thái</Col>
        </Row>
        
        {products.map((item, index) => {
          return (
            <Row className={styles.itemContainer}>
            <Col span={4} offset={1}>{item.name}</Col>
            <Col span={4} offset={1}>{format(item.sales)}</Col>
            <Col span={4} offset={1}>{item.vote}</Col>
            <Col span={4} offset={1}>{format(item.price)}</Col>
            <Col span={4} >{item.status}</Col>
            </Row>
        )
        })}
        
        
    </div>
  )
}

export default ProductItems