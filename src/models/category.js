import { getCategoryList, addCategory, editCategory, delCategory } from '../services/category';
import { notification } from 'antd';

export default {
  namespace: 'category',
  state: {
    categories: [],
    editCategory: {},
  },
  effects: {
    *getCategoryList(action, { put, call }) {
      const response = yield call(getCategoryList);
      console.log(response);
      if (response.status === 200) {
        yield put({
          type: 'saveCategoryList',
          payload: response.content,
        });
      }
    },
    *delCategory(action, { put, call }) {
      const response = yield call(delCategory, action.payload);
      console.log(response);
      if (response.status === 200) {
        yield put({
          type: 'getCategoryList',
          payload: 111,
        });
      } else {
        notification.error({ message: response.errors });
      }
    },
    *addCategory(action, { put, call }) {
      const response = yield call(addCategory, action.payload);
      if (response.status === 200) {
        yield put({
          type: 'getCategoryList',
          payload: 111,
        });
      } else {
        notification.error({ message: response.errors });
      }
    },
    *editCategory(action, { put, call }) {
      const response = yield call(editCategory, action.payload);
      if (response.status === 200) {
        yield put({
          type: 'getCategoryList',
          payload: 111,
        });
      } else {
        notification.error({ message: response.errors });
      }
    },
  },
  reducers: {
    saveCategoryList(state, action) {
      console.log(action.payload);
      return {
        ...state,
        categories: action.payload,
      };
    },
    setEdit(state, action) {
      return {
        ...state,
        editCategory: action.payload,
      };
    },
  },
};
