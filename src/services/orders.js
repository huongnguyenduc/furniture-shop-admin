import { request } from '../Utils/request';
export async function getOrderList() {
  return await request(`/api/orders`);
}
export function addOrder(payload) {
  return request(``, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
export function editOrder(payload) {
  return request(`/api/orders/change-order-status`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}
export function delOrder(payload) {
  return request(``, {
    method: 'DELETE',
  });
}
