import React from 'react'
import { Image } from 'antd';
import styles from './styles.less';
const CustomerItem = props => {
  const {url, name, email } = props;
  return (
    <div className={styles.itemContainer}>
     <Image className={styles.avatar} src={url} width={40}/>
     <div className={styles.infor}>
       <p className={styles.name}>{name}</p>
       <p className={styles.email}>{email}</p>
     </div>
    </div>
  )
}

export default CustomerItem