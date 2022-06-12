import { getCustomers, getStaffs,addUser, blockAccount, delAccount } from '../services/user';
import { notification } from 'antd';
export default {
  namespace: 'user',
  state: {
    staffs: [],
    customers: [],
  },
  effects: {
    *getUsers(action, { put, call }) {
        yield put({
            type: 'getCustomers'
        })
        yield put({
            type: 'getStaffs'
        })
    },
    *getCustomers(action, { put, call }) {
      const response = yield call(getCustomers);
      if (response.status === 200) {
        yield put({
          type: 'saveCustomers',
          payload: response.content,
        });
        console.log(response.content);
      }
    },
    *getStaffs(action, { put, call }) {
      const response = yield call(getStaffs);
      if (response.status === 200) {
        yield put({
          type: 'saveStaffs',
          payload: response.content,
        });
      }
    },
    *createUser(action, {put, call}) {
      const response = yield call(addUser, action.payload);
      console.log(response);
      if (response.status === 201) {
        notification.success({
          message: 'Create success'
        })
      } else {
        notification.error({
          message: response.errors
        })
      }
    },
    *lockAccount(action, {put, call}) {
      const response = yield call(blockAccount, action.payload);
      if (response.status === 200) {
        notification.success({
          message: 'Update success'
        })
      } else {
        notification.error({
          message: response.errors
        })
      }
    },
    *delUser(action, {put, call}) {
      const response = yield call(delAccount, action.payload);
      if (response.status === 200) {
        yield put({ type: 'delete', payload: action.payload }); 
        notification.success({
          message: 'Delete success'
        })
      } else {
        notification.error({
          message: response.errors
        })
      }
    }
  },
  reducers: {
    saveCustomers(state, action) {
      return {
        ...state,
        customers: action.payload,
      };
    },
    saveStaffs(state, action) {
      return {
        ...state,
        staffs: action.payload,
      };
    },
    delete(state, action) {
      console.log(action.payload);
      return { ...state, staffs: state.staffs.filter(user => user.username != action.payload) };
    },
  },
};
