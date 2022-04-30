import {getCategoryList} from '../services/category';
import { notification } from 'antd';
export default {
  namespace: 'category',
  state: {
    categories: [
      {
        id: 1,
        name: 'Bàn ăn',
        description: 'Đây là mô tả chớ cũng không có chi',
        options: [
          { option_id: 1, option_name: 'Loại chân' },
          { option_id: 2, option_name: 'Chất liệu hoàn thiện' },
          { option_id: 3, option_name: 'Loại khung' },
          { option_id: 4, option_name: 'Chất liệu mặt bàn' },
        ],
      },
      {
        id: 2,
        name: 'Điện thoại',
        description: 'Đây là mô tả chớ cũng không có chi',
        options: [
          { option_id: 1, option_name: 'Vi xử lý' },
          { option_id: 2, option_name: 'RAM' },
          { option_id: 3, option_name: 'Độ phân giải' },
          { option_id: 4, option_name: 'Bộ nhớ' },
        ],
      },
      {
        id: 3,
        name: 'Màn hình',
        description: 'Đây là mô tả chớ cũng không có chi',
        options: [
          { option_id: 1, option_name: 'Vi xử lý' },
          { option_id: 2, option_name: 'RAM' },
          { option_id: 3, option_name: 'Độ phân giải' },
          { option_id: 4, option_name: 'Bộ nhớ' },
        ],
      },
    ],
  },
  effects: {
    *getCategoryList(action, {put, call}) {
      const response = yield call(getCategoryList);
      console.log(response)
      if(response.status === 200) {
        yield put({
          type: 'saveCategoryList',
          payload: response.content
        })
      }
    }
  },
  reducers: {
    saveProductList(state, action) {
      console.log(action.payload)
      return {
        ...state,
        categories: action.payload
      }
    }
  }
};
