// ref: https://umijs.org/config/
export default {
  theme: {
    '@background-input': '#EDF2F7',
    'font-family': 'Open Sans, serif',
  },
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        {
          path: '/dashboard',
          component: './Dashboard/index',
        },
        {
          path: '/products',
          component: './Products/index',
        },
        {
          path: '/products/create',
          component: './Products/createProduct/index',
        },
        {
          path: '/brands',
          component: './Brands/index',
        },
        {
          path: '/brands/create',
          component: './Brands/createBrand/index',
        },
        {
          path: '/brands/edit',
          component: './Brands/editBrand/index',
        },
        {
          path: '/imports',
          component: './Import/index',
        },
        {
          path: '/imports/create',
          component: './Import/createImport/index',
        },
        {
          path: '/report',
          component: './Report/index',
        },
        {
          path: '/',
          component: './Dashboard/index',
        },
      ],
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: {
          webpackChunkName: true,
        },
        title: 'furniture-shop-admin',
        dll: true,
        locale: {
          enable: true,
          default: 'en-US',
        },
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
};
