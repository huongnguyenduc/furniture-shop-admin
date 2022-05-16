import { Redirect } from 'umi';
import React from 'react';

function getWithExpiry(key) {
  const itemStr = localStorage.getItem(key);
  // if the item doesn't exist, return null
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  if (item?.expiry === undefined) return null;
  if (item?.value === undefined) return null;
  const now = new Date();
  // compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage
    // and return null
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}
export default props => {
  const token = getWithExpiry('token');
  if (!token) return <Redirect to="/login" />;
  const isLogin = localStorage.getItem('roles') !== null;
  if (isLogin) {
    let roles = JSON.parse(localStorage.getItem('roles'));
    roles = typeof roles === 'string' ? [roles] : roles;
    const isAuthorized = roles.indexOf('ROLE_ADMIN') !== -1;
    if (isAuthorized) {
      return <div>{props.children}</div>;
    }
  }
  return <Redirect to="/login" />;
};
