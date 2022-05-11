import { getDataBrand } from '../services/brand';
export default {
  namespaces: 'brands',
  state: {
    brandView: {
      brand_id: 1,
      name: 'thương hiệu A',
      description: 'Đây là thương hiệu A',
      is_deleted: 0,
    },
    brands: [],
  },
  effects: {
    //get brand
    *getBrandList(action, { put, call }) {
      const response = yield call(getDataBrand);
      console.log(response.content);
      if (response.status === 200) {
        yield put({
          type: 'saveBrandList',
          payload: response.content,
        });
      }
    },
    //add brand
    *addBrand(state, action) {},
  },
  reducers: {
    saveAddBrand(state, action) {
      return {
        ...state,
        
      }
    }, 
    saveBrandList(state, action) {
      return {
        ...state,
        brands: action.payload,
      };
    },
    delete(state, { payload: id }) {
      return state.filter(item => item.id !== id);
    },
  },
};
