import { getDataPulseDetail } from '../services/product';
import { notification } from 'antd';
export default {
  namespace: 'products',
  state: {
    productview: {
      name: 'Bàn ăn gia đình loại lớn',
      product_id: 1,
      category_id: 1,
      categories: 'Nhà bếp',
      brand_id: 1,
      brand: 'IKEA',
      description: 'Đây là mô tả sản phẩm',
      image_url: 'https://cdn.pixabay.com/photo/2020/02/14/03/20/coffee-4847393__340.jpg',
      variants: [
        {
          variant_id: 1,
          image_url: [
            'Ảnh',
            'https://cdn.pixabay.com/photo/2020/04/28/13/21/landscape-5104510__340.jpg',
          ],
          name: ['Tên', 'c'],
          RAM: ['RAM', '8G'],
          gianhap: ['Giá nhập', '1000000'],
          giaban: ['Giá bán', '2000000'],
          soluong: ['Số lượng', '1000'],
        },
        {
          variant_id: 2,
          image_url: [
            'Ảnh',
            'https://cdn.pixabay.com/photo/2020/03/21/16/02/sunset-4954402__340.jpg',
          ],
          name: ['Tên', 'c'],
          RAM: ['RAM', '8G'],
          gianhap: ['Giá nhập', '1000000'],
          giaban: ['Giá bán', '2000000'],
          soluong: ['Số lượng', '1000'],
        },
      ],
    },
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
    isShowModal: false,
  },
  effects: {
    *getProductList(action, { put, call }) {
      const response = yield call(getDataPulseDetail);
      if (response.status === 200) {
        yield put({
          type: 'saveProductList',
          payload: response.content,
        });
      } else {
        notification.error({ message: response.message });
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
