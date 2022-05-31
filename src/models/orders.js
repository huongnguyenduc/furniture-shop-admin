import {getOrderList,editOrder,delOrder  } from '../services/orders';
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
    },
    *deleteOrder({payload}, {put,call}) {
      yield call(delOrder,payload);
      const orderId = payload;
      yield put ({
        type: 'delete',
        payload: orderId
      });
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
      },
      delete(state, action) {
        console.log(action.payload);
        return { ...state, orders: state.orders.filter(order => order.orderId != action.payload) };
      },
  },
};
