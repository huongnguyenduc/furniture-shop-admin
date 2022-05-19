import { request } from '../Utils/request';
import { parse } from 'querystring';

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

export async function accountLogin(params) {
  var response = await request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(params),
  });

  response['auth'] = ['ROLE_ADMIN'];
  console.log(response);
  return response;
}
