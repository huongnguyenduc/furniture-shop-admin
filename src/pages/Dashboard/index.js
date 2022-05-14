import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import styles from './styles.less';
import { OrderStatus } from './OrderStatus';
import { ReactComponent as FileListIcon } from '../../assets/icons/file-list-line.svg';
import { ReactComponent as HonourIcon } from '../../assets/icons/honour-line.svg';
import { ReactComponent as CheckBoxCircleIcon } from '../../assets/icons/checkbox-circle-line.svg';
import { ReactComponent as UserReceivedIcon } from '../../assets/icons/user-received-line.svg';
import { ReactComponent as HomeIcon } from '../../assets/icons/home-line.svg';
import { ReactComponent as ShoppingBasketIcon } from '../../assets/icons/shopping-basket-line.svg';
import { ReactComponent as ArchiveDrawerIcon } from '../../assets/icons/archive-drawer-line.svg';
import { ReactComponent as HandHeartIcon } from '../../assets/icons/hand-heart-line.svg';
import { ProductStatus } from './ProductStatus';
import { VoucherTable } from './VoucherTable';

const Dashboard = props => {
  return (
    <div className={styles.container}>
       <Row gutter={[16, 16]}>
       <Col span={8}>
          <OrderStatus
            heading="Đơn hàng"
            leftColor="#1FD071"
            rightColor="#00A843"
            icon={CheckBoxCircleIcon}
            value = "36"
          />
        </Col>
        <Col span={8}>
          <OrderStatus
            heading="Doanh thu"
            leftColor="#F39034"
            rightColor="#FF2727"
            icon={FileListIcon}
            value= "12.500.000 VND"
          />
        </Col>
        <Col span={8}>
          <OrderStatus
            heading="Khách hàng mới"
            leftColor="#0097EC"
            rightColor="#003AD2"
            icon={HonourIcon}
            value="12"
          />
        </Col>
        
        <Col span={8}>
          <OrderStatus
            heading="Đơn hàng chờ xử lí"
            leftColor="#9852F0"
            rightColor="#5900C9"
            icon={UserReceivedIcon}
            value="7"
          />
        </Col>
        <Col span={8}>
          <OrderStatus
            heading="Đơn hàng đang đóng gói"
            leftColor="#9852F0"
            rightColor="#5900C9"
            icon={UserReceivedIcon}
            value= "23"
          />
        </Col>
        <Col span={8}>
          <OrderStatus
            heading="Đơn hàng đang giao"
            leftColor="#9852F0"
            rightColor="#5900C9"
            icon={UserReceivedIcon}
            value="12"
          />
        </Col>
        <Col span={16}
          className={styles.card}
        >
          <h1 className= {styles.header}>Voucher đang áp dụng</h1>
          <VoucherTable />
        </Col>
        <Col span={8}>
          <OrderStatus
            heading="Lượt truy cập"
            leftColor="#9852F0"
            rightColor="#5900C9"
            icon={UserReceivedIcon}
            value="12.654"
          />
        </Col>
      </Row>
    </div>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
