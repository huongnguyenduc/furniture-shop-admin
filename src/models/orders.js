import {getOrderList,editOrder  } from '../services/orders';
import { notification } from 'antd';

export default {
  namespace: 'orders',
  state: {
    orders: [],
    orderDetail: {},
  },
  effects: {
    *getOrderList(action, { put, call }) {
      const response = yield call(getOrderList);
      if (response.status === 200) {
        yield put({
          type: 'saveOrderList',
          payload: response.content,
        });
      }
    },
    *updateStatus(action, {put,call}) {
      const response = yield call(editOrder,action.payload);
      if (response.status !== 200) {
        notification.error({
          message: 'Update không thành công!'
        })
      }
    }
  },
  reducers: {
    saveOrderList(state, action) {
        return {
          ...state,
          orders: action.payload,
        };
      },
      setviewDetail(state,action) {
        return {
          ...state,
          orderDetail: action.payload
        }
      }
  },
};
