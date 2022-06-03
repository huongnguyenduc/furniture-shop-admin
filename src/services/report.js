import { request } from '../Utils/request';

export async function getBillRevenueReport(payload) {
  return await request(
    `/api/orders/report?compression=day&end=` + payload.end + `&start=` + payload.start,
  );
}

export async function getImporterReport(payload) {
  return await request(
    `/api/imports/report?compression=day&end=` + payload.end + `&start=` + payload.start,
  );
}

export async function getBestSeller() {
  return await request(`/api/orders/best-seller`);
}

export async function getRevenue() {
  return await request(`/api/orders/revenue`);
}

export async function getTotalCost() {
  return await request(`/api/imports/total-cost`);
}
