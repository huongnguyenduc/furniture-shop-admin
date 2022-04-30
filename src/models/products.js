import { getDataProduct, addProduct, addVariant } from '../services/product';
import {uploader} from '../Utils/uploader';
import { notification } from 'antd';
export default {
  namespace: 'products',
  state: {
    products: [],
    view: {
      product_id: 1,
      product_name: 'Sloan Left Chaise Sleeper Sectional',
      category_id: 5,
      category_name: 'Sleeper Sectional',
      brand_id: 1,
      brand_name: 'Sloan',
      description: null,
      image_url:
        'https://content.cylindo.com/api/v2/4472/products/SLON.FABRIC.SECT.SSLEFT/frames/1/SLON.FABRIC.SECT.SSLEFT.JPG?background=FFFFFF&feature=COLOR:BI-132&feature=FINISH:LEG007-1&feature=CHAISE%20LENGTH:CHAISE-63&feature=CUSHIONS:CUSHION-2&feature=BED:BED_IN',
      variants: [
        {
          variant_id: 1,
          sku: 'SLON.FABRIC.SECT.SSLEFT - BI-132 - Leg007-1',
          price: 3245,
          import_price: 1000,
          quantity: 10,
          image_url:
            'https://content.cylindo.com/api/v2/4472/products/SLON.FABRIC.SECT.SSLEFT/frames/1/SLON.FABRIC.SECT.SSLEFT.JPG?background=FFFFFF&feature=COLOR:BI-132&feature=FINISH:Leg007-1&feature=CHAISE%20LENGTH:CHAISE-63&feature=CUSHIONS:CUSHION-2&feature=BED:BED_IN',
          options: [
            {
              option_id: 1,
              option_name: 'Chất liệu',
              option_value: 'Opal',
            },
            {
              option_id: 2,
              option_name: 'Chất liệu chân',
              option_value: 'Oiled Walnut',
            },
          ],
        },
      ],
    },
  },
  effects: {
    *getProductList(action, { put, call }) {
      const response = yield call(getDataProduct);
      console.log(response)
      if (response.status === 200) {
        yield put({
          type: 'saveProductList',
          payload: response.content,
        });
      }
    },
    *addProduct(action, { put, call }) {
      action.payload.image_url = yield uploader(action.payload.image_file)
      const response = yield call(addProduct, action.payload);
      if (response.status === 200) {
        for (var element of action.payload.variants) {
          element.image_url = yield uploader(element.image_file[0]);
          for(var option of element.options) {
            option.option_image_url = yield uploader(option.option_image[0]);
          }
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
    setViewProduct(state, { payload: id }) {
      const view = state.products.find(product => {
        if (product.product_id === id) return product;
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
