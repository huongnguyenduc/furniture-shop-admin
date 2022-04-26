import { request } from '../Utils/request';
export function getDataPulseDetail() {
    return request(`/api/product`);
  }