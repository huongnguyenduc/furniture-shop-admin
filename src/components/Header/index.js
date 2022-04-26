import React from 'react';
import { connect } from 'dva';
import styles from './styles.less';
import avatar from '../../assets/images/img_avatar.png';
import { Menu, Dropdown, Button, message } from 'antd';
import Icon, { LogoutOutlined } from '@ant-design/icons';
import { ReactComponent as DropdownIcon } from '../../assets/icons/arrow-drop-down-line.svg';


const Header = props => {
  const {dispatch} = props;
  const handleMenuClick = () => {
    dispatch({ type: "login/logout" });
  }
  
  const menu = (
    <Menu onClick={handleMenuClick} className={styles.menu}>
      <Menu.Item key="1" icon={<LogoutOutlined />}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );
  return (
    <div className={styles.container}>
      <Dropdown overlay={menu} className={styles.dropdown} trigger={['click']}>
        <Button className={styles.accountButton}>
          <img src={avatar} alt="avatar" className={styles.avatar} />
          <div>Mohammad Hosen</div>
          <Icon component={DropdownIcon} className={styles.icon} />
        </Button>
      </Dropdown>
    </div>
  );
};

export default connect() (Header) ;
