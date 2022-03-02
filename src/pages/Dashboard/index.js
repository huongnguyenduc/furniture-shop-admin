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
import { SaleTable } from './SaleTable';

const Dashboard = props => {
  return (
    <div className={styles.container}>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <OrderStatus
            heading="To be Fulfilled"
            leftColor="#F39034"
            rightColor="#FF2727"
            icon={FileListIcon}
          />
        </Col>
        <Col span={6}>
          <OrderStatus
            heading="To be invoiced"
            leftColor="#0097EC"
            rightColor="#003AD2"
            icon={HonourIcon}
          />
        </Col>
        <Col span={6}>
          <OrderStatus
            heading="Completed"
            leftColor="#1FD071"
            rightColor="#00A843"
            icon={CheckBoxCircleIcon}
          />
        </Col>
        <Col span={6}>
          <OrderStatus
            heading="Assigned to me"
            leftColor="#9852F0"
            rightColor="#5900C9"
            icon={UserReceivedIcon}
          />
        </Col>
        <Col span={6}>
          <ProductStatus heading="Out of stock products" icon={HomeIcon} color="#FF2727" />
        </Col>
        <Col span={6}>
          <ProductStatus heading="All products" icon={ShoppingBasketIcon} color="#003AD2" />
        </Col>
        <Col span={6}>
          <ProductStatus heading="Archived products" icon={ArchiveDrawerIcon} color="#00A843" />
        </Col>
        <Col span={6}>
          <ProductStatus heading="Quantity on hand" icon={HandHeartIcon} color="#5900C9" />
        </Col>
        <Col span={12}>
          <SaleTable />
        </Col>
        <Col span={6}>
          <OrderStatus
            heading="To be invoiced"
            leftColor="#0097EC"
            rightColor="#003AD2"
            icon={HonourIcon}
          />
        </Col>
        <Col span={6}>
          <OrderStatus
            heading="To be invoiced"
            leftColor="#0097EC"
            rightColor="#003AD2"
            icon={HonourIcon}
          />
        </Col>
      </Row>
    </div>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
