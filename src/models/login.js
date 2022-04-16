import { stringify } from 'querystring';
import { history, router } from 'umi';
import { accountLogin, getPageQuery } from '../services/login';

const Model = {
  namespace: 'login',   
  state: {},   

  effects: {    
    *login({ payload }, { call, put }) {
      const response = yield call(accountLogin, payload);

      if (response.code === 200) {
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
        redirect = redirect === 'login'? '/':redirect;
        router.push(redirect || '/');
      }
    },

    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("roles");
     
      if (window.location.pathname !== '/login') {
        router.replace({
          pathname: '/login',
          search: stringify({
            redirect: window.location.href
          }),
        });
      }
    },
  },

  reducers: {  
    changeLoginStatus(state, { payload }) {
      // localStorage.setItem("token", payload.data.token);
      // localStorage.setItem("roles", payload.data.auth);
      localStorage.setItem("token", "cc");
      localStorage.setItem("roles", JSON.stringify(payload.auth));
      //console.log(`login, ${payload.data.auth}`);
      return { ...state};
    },
  },
};
export default Model;
