import { getDataBrand, addDataBrand, delDataBrand, updateDataBrand } from '../services/brand';
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
    *addBrand({ payload }, { put, call }) {
      const { data } = yield call(addDataBrand, payload);
      if (data) {
        yield put({
          type: 'createBrand',
          payload: data,
        });
      }
    },
    //update brand
    *updateBrand({ payload }, { put, call }) {
      console.log(payload);
      const data = yield call(updateDataBrand, payload);
      yield put({
        type: 'editBrand',
        payload: data,
      });
    },
    //delete brand
    *deleteBrand({ payload }, { put, call }) {
      yield call(delDataBrand, payload);
      const brandId = payload.brandId;
      yield put({ type: 'delBrand', payload: brandId });
    },
  },
  reducers: {
    createBrand(state, { payload }) {
      const brand = {
        brandName: payload.brandName,
        brandId: payload.brandId,
        brandDesc: payload.brandDesc,
      };
      const newStateBrands = [...state.brands];
      newStateBrands[state.items.length] = brand;
      return { ...state, brands: newStateBrands };
    },
    editBrand(state, { payload }) {
      const { brandId } = payload;
      const newStateItems = [...state.brands];
      const index = newStateItems.findIndex(brand => brand.brandId === brandId);
      newStateItems[index] = payload;
      return { ...state, brands: newStateItems };
    },
    delBrand(state, { payload }) {
      const previousState = state.brands;
      const newState = previousState.filter(brand => brand.brandId !== payload);
      return { ...state, brands: newState };
    },
    saveBrandList(state, action) {
      return {
        ...state,
        brands: action.payload,
      };
    },
    delete(state, action) {
      return { ...state, brands: state.filter(brand => brand.brandId !== action.payload.brandId) };
    },
  },
};
