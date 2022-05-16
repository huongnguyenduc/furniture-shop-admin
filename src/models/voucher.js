import { getDataVoucher , addVoucher, editVoucher,deleteVoucher} from "../services/voucher";
import { notification , message} from 'antd';
export default {
    namespace: 'voucher',
    state: {
        vouchers: [
            {
                id:1,
                name: 'Voucher con bò',
                description: 'Đây là mô tả con bò voucher Đây là mô tả con bò voucher Đây là mô tả con bò voucher Đây là mô tả con bò voucher Đây là mô tả con bò voucher',
                valid_date: '20-4-2022',
                expiration_date: '21-4-2022',
                value: 'value',
                min_purchase: 1000,
            },
            {
                id:1,
                name: 'Voucher con bò',
                description: 'Đây là mô tả con bò voucher',
                valid_date: '20-4-2022',
                expiration_date: '21-4-2022',
                value: 'value',
                min_purchase: 1000,
            },
            {
                id:1,
                name: 'Voucher con bò',
                description: 'Đây là mô tả con bò voucher',
                valid_date: '20-4-2022',
                expiration_date: '21-4-2022',
                value: 'value',
                min_purchase: 1000,
            },
        ]
    },
    reducers:{
        saveVoucherList(state, action){
            return {
                ...state,
                vouchers: action.payload,
            }
        },
        delete(state, action){
            // state.vouchers.filter(item => item.voucherId !== action.payload.voucherId);
            // alert(JSON.stringify(state.vouchers));
            return {
                ...state,
                vouchers: state.vouchers.filter(item =>item.voucherId !== action.payload.voucherId)
            }
        }
    },
    effects: {
        *getVoucherList(action,{put, call}){
            const res = yield call(getDataVoucher); // getAllData
            console.log(res);
            if (res.status === 200){
                yield put({
                    type: 'saveVoucherList',
                    payload: res.content,
                });
            }
        },
        *addVoucher(action, {put,call}){
            const response = yield call(addVoucher, action.payload);
            if (response.status === 200){
                notification.success({
                    message: `Thêm mới voucher thành công`,
                    placement: 'bottomRight'
                });
            }
            else{
                response.error.forEach(e => {
                    notification.error({ message: response.error });
                });
            }
        },
        *editVoucher(action, {put,call}){
            const response = yield call(editVoucher, action.payload);
            if (response.status === 200){
                notification.success({
                    message: `Cập nhật voucher thành công`,
                    placement: 'bottomRight'
                });
            }
            else{
                notification.error({ 
                    message: response.error,
                    placement: 'bottomRight'
                });
            }
        },
        *deleteVoucher(action, {put,call}){
            const response = yield call(deleteVoucher, action.payload);
            if (response.status === 200){
                yield put({
                    type: 'delete',
                    payload: action.payload
                });
                notification.success({
                    message: `Xóa voucher thành công`,
                    placement: 'bottomRight'
                });
            }
            else{
                notification.error({ 
                    message: response.error,
                    placement: 'bottomRight'
                });
            }
        }

    }
}