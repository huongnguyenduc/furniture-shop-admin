export default {
  namespaces: 'brands',
  state: {
    brandView: {
      brand_id: 1,
      name: 'thương hiệu A',
      description: 'Đây là thương hiệu A',
      is_deleted: 0,
    },
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
  reducers: {
    delete(state, { record }) {
      return state.filter(brand => brand.brand_id === record.brand_id);
    },
  },
};
