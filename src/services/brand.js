import { request } from '../Utils/request';
export async function getDataBrand() {
  return await request(`/api/website/brands?onlyActive=true`);
}

export async function addDataBrand(payload) {
  const { brandName, description } = payload;
  console.log(payload);
  const formData = new FormData();
  console.log(formData);
  formData.append('brandName', brandName);
  formData.append('description', description);
  return await request(`/api/brands`, {
    method: 'POST',
    data: {
      brandId: Math.random() * 99999999,
      brandName: brandName,
      description: description,
    },
  });
}
export async function delDataBrand(payload) {
  return await request(`/api/brands/${payload}`, {
    method: 'DELETE',
  });
}
export async function updateDataBrand(payload) {
  const { brandId, brandName, description } = payload;
  console.log(payload);
  return await request(`/api/brands`, {
    method: 'PUT',
    data: {
      brandId: brandId,
      brandName: brandName,
      description: description,
    },
  });
}
