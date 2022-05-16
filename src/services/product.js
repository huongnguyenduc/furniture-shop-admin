import { request } from '../Utils/request';
export async function getDataProduct() {
  return await request(`/api/products`);
}
export function addProduct(payload) {
  const { product_name, description, image_url, brand_id, category_id } = payload;
  const formData = {};

  formData['brandId'] = parseInt(brand_id);
  formData['categoryId'] = parseInt(category_id);
  formData['image'] = image_url;
  formData['productDesc'] = description;
  formData['productName'] = product_name;
  console.log(formData);
  return request(`/api/products`, {
    method: 'POST',
    body: JSON.stringify(formData),
  });
}
export function editProduct(payload) {
  return request(`/api/products`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}
export function delProduct(payload) {
  return request(`/api/products/${payload}`, {
    method: 'DELETE',
  });
}
export function addVariant(payload) {
  const { productId, sku, price, image_url, options } = payload;
  var optionDTO = [];
  options.forEach(element => {
    let temp = {};
    temp['optionId'] = element.optionId;
    temp['optionImage'] = element.image_url;
    temp['optionValue'] = element.option_value;
    optionDTO.push(temp);
  });

  const formData = {};
  formData['sku'] = sku;
  formData['productId'] = productId;
  formData['image'] = image_url;
  formData['price'] = price;
  formData['values'] = optionDTO;
  console.log(optionDTO);
  return request(`/api/variants`, {
    method: 'POST',
    body: JSON.stringify(formData),
  });
}
export function editVariant(payload) {
  return request(`/api/variants`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}
export function delVariant(payload) {
  return request(`/api/variants/${payload}`, {
    method: 'DELETE',
  });
}
