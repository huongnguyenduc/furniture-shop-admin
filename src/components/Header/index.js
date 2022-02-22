import React from 'react';
import styles from './styles.less';
import avatar from '../../assets/images/img_avatar.png';
import { Menu, Dropdown, Button, message } from 'antd';
import Icon, { LogoutOutlined } from '@ant-design/icons';
import { ReactComponent as DropdownIcon } from '../../assets/icons/arrow-drop-down-line.svg';

function handleMenuClick(e) {
  message.info('Click on menu item.');
  console.log('click', e);
}

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1" icon={<LogoutOutlined />}>
      Đăng xuất
    </Menu.Item>
  </Menu>
);

const Header = () => {
  return (
    <div className={styles.container}>
      <Dropdown overlay={menu}>
        <Button className={styles.accountButton}>
          <img src={avatar} alt="avatar" className={styles.avatar} />
          <div>Mohammad Hosen</div>
          <Icon component={DropdownIcon} className={styles.icon} />
        </Button>
      </Dropdown>
    </div>
  );
};

export default Header;
