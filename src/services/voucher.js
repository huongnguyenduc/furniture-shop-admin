import {request} from '../Utils/request';

export async function getDataVoucher(){
    return await request(`/api/vouchers?onlyActive=true`);
}

export async function addVoucher(payload){
    return request(`/api/vouchers`,{
        method: "POST",
        data: payload, 
    })
}

export async function editVoucher(payload){
    //console.log(JSON.stringify(payload))
    return request(`/api/vouchers`,{
        method: "PUT",
        data: JSON.stringify(payload),
    })
}

export async function deleteVoucher(payload){   
    return request(`/api/vouchers/` + payload.voucherId,{
        method: "DELETE"
    });
}