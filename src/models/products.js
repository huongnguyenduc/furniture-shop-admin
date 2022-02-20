export default {
  namespace: 'products',
  state: [
    { name: 'dva', id: 1, code: 'QHB', quantity: 10000, price: 2000, orignalprice:1000 },
    { name: 'Bàn ăn gia đình loại lớn', 
      id: 2,
      code: 'QHB', 
      quantity: 30000, 
      price: 2500, 
      orignalprice:100,
      size: '30mx20mx10m',
      categories: 'Nhà bếp',
      brand: 'IKEA',
      description: 'Đây là mô tả sản phẩm',
      material: 'Đây là chất liệu sản phẩm',
      images : [
        'https://cdn.pixabay.com/photo/2020/02/14/03/20/coffee-4847393__340.jpg',
        'https://cdn.pixabay.com/photo/2020/04/28/13/21/landscape-5104510__340.jpg',
        'https://cdn.pixabay.com/photo/2020/03/21/16/02/sunset-4954402__340.jpg',
      ]
    },
    { name: 'dva', id: 3, code: 'QHB', quantity: 10000, price: 2000, orignalprice:1000 },
    { name: 'dva', id: 4, code: 'QHB', quantity: 10000, price: 2000, orignalprice:1000 },
    { name: 'dva', id: 5, code: 'QHB', quantity: 10000, price: 2000, orignalprice:1000 },
    { name: 'dva', id: 6, code: 'QHB', quantity: 10000, price: 2000, orignalprice:1000 },
    { name: 'dva', id: 7, code: 'QHB', quantity: 10000, price: 2000, orignalprice:1000 },
    { name: 'dva', id: 8, code: 'QHB', quantity: 10000, price: 2000, orignalprice:1000 },
    { name: 'dva', id: 9, code: 'QHB', quantity: 10000, price: 2000, orignalprice:1000 },
    { name: 'dva', id: 10, code: 'QHB', quantity: 10000, price: 2000, orignalprice:1000 },
    { name: 'dva', id: 11, code: 'QHB', quantity: 10000, price: 2000, orignalprice:1000 },
    { name: 'dva', id: 12, code: 'QHB', quantity: 10000, price: 2000, orignalprice:1000 },
    { name: 'dva', id: 13, code: 'QHB', quantity: 10000, price: 2000, orignalprice:1000 },
    { name: 'dva', id: 14, code: 'QHB', quantity: 10000, price: 2000, orignalprice:1000 },
    { name: 'dva', id: 15, code: 'QHB', quantity: 10000, price: 2000, orignalprice:1000 },
    { name: 'dva', id: 16, code: 'QHB', quantity: 10000, price: 2000, orignalprice:1000 },
  ],
  reducers: {
    delete(state, { payload: id }) {
      return state.filter(item => item.id !== id);
    },
  },
};
