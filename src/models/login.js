import { stringify } from 'querystring';
import { history, router } from 'umi';
import { accountLogin, getPageQuery } from '../services/login';
import { message } from 'antd';
const Model = {
  namespace: 'login',
  state: {},

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(accountLogin, payload);
      if (response.status === 200) {
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();

        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
        redirect = redirect === 'login' ? '/' : redirect;
        router.push(redirect || '/');
      }
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('roles');

      if (window.location.pathname !== '/login') {
        router.replace({
          pathname: '/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      const now = new Date();

      // `item` is an object which contains the original value
      // as well as the time when it's supposed to expire
      const item = {
        value: payload.content,
        expiry: now.getTime() + 86400 * 1000,
      };
      localStorage.setItem('token', JSON.stringify(item));
      localStorage.setItem('roles', JSON.stringify(payload.auth));
      //console.log(`login, ${payload.data.auth}`);
      return { ...state };
    },
  },
};
export default Model;
