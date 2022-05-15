import {
  getDataProduct,
  addProduct,
  addVariant,
  getDataVariant,
} from '../services/product';
import { uploader } from '../Utils/uploader';
import { notification } from 'antd';
import request from 'umi-request';
export default {
  namespace: 'products',
  state: {
    products: [],
    variants: [],
    view: {
      productId: 1,
      productName: 'Sloan Left Chaise Sleeper Sectional',
      categoryId: 5,
      categoryName: 'Sleeper Sectional',
      brandId: 1,
      brandName: 'Sloan',
      productDesc: null,
      image:
        'https://content.cylindo.com/api/v2/4472/products/SLON.FABRIC.SECT.SSLEFT/frames/1/SLON.FABRIC.SECT.SSLEFT.JPG?background=FFFFFF&feature=COLOR:BI-132&feature=FINISH:LEG007-1&feature=CHAISE%20LENGTH:CHAISE-63&feature=CUSHIONS:CUSHION-2&feature=BED:BED_IN',
      variants: [
        {
          variantId: 1,
          sku: 'SLON.FABRIC.SECT.SSLEFT - BI-132 - Leg007-1',
          price: 3245,
          importPrice: 1000,
          quantity: 10,
          image:
            'https://content.cylindo.com/api/v2/4472/products/SLON.FABRIC.SECT.SSLEFT/frames/1/SLON.FABRIC.SECT.SSLEFT.JPG?background=FFFFFF&feature=COLOR:BI-132&feature=FINISH:Leg007-1&feature=CHAISE%20LENGTH:CHAISE-63&feature=CUSHIONS:CUSHION-2&feature=BED:BED_IN',
          options: [
            {
              optionId: 1,
              optionName: 'Chất liệu',
              optionValue: 'Opal',
            },
            {
              optionId: 2,
              optionName: 'Chất liệu chân',
              optionValue: 'Oiled Walnut',
            },
          ],
        },
      ],
    },
  },
  effects: {
    *getVariantList(action, { put, call }) {
      const response = yield call(getDataVariant);
      console.log(response.content);
      if (response.status === 200) {
        yield put({
          type: 'saveVariantList',
          payload: response.content,
        });
      }
    },
    *getProductList(action, { put, call }) {
      const response = yield call(getDataProduct);
      console.log(response);
      if (response.status === 200) {
        yield put({
          type: 'saveProductList',
          payload: response.content,
        });
      }
    },
    *addProduct(action, { put, call }) {
      const response = yield call(addProduct, action.payload);
      console.log(response);
      if (response.status === 200) {
        
        for (var element of action.payload.variants) {
          element['productId'] = response.content.productId;
          console.log(response.content.productId)
          const respon = yield call(addVariant, element);
          if (respon.status !== 200) {
            notification.error({ message: respon.content });
            break;
          }
        }
      } else {
        notification.error({ message: response.content });
      }
    },
    *setView({ payload: id }, { put, call }) {
      yield put({
        type: 'setViewProduct',
        payload: id,
      });
    },
  },
  reducers: {
    delete(state, { payload: id }) {
      return state.filter(item => item.id !== id);
    },
    saveProductList(state, action) {
      return {
        ...state,
        products: action.payload,
        view: action.payload[0],
      };
    },
    saveVariantList(state, action) {
      return {
        ...state,
        variants: action.payload,
      };
    },
    setViewProduct(state, { payload: id }) {
      const view = state.products.find(product => {
        if (product.productId === id) return product;
      });
      return {
        ...state,
        view: view,
        isShowModal: true,
      };
    },
    setHidden(state) {
      return {
        ...state,
        isShowModal: false,
      };
    },
  },
};
