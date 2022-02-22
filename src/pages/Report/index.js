import React from 'react'
import {Layout, Row, Col, DatePicker, Select,  } from 'antd'
import { connect, useSelector } from 'dva';
import { Line } from '@ant-design/plots'
import {
  StockOutlined, 
  UserAddOutlined, 
  DollarCircleOutlined, 
  FileDoneOutlined, 
  TrademarkOutlined, 
  RobotOutlined } 
from '@ant-design/icons';
import styles from './styles.less'  
import CustomerItem from '../../components/report/customerItem/index'
import ProductItem from '../../components/report/productItem/index'
const Report = props => {
  const { RangePicker } = DatePicker;
  const { Option } = Select;
  const data = useSelector(state => state.report.chart)
  const cus = useSelector(state => state.report.customers)
  const products = useSelector(state => state.report.products)
  const config = {
    data,
    xField: 'time',
    yField: 'value',
    seriesField: 'category',
    yAxis: {
      label: {
        formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    legend: {
      position: 'top',
    },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 4000,
      },
    },
  };
  return (
   <Layout>
    <Row>
      <Col className={styles.chartContainer} span = {14} >
        <div className={styles.chartPicker}>
          <RangePicker className={styles.picker} />
          <Select className='picker' defaultValue="month" style={{ width: 120 }} >
            <Option value="week">Tuần</Option>
            <Option value="month">Tháng</Option>
            <Option value="year">Năm</Option>
          </Select>
        </div>
        <div className={styles.chartInfor}> 
          <Line {...config} />
        </div>
      </Col>
      <Col className={styles.overViewContainer} span = {9}>
        <Row>
         <Col className={styles.itemsInfor} span ={11}>
         <StockOutlined className={styles.iconInfor} style={{ fontSize: '28px', color: '#1890ff'}} />
           <div>
             <p className={styles.titleInfor}>
               Tổng doanh số
             </p>
             <span className={styles.bodyInfor}>
               $321K
             </span>
           </div> 
         </Col>
         <Col className={styles.itemsInfor} span ={11}>
           <DollarCircleOutlined className={styles.iconInfor} style={{ fontSize: '28px', color: '#1890ff'}} />
           <div>
             <p className={styles.titleInfor}>
               Tổng chi phí
             </p>
             <span className={styles.bodyInfor}>
               $321K
             </span>
           </div> 
         </Col>
         <Col className={styles.itemsInfor} span ={11}>
           <TrademarkOutlined className={styles.iconInfor} style={{ fontSize: '28px', color: '#1890ff'}} />
           <div>
             <p className={styles.titleInfor}>
               Doanh thu hôm nay
             </p>
             <span className={styles.bodyInfor}>
               $321K
             </span>
           </div> 
         </Col>
         <Col className={styles.itemsInfor} span ={11}>
           <FileDoneOutlined className={styles.iconInfor} style={{ fontSize: '28px', color: '#1890ff'}} />
           <div>
             <p className={styles.titleInfor}>
               Tổng đơn đặt
             </p>
             <span className={styles.bodyInfor}>
               $321K
             </span>
           </div>
         </Col>
         <Col className={styles.itemsInfor} span ={11}>
           <RobotOutlined className={styles.iconInfor} style={{ fontSize: '28px', color: '#1890ff'}} />
           <div>
             <p className={styles.titleInfor}>
               Lượt ghé thăm
             </p>
             <span className={styles.bodyInfor}>
               $321K
             </span>
           </div>
         </Col>
         <Col className={styles.itemsInfor} span ={11}>
           <UserAddOutlined className={styles.iconInfor} style={{ fontSize: '28px', color: '#1890ff'}} />
           <div>
             <p className={styles.titleInfor}>
               Khách hàng mới
             </p>
             <span className={styles.bodyInfor}>
               $321K
             </span>
           </div>
         </Col>
        </Row>
      </Col>
      <Col className={styles.customerContainer} span={6}>
        <div className={styles.customerTitle}>Khách mua nhiều nhất</div>
        {cus.map((item, index) => {
          return (
            <div key={`key-${index}`}>
            <CustomerItem url={item.image} name={item.name} email={item.email} />
            </div>
          )
        })}
      </Col>
      <Col className={styles.productContainer} span={14}>
      <div className={styles.productTitle}>Sản phẩm bán chạy</div>
      <ProductItem products ={products} />
      </Col>
    </Row>
   </Layout>
  )
}

export default  connect(({ chart }) => ({
  chart,
})) (Report);