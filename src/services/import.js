import { request } from '../Utils/request';

export async function getImports() {
  return await request(`/api/imports`);
}

export function createImport(payload) {
  const { importDesc, importDetails, totalPrice } = payload;
  let importDetailDto = [];
  importDetails.forEach(e => {
    let temp = {};
    temp['price'] = e.price;
    temp['quantity'] = e.quantity;
    temp['variantId'] = e.variantId;
    importDetailDto.push(temp);
  });

  const formData = {};
  formData['importDesc'] = importDesc;
  formData['totalPrice'] = totalPrice;
  formData['importDetails'] = importDetailDto;

  return request(`/api/imports`, {
    method: 'POST',
    body: JSON.stringify(formData),
  });
}
