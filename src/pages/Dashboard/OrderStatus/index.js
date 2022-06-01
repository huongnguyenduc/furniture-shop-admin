import React from 'react';
import styles from './styles.less';
import { ReactComponent as Arrow } from '../../../assets/icons/arrow-line.svg';
import Icon from '@ant-design/icons';
import { Button } from 'antd';

export const OrderStatus = ({ heading, tailing, leftColor, rightColor, icon, value, onClick }) => {
  return (
    <div
      className={styles.orderStatus}
      style={{ backgroundImage: `linear-gradient(to right, ${leftColor}, ${rightColor})` }}
    >
      <div className={styles.heading}>{heading}</div>
      <div className={styles.bigNumber}>{value}</div>
      <div className={styles.heading}>{tailing}</div>
      <Icon component={icon} className={styles.icon} />
      <div className={styles.forwardIcon} onClick={onClick}>
        <Icon component={Arrow} />
      </div>
    </div>
  );
};
