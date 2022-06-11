import {
  getDataProduct,
  addProduct,
  addVariant,
  editProduct,
  editVariant,
  delProduct,
  delVariant,
} from '../services/product';
import { uploader } from '../Utils/uploader';
import { notification } from 'antd';
import { NotificationOutlined } from '@ant-design/icons';
import { router } from 'umi';
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
          console.log(response.content.productId);
          const respon = yield call(addVariant, element);
          if (respon.status !== 200) {
            notification.error({ message: respon.errors });
            break;
          }
        }
        router.goBack();
      } else {
        notification.error({ message: response.errors });
      }
    },
    *editProduct(action, { put, call }) {
      const response = yield call(editProduct, action.payload);
      if (response.status === 200) {
        notification.success({ message: 'Save success' });
      } else {
        notification.error({ message: response.errors });
      }
    },
    *editVariant(action, { put, call }) {
      const response = yield call(editVariant, action.payload);
      if (response.status === 200) {
        notification.success({ message: 'Edit success' });
      } else {
        notification.error({ message: response.errors });
      }
    },
    *delProduct(action, { put, call }) {
      const response = yield call(delProduct, action.payload);
      if (response.status === 200) {
        yield put({
          type: 'deleteProduct',
          payload: action.payload,
        });
        notification.success({ message: 'Detele success' });
      } else {
        notification.error({ message: response.errors });
      }
    },
    *delVariant(action, { put, call }) {
      const response = yield call(delVariant, action.payload);
      if (response.status === 200) {
        yield put({
          type: 'deleteVariant',
          payload: action.payload,
        });
        notification.success({ message: 'Delete success' });
      } else {
        notification.error({ message: response.errors });
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
    deleteProduct(state, action) {
      console.log(action.payload);
      const product = state.products.filter(item => item.productId !== action.payload);
      return {
        ...state,
        products: product,
      };
    },
    deleteVariant(state, action) {
      // update view
      let currProduct = state.view;
      currProduct.variants = currProduct.variants.filter(item => item.variantId !== action.payload);
      console.log(currProduct);
      //update product list
      let productList = state.products.map(obj =>
        obj.productId === currProduct.productId ? { ...obj, variants: currProduct.variants } : obj,
      );
      console.log(productList);
      return {
        ...state,
        view: currProduct,
        products: productList,
      };
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
      const view = state.products.find(product => product.productId === id);
      const newObject = JSON.parse(JSON.stringify(view));
      console.log(newObject);
      return {
        ...state,
        view: newObject,
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
