import React from 'react';
import { Row, Col, Spin } from 'antd';
import styles from './styles.less';
import { connect, useSelector } from 'dva';
import { router } from 'umi';
import { OrderStatus } from './OrderStatus';
import { ReactComponent as FileListIcon } from '../../assets/icons/file-list-line.svg';
import { ReactComponent as CheckIcon } from '../../assets/icons/check.svg';
import { ReactComponent as ShoppingBasketIcon } from '../../assets/icons/shopping-basket-line.svg';
import { ReactComponent as ShippingIcon } from '../../assets/icons/shipping.svg';
import { ReactComponent as CancelIcon } from '../../assets/icons/cancel.svg';
import {
  ORDER_PENDING,
  ORDER_SHIPPING,
  ORDER_COMPLETED,
  ORDER_CANCELED,
} from '../../Utils/contants';
import { DollarCircleOutlined } from '@ant-design/icons';
import VoucherTable from './VoucherTable';

const Dashboard = props => {
  const { dispatch, loading } = props;
  const isLoading = loading.effects[('orders/getOrderList', 'report/getSummary')];
  React.useEffect(() => {
    dispatch({
      type: 'orders/getOrderList',
    });
    dispatch({
      type: 'report/getSummary',
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const orders = useSelector(state => state.orders.orders);
  const reportSummary = useSelector(state => state.report.summary);

  const groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  const result = groupBy(orders, 'orderStatus');

  return (
    <div className={styles.container}>
      <Spin spinning={isLoading}>
        <Row gutter={[16, 16]}>
          <Col span={7}>
            <OrderStatus
              heading="Đơn hàng"
              tailing="Orders"
              leftColor="#30e4e7"
              rightColor="#07bcbe"
              icon={FileListIcon}
              value={orders.length}
              onClick={() => router.push('/orders')}
            />
          </Col>
          <Col span={7} offset={1} className={styles.itemfist}>
            <OrderStatus
              heading="Doanh thu"
              tailing="Revenue"
              leftColor="#F39034"
              rightColor="#FF2727"
              icon={DollarCircleOutlined}
              value={reportSummary.revenue}
              onClick={() => router.push('/report')}
            />
          </Col>
          <Col span={7} offset={1} className={styles.itemfist}>
            <OrderStatus
              heading="Chi phí"
              tailing="Costs"
              leftColor="#ae6eff"
              rightColor="#5900C9"
              icon={DollarCircleOutlined}
              value={reportSummary.cost}
              onClick={() => router.push('/report')}
            />
          </Col>

          <Col span={6}>
            <OrderStatus
              heading="Đơn hàng chờ xử lí"
              tailing="Pending Orders"
              leftColor="#ffe329"
              rightColor="#ebcd09"
              icon={ShoppingBasketIcon}
              value={result[ORDER_PENDING]?.length ?? 0}
              onClick={() => router.push('/orders')}
            />
          </Col>
          <Col span={6}>
            <OrderStatus
              heading="Đơn hàng đang vận chuyển"
              tailing="Shipping Orders"
              leftColor="#69c1ff"
              rightColor="#0396FF"
              icon={ShippingIcon}
              value={result[ORDER_SHIPPING]?.length ?? 0}
              onClick={() => router.push('/orders')}
            />
          </Col>
          <Col span={6}>
            <OrderStatus
              heading="Đơn hàng thành công"
              tailing="Completed Orders"
              leftColor="#1FD071"
              rightColor="#00A843"
              icon={CheckIcon}
              value={result[ORDER_COMPLETED]?.length ?? 0}
              onClick={() => router.push('/orders')}
            />
          </Col>
          <Col span={6}>
            <OrderStatus
              heading="Đơn hàng đã hủy"
              tailing="Canceled Orders"
              leftColor="#ED213A"
              rightColor="#93291E"
              icon={CancelIcon}
              value={result[ORDER_CANCELED]?.length ?? 0}
              onClick={() => router.push('/orders')}
            />
          </Col>
          <Col span={24}>
            <VoucherTable />
          </Col>
        </Row>
      </Spin>
    </div>
  );
};

export default connect(state => ({ loading: state.loading }))(Dashboard);
