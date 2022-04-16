export default {
  namespace: 'products',
  state: {
  productview: { 
    name: 'Bàn ăn gia đình loại lớn', 
    product_id: 1, 
    variant_id: 1, 
    code: 'QHB', 
    quantity: 10000, 
    price: 2000, 
    orignalprice:1000,
   
    images : [
          'https://cdn.pixabay.com/photo/2020/02/14/03/20/coffee-4847393__340.jpg',
          'https://cdn.pixabay.com/photo/2020/04/28/13/21/landscape-5104510__340.jpg',
          'https://cdn.pixabay.com/photo/2020/03/21/16/02/sunset-4954402__340.jpg',
        ] 
  },
  products:  [
    { name: 'dva', 
      product_id: 1, 
      variant_id: 1, 
      code: 'QHB', 
      quantity: 10000, 
      price: 2000, 
      orignalprice:1000,
      images : [
        'https://cdn.pixabay.com/photo/2020/02/14/03/20/coffee-4847393__340.jpg',
        'https://cdn.pixabay.com/photo/2020/04/28/13/21/landscape-5104510__340.jpg',
        'https://cdn.pixabay.com/photo/2020/03/21/16/02/sunset-4954402__340.jpg',
      ] 
    },
    { 
      name: 'Bàn ăn gia đình loại lớn', 
      product_id: 2,
      variant_id: 1,
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
    { 'name': 'Bàn ăn gia đình loại lớn', 
      product_id: 3,
      variant_id: 1,
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
    { name: 'dva', 
      product_id: 4, 
      variant_id: 1, 
      code: 'QHB', 
      quantity: 10000, 
      price: 2000, 
      orignalprice:1000,
      images : [
        'https://cdn.pixabay.com/photo/2020/02/14/03/20/coffee-4847393__340.jpg',
        'https://cdn.pixabay.com/photo/2020/04/28/13/21/landscape-5104510__340.jpg',
        'https://cdn.pixabay.com/photo/2020/03/21/16/02/sunset-4954402__340.jpg',
      ] 
    },
    { name: 'dva', 
      product_id: 5, 
      variant_id: 1, 
      code: 'QHB', 
      quantity: 10000, 
      price: 2000, 
      orignalprice:1000,
      images : [
        'https://cdn.pixabay.com/photo/2020/02/14/03/20/coffee-4847393__340.jpg',
        'https://cdn.pixabay.com/photo/2020/04/28/13/21/landscape-5104510__340.jpg',
        'https://cdn.pixabay.com/photo/2020/03/21/16/02/sunset-4954402__340.jpg',
      ] 
    },
    { name: 'dva', 
      product_id: 6, 
      variant_id: 1, 
      code: 'QHB', 
      quantity: 10000, 
      price: 2000, 
      orignalprice:1000,
      images : [
        'https://cdn.pixabay.com/photo/2020/02/14/03/20/coffee-4847393__340.jpg',
        'https://cdn.pixabay.com/photo/2020/04/28/13/21/landscape-5104510__340.jpg',
        'https://cdn.pixabay.com/photo/2020/03/21/16/02/sunset-4954402__340.jpg',
      ] 
    },
  ], 
  },
  reducers: {
    delete(state, { payload: id }) {
      return state.filter(item => item.id !== id);
    },
  setViewProduct(state, { payload }) {
    const view  = state.products.map(product => {
      if(product.product_id === payload.id) 
        return product;
      return null;
    });
    return {
     ...state,
     productview: view,
    }; 
  },
  },
};
