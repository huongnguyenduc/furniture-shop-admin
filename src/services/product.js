import { Result } from 'antd';
import { request } from '../Utils/request';
export async function getDataProduct() {
  return await request(`/api/product`);
}
export function addProduct(payload) {
  const { product_name, description, image_url, brand_id, category_id } = payload;
  const formData = new FormData();
  formData.append('brandId', brand_id);
  formData.append('categoryId', category_id);
  formData.append('image', image_url);
  formData.append('productDesc', description);
  formData.append('productName', product_name);
  return request(`/api/product`, {
    method: 'POST',
    data: formData,
  });
}
export function addVariant(payload) {
  const { sku, price, image_url, options } = payload;
  var optionDTO = [];
  options.forEach(element => {
    let temp = {};
    temp['optionImage'] = element.option_image_url;
    temp['optionVaue'] = element.option_value;
    optionDTO.push(temp);
  });
  const formData = new FormData();
  formData.append('sku', sku);
  formData.append('image', image_url);
  formData.append('price', price);
  formData.append('variantValues', JSON.stringify(optionDTO));
  return request(`/api/product_variant`, {
    method: 'POST',
    data: formData,
  });
}
