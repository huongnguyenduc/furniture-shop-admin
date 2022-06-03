import { getDataBrand, addDataBrand, delDataBrand, updateDataBrand } from '../services/brand';
export default {
  namespaces: 'brands',
  state: {
    brands: [
      {
        brand_id: 1,
        name: 'thương hiệu A',
        description: 'Đây là thương hiệu A',
        is_deleted: 0,
      },
      {
        brand_id: 2,
        name: 'thương hiệu B',
        description: 'Đây là thương hiệu B',
        is_deleted: 0,
      },
      {
        brand_id: 3,
        name: 'thương hiệu C',
        description: 'Đây là thương hiệu C',
        is_deleted: 0,
      },
    ],
  },
  effects: {
    //get brand
    *getBrandList(action, { put, call }) {
      const response = yield call(getDataBrand);
      if (response.status === 200) {
        yield put({
          type: 'saveBrandList',
          payload: response.content,
        });
      }
    },
    //add brand
    *addBrand({ payload }, { put, call }) {
      const data = yield call(addDataBrand, payload);
      yield put({
        type: 'createBrand',
        payload: data,
      });
    },
    //update brand
    *updateBrand({ payload }, { put, call }) {
      const data = yield call(updateDataBrand, payload);
      yield put({
        type: 'editBrand',
        payload: data,
      });
    },
    //delete brand
    *deleteBrand({ payload }, { put, call }) {
      yield call(delDataBrand, payload);
      const brandId = payload;
      yield put({ type: 'delete', payload: brandId });
    },
  },
  reducers: {
    createBrand(state, action) {
      console.log('da create');
      const brand = {
        brandName: action.payload.content.brandName,
        brandId: action.payload.content.brandId,
        brandDesc: action.payload.content.brandDesc,
      };
      const newStateBrands = [...state.brands];
      newStateBrands[state.brands.length] = brand;
      console.log(newStateBrands);
      return { ...state, brands: newStateBrands };
    },
    editBrand(state, { payload }) {
      const brandId = payload.content.brandId;
      const newStateItems = [...state.brands];
      const index = newStateItems.findIndex(brand => brand.brandId === brandId);
      newStateItems[index] = payload.content;
      return { ...state, brands: newStateItems };
    },

    saveBrandList(state, action) {
      return {
        ...state,
        brands: action.payload,
      };
    },
    delete(state, action) {
      console.log(action.payload);
      return { ...state, brands: state.brands.filter(brand => brand.brandId != action.payload) };
    },
  },
};
