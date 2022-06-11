import { createImport, getImports } from '../services/import';
import { notification } from 'antd';
import { router } from 'umi';

export default {
  namespace: 'imports',
  state: {
    loading: false,
    imports: [],
  },
  effects: {
    *getImports(_action, { put, call }) {
      const response = yield call(getImports);
      console.log(response.content);
      if (response.status === 200) {
        yield put({
          type: 'saveImports',
          payload: response.content,
        });
      }
    },
    *createImport(action, { put, call }) {
      const response = yield call(createImport, action.payload);
      if (response.status === 200) {
        notification.success({ message: 'Create import success' });
        router.goBack();
      } else {
        console.log(response)
        notification.error({ message: response.errors });
      }
    },
  },
  reducers: {
    delete(state, { payload: id }) {
      return state.filter(item => item.id !== id);
    },
    saveImports(state, action) {
      return {
        ...state,
        imports: action.payload
      }
    }
  },
};
