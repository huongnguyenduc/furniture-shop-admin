import { request } from '../Utils/request';
export async function getDataBrand() {
  return await request(`/api/brands?onlyActive=true`);
}
export async function addBrand(payload) {
  const { brandName, description } = payload;
  const formData = new FormData();
  formData.append(brandName, 'brandName');
  formData.append(description, 'description');
  return request(`/api/brand`, {
    method: 'POST',
    data: formData,
  });
}
