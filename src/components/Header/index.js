import React, { useState } from 'react';
import { connect, useSelector } from 'dva';
import styles from './styles.less';
import { Menu, Dropdown, Spin, Button, Modal, Form, Input, Upload, Row, Col, Image } from 'antd';
import Icon, { LogoutOutlined, UserOutlined, KeyOutlined, UploadOutlined } from '@ant-design/icons';
import { ReactComponent as DropdownIcon } from '../../assets/icons/arrow-drop-down-line.svg';
import { DEFAULT_AVATAR } from '../../Utils/helper';
import { uploader } from '../../Utils/uploader';
import { ModalProfile } from './Modal';
import {ModalChangePass} from './ModalChangePass'
const Header = props => {
  const { dispatch } = props;
  const [form] = Form.useForm();
  const [modalProfileShowed, setModalProfileShowed] = useState(false);
  const [modalChangePassShowed,setModalChangePassShowed] = useState(false);
  React.useEffect(() => {
    dispatch({
      type: 'profile/getProfile',
    });
  }, [dispatch]);
  var uploading = false;
  const profile = useSelector(state => state.profile.account);
  const [state, setState] = useState({
    imageUrl: '',
  });
  // update Profile
  const resetImage = () => {
    setState({
      ...state,
      imageUrl: '',
    });
  };
  const setImageVariant = async file => {
    uploading = true;
    let url = await uploader(file.file.originFileObj);
    uploading = false;
    setState({
      ...state,
      imageUrl: url,
    });
  };
  const handleCancel = () => {
    setModalProfileShowed(false);
    setModalChangePassShowed(false);
  };
  const onFinish = values => {
    let updateProfile = values;
    updateProfile.username = profile.username;
    updateProfile.imgUrl = state.imageUrl != '' ? state.imageUrl : profile.imgUrl;
    console.log(state.imageUrl);
    dispatch({
      type: 'profile/updateProfile',
      payload: updateProfile,
    });
    setModalProfileShowed(false);
  };
  // handle event menu Click
  const handleMenuClick = e => {
    if (e.key == 1) {
      setModalProfileShowed(true);
    }
    if (e.key == 2) {
      setModalChangePassShowed(true);
    }
    if (e.key == 3) {
      dispatch({ type: 'login/logout' });
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick} className={styles.menu}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        Chỉnh sửa thông tin
      </Menu.Item>
      <Menu.Item key="2" icon={<KeyOutlined />}>
        Đổi mật khẩu
      </Menu.Item>
      <Menu.Item key="3" icon={<LogoutOutlined />}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );
  return (
    <div className={styles.container}>
      <ModalProfile
        onFinish={onFinish}
        onCancle={handleCancel}
        state={state}
        resetImage={resetImage}
        setImageVariant={setImageVariant}
        profile={profile}
        modalShowed={modalProfileShowed}
      />
      <ModalChangePass 
      dispatch={dispatch} 
      onCancle={handleCancel}
      visible={modalChangePassShowed}
      username={profile.username}
      />
      <Dropdown overlay={menu} className={styles.dropdown} trigger={['click']}>
        <Button className={styles.accountButton}>
          <img
            src={profile.imgUrl != null ? profile.imgUrl : DEFAULT_AVATAR}
            alt="avatar"
            className={styles.avatar}
          />
          <div>{profile.firstName != null ? profile.firstName : profile.username}</div>
          <Icon component={DropdownIcon} className={styles.icon} />
        </Button>
      </Dropdown>
    </div>
  );
};

export default connect()(Header);
