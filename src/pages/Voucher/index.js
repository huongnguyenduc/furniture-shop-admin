import  React, { useState,} from 'react'
import { connect, useSelector } from 'dva';
import { Layout, Table, Button, Modal, Tag ,Spin} from 'antd';
import {PlusOutlined, } from '@ant-design/icons';
import styles from './styles.less';
import ActionRender from '../../components/voucher/actionRender/index';
import {getdateTime, moneyConverter} from '../../Utils/helper';
import { router } from 'umi';
import moment from 'moment';
const { Content, Header } = Layout

const Voucher = props => {
    const { dispatch, loading } = props;
    const isLoading = loading.effects['voucher/getVoucherList'];
    const vouchers = useSelector(state => state.voucher.vouchers);
    const [isModalVisible, setIsModalVisible] = useState(false);
    React.useEffect(() => {
      dispatch({
        type: 'voucher/getVoucherList',
      });    
    }, [dispatch]);
    const columns = [
        {
            title: 'ID',
            dataIndex: 'voucherId',
            align: 'left',
            width: '4%',
            sorter: (a, b) => (parseInt(a.voucherId) - parseInt(b.voucherId)),
        },
        {
          title: 'Mã',
          dataIndex: 'voucherName',
          align: 'center',
          width: '13%',
        },
        {
          title: 'Mô tả',
          dataIndex: 'voucherDesc',
          align: 'center',
          width: '15%',
        },
        {
          title: 'Số lượng',
          dataIndex: 'amount',
          align: 'center',
          width: '7%',
          sorter: (a, b) => (parseInt(a.amount) - parseInt(b.amount)),
        },
        {
            title: 'Ngày áp dụng',
            dataIndex: 'validDate',
            align: 'center',
            width: '13%',
            render: item =>{
              return moment(item).format("DD-MM-YYYY");
            }
        },
        {
            title: 'Ngày hết hạn',
            dataIndex: 'expirationDate',
            align: 'center',
            width: '13%',
            render: item =>{
              return moment(item).format("DD-MM-YYYY");
            }
        },
        {
            title: 'Giá trị',
            dataIndex: 'voucherValue',
            align: 'center',
            width: '15%',
            sorter: (a, b) => (parseInt(a.voucherValue) - parseInt(b.voucherValue)),
            render: item =>{
              return (moneyConverter(item) + 'đ');
            }
        },
        {
            title: 'Hóa đơn tối thiểu',
            dataIndex: 'cappedAt',
            align: 'center',
            width: '15%',
            render: item =>{
              return (moneyConverter(item) + 'đ');
            }
        },
        {
            title: 'Hành Động',
            align: 'center',
            width: '15%',
            render: (voucher) => {return <ActionRender voucher={voucher} />}
        },
    ];
  return (
  <Layout className={styles.layoutContainer}>
    {isLoading ? (<Spin />) : (
      <div>
        <Header className={styles.productHeader}>
        <span className={styles.title}>DANH SÁCH KHUYẾN MÃI</span> 
        <Button
          type="primary"
          size="large"
          className={styles.myButtonStyling}
          onClick={() => {router.push('/voucher/create'); }}
        >
          <PlusOutlined className ={styles.plusIcon}/>
          <div className={styles.myTextButton}> Tạo mới</div>
        </Button>
      </Header>
      <Content className= {styles.productContent}> 
       <Table 
       className={styles.tableCategory}
       columns={columns}
       bordered
       dataSource={vouchers}>
       </Table>
      </Content>
      </div>
    )}
      
  </Layout>
  );
}

export default connect(state=> ({loading: state.loading}))(Voucher);
