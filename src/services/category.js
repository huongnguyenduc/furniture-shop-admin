import { request } from '../Utils/request';
export async function getCategoryList() {
  return await request(`/api/website/categories?onlyActive=true`);
}
export function addCategory(payload) {
  return request(`/api/categories`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
export function editCategory(payload) {
  return request(`/api/categories`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}
export function delCategory(payload) {
  return request(`/api/categories/${payload}`, {
    method: 'DELETE',
  });
}
