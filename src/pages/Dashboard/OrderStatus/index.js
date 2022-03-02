import React from 'react';
import styles from './styles.less';
import { ReactComponent as Arrow } from '../../../assets/icons/arrow-line.svg';
import Icon from '@ant-design/icons';

export const OrderStatus = ({ heading, leftColor, rightColor, icon }) => {
  return (
    <div
      className={styles.orderStatus}
      style={{ backgroundImage: `linear-gradient(to right, ${leftColor}, ${rightColor})` }}
    >
      <div className={styles.heading}>{heading}</div>
      <div className={styles.bigNumber}>56</div>
      <div>Quantity</div>
      <Icon component={icon} className={styles.icon} />
      <Icon component={Arrow} className={styles.forwardIcon} />
    </div>
  );
};
