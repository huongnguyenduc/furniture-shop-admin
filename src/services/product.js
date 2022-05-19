import { request } from '../Utils/request';
export async function getDataProduct() {
  return await request(`/api/website/products`);
}

export function addProduct(payload) {
  const { product_name, description, image_url, brand_id, category_id } = payload;
  const formData = new FormData();

  formData.append('brandId', parseInt(brand_id));
  formData.append('categoryId', parseInt(category_id));
  formData.append('image', image_url);
  formData.append('productDesc', description);
  formData.append('productName', product_name);
  console.log(formData);
  return request(`/api/products`, {
    method: 'POST',
    body: JSON.stringify(Object.fromEntries(formData)),
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
  formData['options'] = optionDTO;
  console.log(optionDTO);

  return request(`/api/variants`, {
    method: 'POST',
    body: JSON.stringify(formData),
  });
}
