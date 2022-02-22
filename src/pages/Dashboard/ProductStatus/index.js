import React from 'react';
import styles from './styles.less';
import { ReactComponent as Arrow } from '../../../assets/icons/arrow-drop-down-line.svg';
import Icon from '@ant-design/icons';

export const ProductStatus = ({ heading, icon, color }) => {
  return (
    <div className={styles.productStatus}>
      <div className={styles.heading}>
        <Icon component={icon} className={styles.icon} style={{color: color, backgroundColor:`${color}16`}} />
        <div>{heading}</div>
      </div>
      <div className={styles.body}>
        <div className={styles.number}>89.00</div>
        <Icon component={Arrow} className={styles.forwardIcon} /> 
        
      </div>
    </div>
  );
};
