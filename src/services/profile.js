import { request } from '../Utils/request';
export async function getProfile() {
    return await request(`/api/profile/me`);
} 
export async function changePassWord(payload) {
    return request(`/api/profile/me/change-password`, {
        method: 'POST',
        body: JSON.stringify(payload),
      });
}
export async function updateProfile(payload) {
    return request(`/api/profile/me`,  {
        method: 'PUT',
        body: JSON.stringify(payload)
    })
}