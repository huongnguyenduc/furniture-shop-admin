import request from '../utils/request';
import { parse } from 'querystring';

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

export async function accountLogin(params) {
  const {username, password} = params;
  const data = {username, password};
  if(username === 'admin')
  return {
    code: 200,
    token: "sdffsd",
    auth: ["ROLE_ADMIN"]
  }
  return {
    code: 200,
    token: "sdffsd",
    auth: ["ROLE_ADMI"]
  }
  return request('http://localhost:8080/auth/login', {
    method: 'POST',
    data,
  }).then(function(response) {
    console.log(response);
    return response;
  }).catch(function(error) {
    console.log(error);
  });
}
