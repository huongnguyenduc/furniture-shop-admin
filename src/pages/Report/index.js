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
const Report = props => {
  const { RangePicker } = DatePicker;
  const { Option } = Select;
  const data = useSelector(state => state.chart)
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
          <Select className={styles.picker} defaultValue="month" style={{ width: 120 }} >
            <Option value="week">Week</Option>
            <Option value="month">Month</Option>
            <Option value="year">Year</Option>
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
               Total Sales
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
               Total Cost
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
               Today's Revenue
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
               Total Orders
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
               Visit 
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
               New Customers
             </p>
             <span className={styles.bodyInfor}>
               $321K
             </span>
           </div>
         </Col>
        </Row>
      </Col>
      <Col className={styles.customerContainer} span={6}>
      </Col>
      <Col className={styles.productContainer} span={14}>
      </Col>
    </Row>
   </Layout>
  )
}

export default  connect(({ chart }) => ({
  chart,
})) (Report);