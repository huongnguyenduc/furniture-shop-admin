import React, { useState } from 'react'
import {Layout, Row, Col, DatePicker, Select, Button, Form, Spin, notification, message } from 'antd'
import { connect, useSelector } from 'dva';
import { Line , DualAxes} from '@ant-design/plots'
import { 
  DollarCircleOutlined,  
  ShoppingOutlined,
  MoneyCollectOutlined,
  FundOutlined, 
  } 
from '@ant-design/icons';
import { Table } from 'antd';
import styles from './styles.less'  
import {moneyConverter} from '../../Utils/helper'
import { CSVLink, CSVDownload } from "react-csv";
import moment from 'moment';
const Report = props => {
  let dataFormTemp = {
    start : moment().set("date",1).format("YYYY-MM-DD"),
    end : moment().format("YYYY-MM-DD"),
    compression: "day",
    rangePicker: [moment().set("date",1), moment()],
  }
  let countLoading = 0;
  const { RangePicker } = DatePicker;
  const {dispatch, loading} = props;
  const isLoading = loading.effects['report/getDataLineChart'];
  const dataLineChart = useSelector(state => state.report.dataLineChart)
  const dataBestSeller = useSelector(state => state.report.dataBestSeller)
  const dataReportTable = useSelector(state => state.report.dataReportTable)
  const summary = useSelector(state => state.report.summary)
  const columnsData = useSelector(state => state.report.columnsData)
  const linesData = useSelector(state => state.report.linesData);
  //const [dataForm, setDataForm] = useState(dataFormTemp);
  const data = [
    {
      "year": "1850",
      "value": 0,
      "category": "Liquid fuel"
    },
    {
      "year": "1850",
      "value": 54,
      "category": "Solid fuel"
    },
    {
      "year": "1857",
      "value": 0,
      "category": "Liquid fuel"
    },
    {
      "year": "1857",
      "value": 77,
      "category": "Solid fuel"
    },
    {
      "year": "1857",
      "value": 0,
      "category": "Gas fuel"
    },
    {
      "year": "1857",
      "value": 0,
      "category": "Cement production"
    },
    {
      "year": "1857",
      "value": 0,
      "category": "Gas flarinl"
    },
    {
      "year": "1858",
      "value": 0,
      "category": "Liquid fuel"
    },
    {
      "year": "1858",
      "value": 78,
      "category": "Solid fuel"
    },
    {
      "year": "1858",
      "value": 0,
      "category": "Gas fuel"
    },
    {
      "year": "1858",
      "value": 0,
      "category": "Cement production"
    },
    {
      "year": "1858",
      "value": 0,
      "category": "Gas flarinl"
    },
    {
      "year": "1859",
      "value": 0,
      "category": "Liquid fuel"
    },
    {
      "year": "1884",
      "value": 0,
      "category": "Gas flarinl"
    },
    {
      "year": "1885",
      "value": 4,
      "category": "Liquid fuel"
    },
    {
      "year": "1885",
      "value": 273,
      "category": "Solid fuel"
    },
    {
      "year": "1885",
      "value": 1,
      "category": "Gas fuel"
    },
    {
      "year": "1885",
      "value": 0,
      "category": "Cement production"
    },
    {
      "year": "1885",
      "value": 0,
      "category": "Gas flarinl"
    },
    {
      "year": "1886",
      "value": 5,
      "category": "Liquid fuel"
    },
    {
      "year": "1886",
      "value": 275,
      "category": "Solid fuel"
    },
    {
      "year": "1886",
      "value": 2,
      "category": "Gas fuel"
    },
    {
      "year": "1886",
      "value": 0,
      "category": "Cement production"
    },
    {
      "year": "1886",
      "value": 0,
      "category": "Gas flarinl"
    },
    {
      "year": "1887",
      "value": 5,
      "category": "Liquid fuel"
    },
    {
      "year": "1887",
      "value": 287,
      "category": "Solid fuel"
    },
    {
      "year": "1887",
      "value": 3,
      "category": "Gas fuel"
    },
    {
      "year": "1887",
      "value": 0,
      "category": "Cement production"
    },
    {
      "year": "1887",
      "value": 0,
      "category": "Gas flarinl"
    },
    {
      "year": "1888",
      "value": 5,
      "category": "Liquid fuel"
    },
    {
      "year": "1888",
      "value": 317,
      "category": "Solid fuel"
    },
    {
      "year": "1888",
      "value": 5,
      "category": "Gas fuel"
    },
    {
      "year": "1888",
      "value": 0,
      "category": "Cement production"
    },
    {
      "year": "1888",
      "value": 0,
      "category": "Gas flarinl"
    },
    {
      "year": "1889",
      "value": 6,
      "category": "Liquid fuel"
    },
    {
      "year": "1889",
      "value": 318,
      "category": "Solid fuel"
    },
    {
      "year": "1889",
      "value": 3,
      "category": "Gas fuel"
    },
    {
      "year": "1889",
      "value": 0,
      "category": "Cement production"
    },
    {
      "year": "1889",
      "value": 0,
      "category": "Gas flarinl"
    },
    {
      "year": "1890",
      "value": 8,
      "category": "Liquid fuel"
    },
    {
      "year": "1890",
      "value": 345,
      "category": "Solid fuel"
    },
    {
      "year": "1890",
      "value": 3,
      "category": "Gas fuel"
    },
  ]
  // const config =  {         // config multi line
  //   data: dataLineChart || [],
  //   xField: 'date',
  //   yField: 'value',
  //   seriesField: 'category',
  //   yAxis: {
  //     label: {
  //       // 数值格式化为千分位
  //       formatter: (v) => {
  //         return moneyConverter(v) + ' VND';
  //       },
  //     },
  //   },
  //   smooth: true,
  //   animation: {
  //     appear: {
  //       animation: 'path-in',
  //       duration: 3000,
  //     },
  //   },
  //   color: ({category}) =>{
  //     switch(category){
  //       case 'Đơn hàng':
  //         return '#17A00E'; //#FFC107
  //       case 'Doanh thu':
  //         return '#FFC107';
  //       case 'Chi phí':
  //         return '#F41127'; 
  //       case 'Số đơn nhập':
  //         return '  #4A92FE';
  //       default: 
  //         return '#232323';
  //     }
  //   }
  // };
  const columnsTopProducts = [
    {
      width: '20%',
      title: 'STT',
      dataIndex: 'index'
    },
    {
      width: '40%',
      title: 'Sản phẩm',
      dataIndex: 'name',
    },
    {
      width: '40%',
      title: 'Số lượng',
      dataIndex: 'quantity',
      align: 'center',
    }
  ]
  const colomnsReportTable = [
    {
      width: '10%',
      title: 'STT',
      dataIndex: 'index',
      align: 'center'
    },
    {
      width: '18%',
      title: 'Ngày',
      dataIndex: 'date',
      align: 'center'
    },
    {
      width: '18%',
      title: 'Số đơn bán',
      dataIndex: 'numberOfSales',
      align: 'center'
    },
    {
      width: '18%',
      title: 'Thu',
      dataIndex: 'revenue',
      align: 'center',
      render: (item) =>{
        return moneyConverter(item);
      }
    },
    {
      width: '18%',
      title: 'Số đơn nhập',
      dataIndex: 'numberOfImports',
      align: 'center'
    },
    {
      width: '18%',
      title: 'Chi',
      dataIndex: 'cost',
      align: 'center',
      render: (item) =>{
        return moneyConverter(item);
      }
    },
  ]
  const headerConfigExcel = [
    {
      label: "STT",
      key: "index",
    },
    {
      label: "Ngày",
      key: "date",
    },
    {
      label: "Tổng số đơn hàng",
      key: "numberOfSales",
    },
    {
      label: "Doanh thu",
      key: "revenue",
    },
    {
      label: "Tổng nhập hàng",
      key: "numberOfImports",
    },
    {
      label: "Chi phí nhập hàng",
      key: "cost",
    },
  ]
  const config = {                  // config cột line 
    data: [columnsData, linesData],
    xField: 'date',
    yField: ['value', 'money'],
    yAxis: {
      money:{
        label: {
          formatter: (v) => {
            return moneyConverter(v) + ' $';
          },
        }
      },
      value: {
        label: {
          formatter: (v) => {
            return moneyConverter(v) + ' đơn';
          },
        }
      }
    },
    geometryOptions: [
      {
        geometry: 'column',
        isGroup: true,
        seriesField: 'type',
        columnWidthRatio: 0.4,
        color: ({type}) =>{
              switch(type){
                case 'Đơn bán':
                  return '#17A00E'; //#FFC107
                case 'Đơn nhập':
                  return '#4A92FE';
                default: 
                  return '#232323';
              }
        }
      },
      {
        geometry: 'line',
        seriesField: 'name',
        color: ({name}) =>{
          switch(name){
            case 'Doanh thu':
              return '#FFC107'; //#FFC107
            case 'Chi phí':
              return '#F41127';
            default: 
              return '#232323';
          }
        },
        lineStyle: ({ name }) => {
          if (name === 'a') {
            return {
              lineDash: [1, 4],
              opacity: 1,
            };
          }

          return {
            opacity: 0.5,
          };
        },
      },
      
    ],
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 3000,
      },
    },
  };
  //-- Form --//
  React.useEffect(() => {
    dispatch({
    type: 'report/getDataLineChart',
    payload: dataFormTemp
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);           // xóa dataForm

  const onValuesChange = async (changedValues, allValues) => {
    const tmp = {...allValues};

    if (tmp.rangePicker !== undefined && tmp.rangePicker !== null){
      tmp.start = allValues.rangePicker[0].format("YYYY-MM-DD");
      tmp.end = allValues.rangePicker[1].format("YYYY-MM-DD");
    }

    //setDataForm({...tmp});
    dataFormTemp = {...tmp};
  }
  const onFinish = () =>{
    //console.log(dataForm);
    // dispatch({
    //   type: "report/getDataLineChart",
    //   payload: dataForm,
    // })
  }
  const onBtnSubmit = () =>{
    if (dataFormTemp.rangePicker !== null){
      const rangeDate = (dataFormTemp.rangePicker[1] - dataFormTemp.rangePicker[0])/(3600000*24);
      if (rangeDate > 11){
        notification.error({message: "Chỉ được xem báo cáo trong khoảng 10 ngày"});
      }else{
        dispatch({
          type: "report/getDataLineChart",
          payload: dataFormTemp
        })
      }
    }
  }
  //-- ENd Form --//
  return (
   <Layout className={styles.layout}>
     <Row gutter={16}>
       <Col span={24}>
         <div className={styles.lineChartContainer}> 
         <Row className={styles.formContainer}>
           <Col span={22}>
           <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            layout="horizontal"
            labelAlign = "left" 
            onValuesChange = {onValuesChange}
            className={styles.form}
            initialValues = {dataFormTemp}
            onFinish = {onFinish}>        
                <Form.Item name="rangePicker" 
                          label="Thời gian" 
                          rules= {[
                            {
                              type: 'array',
                              required: true,
                              message: 'Please select time!',
                            },
                          ]}
                          >
                  <RangePicker />
                </Form.Item>
          </Form>
           </Col>
           <Col span={2}>
            <Button
              size='large'
              type='primary'
              className= {styles.myButton}
              onClick={onBtnSubmit}
            >Xem</Button>
           </Col>
          </Row>
         </div>
       </Col>
     </Row>
     {isLoading ? (<Spin className={styles.spin} />) : ( <div>
     <Row gutter={16}>
       <Col span={6}>
          <div className={styles.overViewContainer}>
            <Row >
              <Col span={16} offset={1}>
                <p className={styles.title}>TỔNG HÓA ĐƠN</p> 
                <p className={styles.value}>{moneyConverter(summary.numberOfSales)}</p> 
              </Col>  
              <Col span={6} className={styles.divIcon}>
                <ShoppingOutlined className={styles.icon} style={{color: '#17A00E'}}/>
              </Col>
            </Row>
          </div>
       </Col> 
       <Col span={6}>
          <div className={styles.overViewContainer}>
            <Row >
              <Col span={16} offset={1}>
                <p className={styles.title}>DOANH THU</p> 
                <p className={styles.value}>{moneyConverter(summary.revenue)}</p> 
              </Col>  
              <Col span={6} className={styles.divIcon}>
                <DollarCircleOutlined className={styles.icon} style={{color: '#FFC107'}}/>
              </Col>
            </Row>
          </div>
       </Col>
       <Col span={6}>
          <div className={styles.overViewContainer}>
            <Row >
              <Col span={16} offset={1}>
                <p className={styles.title}>SỐ ĐƠN NHẬP</p> 
                <p className={styles.value}>{moneyConverter(summary.numberOfImporter)}</p> 
              </Col>  
              <Col span={6} className={styles.divIcon}>
                <MoneyCollectOutlined className={styles.icon} style={{color: '#4A92FE'}}/>
              </Col>
            </Row>
          </div>
       </Col>
       <Col span={6}>
          <div className={styles.overViewContainer}>
            <Row >
              <Col span={16} offset={1}>
                <p className={styles.title}>CHI PHÍ</p> 
                <p className={styles.value}>{moneyConverter(summary.cost)}</p> 
              </Col>  
              <Col span={6} className={styles.divIcon}>
              <FundOutlined className={styles.icon} style={{color: '#F41127'}}/>
              </Col>
            </Row>
          </div>
       </Col>
     </Row>
     <Row gutter={16}>
      <Col span={18}>
        <div className={styles.lineChartContainer}>
          <p className={styles.title}>BIỂU ĐỒ CHI TIẾT THEO NGÀY</p>
          {/* <Line {...config} className={styles.lineChart}/> */}
          <DualAxes {...config} className={styles.lineChart}/>
        </div>
      </Col>
      <Col span={6}>
        <div className={styles.lineChartContainer}>
          <p className={styles.title}>TOP SẢN PHẨM BÁN CHẠY</p>
          <Table 
            columns={columnsTopProducts}
            dataSource={dataBestSeller}
            size="small"
            pagination={false}
            scroll={{ y: 360 }}/>
        </div>
      </Col>
     </Row>
     <Row>
       <Col span={24}>
         <div className={styles.lineChartContainer}>
           <Row>
             <Col span={18} offset={3}>
              <p className={styles.title}>BẢNG MÔ TẢ CHI TIẾT THEO NGÀY</p>
             </Col>
             <Col span={3}>
              <CSVLink data={dataReportTable}
                        headers={headerConfigExcel}
                        filename='Báo cáo'
                        className={styles.btnExport}
                        >Xuất Excel</CSVLink>
             </Col>
           </Row>
          <Table columns={colomnsReportTable}
                 dataSource={dataReportTable}
                 pagination={false}
                 scroll={{y:500}}/>
         </div>
        
       </Col>
     </Row>
     </div>)}
   </Layout>
  )
}

export default  connect((state) => ({
  loading : state.loading
})) (Report);