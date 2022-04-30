export default {
    namespace: 'imports',
    state: { 
        loading: false,
        imports: [
        { 
            id: 1,
            username: 'Bùi Minh Huy', 
            description: 'Đây là ghi chú nhập hàng',
            total_price: 1350000000, 
            create_day:"20/10/2021",
            items : [
              {
                  product_id: 12,
                  variant_id: 1,
                  quantity: 100,
                  orignal_price: 10,
                  price: 100000
              },
              {
                product_id: 12,
                variant_id: 2,
                quantity: 50,
                orignal_price: 10,
                price: 170000
              },
              {
                product_id: 12,
                variant_id: 3,
                quantity: 100,
                orignal_price: 10,
                price: 200000
              },
            ]
        },
        { 
            id: 2,
            username: 'Ngô Dương Kha', 
            description: 'Đây là ghi chú nhập hàng',
            total_price: 250000000, 
            create_day:"20/10/2021",
            items : [
              {
                  product_id: 12,
                  variant_id: 1,
                  quantity: 100,
                  orignal_price: 10,
                  price: 100000
              },
              {
                product_id: 12,
                variant_id: 2,
                quantity: 50,
                orignal_price: 10,
                price: 170000
              },
              {
                product_id: 12,
                variant_id: 3,
                quantity: 100,
                orignal_price: 10,
                price: 200000
              },
            ]
        },
     
    ],
},
    reducers: {
      delete(state, { payload: id }) {
        return state.filter(item => item.id !== id);
      },
      createNewImport(state, { payload}) {
        return {
          ...state,
          newimport: payload.item,
        };
      },
    },
  };
  