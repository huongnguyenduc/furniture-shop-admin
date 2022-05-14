import {request} from '../Utils/request';

export async function getDataVoucher(){
    return await request(`/api/vouchers`);
}

export async function addVoucher(payload){
    const {name, voucherDesc, amount, validDate, expirationDate, voucherValue, cappedAt} = payload;
    const formData = new FormData();
    //formData.append('name', name);
    formData.append('voucherDesc',voucherDesc);
    formData.append('amount',amount);
    formData.append('validDate',validDate);
    formData.append('expirationDate',expirationDate);
    formData.append('voucherValue',voucherValue);
    formData.append('cappedAt',cappedAt);
    console.log('service: ');                // console.log data
    for(var pair of formData.entries()) {
        console.log(pair[0]+ ', '+ pair[1]); 
     }
    return request(`/api/vouchers`,{
        method: "POST",
        data: formData, 
    })
}