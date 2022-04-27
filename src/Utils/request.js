/* eslint-disable no-underscore-dangle */
/* eslint-disable no-empty */
/**
 * request
 * api: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';
//import { getToken } from '@/utils/authority';
import { router } from 'umi';

class Response {
  data = null;

  status = null;

  message = null;

  constructor(response) {
    console.log(response.content);
    if (response.status) {
      this.status = response.status;
    }
    if (response.content) {
      this.data = response.content;
    }
    if (response.message && response.message !== '') {
      this.message = response.message;
    }
    if (this.status === null && this.data === null && this.message === null) {
      this.data = response;
      this.message = response;
      this.status = 200;
    }
  }

  get isSuccess() {
    return this.status === 200;
  }

  getErrorMessage(defaultMessage = 'Something went wrong!') {
    return this.message || defaultMessage;
  }
}

const errorHandler = async error => {
  const { response = {}, data } = error;
  const { status } = response;

  if (status === 401) {
    notification.error({
      message: 'Please login to do this',
    });
    /* eslint-disable no-underscore-dangle */
    //  window.g_app._store.dispatch({
    //    type: 'login/logout',
    //  });
  }
  // environment should not be used
  if (status === 403) {
    let messageError = 'You are not allowed to access this page';
    if (typeof response.json === 'function') {
      const { message } = await response.json();
      messageError = message || messageError;
    }
    if (/^\/admin/.test(window.location.pathname)) {
      router.push({ pathname: '/admin/403', state: { message: messageError } });
    } else {
      notification.error({
        message: messageError,
      });
    }
    notification.destroy();
    //  window.g_app._store.dispatch({
    //    type: 'user/fetchCurrent',
    //  });
  }

  if (status <= 504 && status >= 500) {
    notification.error({
      message: 'Please try login again, contact admin if you still see this message',
    });
    // window.g_app._store.dispatch({
    //   type: 'login/logout',
    // });
  }

  if (status > 404 && status < 422) {
    notification.error({
      message: `Error ${status}`,
    });
  }

  if (status === 404) return new Response({ status: data.meta });

  if (status === 400) {
    return new Response({ status: data.meta });
  }
  return new Response({ status: { ok: false } });
};

const request = extend({
  errorHandler,
  credentials: 'omit',
  prefix: 'https://uit-furniture-shop.herokuapp.com',
});

request.interceptors.request.use(
  (url, options) => {
    const authority = localStorage.getItem('token');
    const timezone = Intl ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'Asia/Saigon';
    return {
      url,
      options: {
        ...options,
        headers: {
          timezone,
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: (authority && `Bearer ${authority}`) || undefined,
        },
      },
    };
  },
  { global: false },
);

request.interceptors.response.use(async (response, options) => {
  //  if (response.ok) {
  //    if (options.responseType === 'blob') {
  //      try {
  //        const blob = await response.clone().blob();
  //        return new Response({ data: blob });
  //      } catch (error) {}
  //    }
  //    try {
  //      const json = await response.clone().json();
  //      const myResponse = new Response(json);
  //      return myResponse;
  //    } catch (error) {}
  //    try {
  //      const text = await response.clone().text();
  //      return new Response({ data: text });
  //    } catch (error) {}
  //  }
  return response;
});

const getRequest = options => {
  return extend({
    ...request,
    ...options,
    prefix: 'https://uit-furniture-shop.herokuapp.com',
  });
};

const requestUpload = extend({
  errorHandler,
  credentials: 'include',
  prefix: 'https://uit-furniture-shop.herokuapp.com',
});

requestUpload.interceptors.request.use(
  (url, options) => {
    const authority = localStorage.getItem('token');
    const timezone = Intl ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'Asia/Saigon';
    return {
      url,
      options: {
        ...options,
        headers: {
          timezone,
          Authorization: (authority && `Bearer ${authority}`) || undefined,
        },
      },
    };
  },
  { global: false },
);

export { request, requestUpload };
export { getRequest, Response };
