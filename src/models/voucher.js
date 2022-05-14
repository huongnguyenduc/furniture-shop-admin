import { getDataVoucher , addVoucher} from "../services/voucher";
import { notification } from 'antd';
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
                notification.info({
                    message: `POST API DONE`,
                    description:
                      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
                    });
            }
            else{
                notification.error({ message: response.content });
            }
        }
    }
}