import { request } from '../Utils/request';
export async function getCategoryList() {
  return await request(`/api/categories?onlyActive=true`);
}