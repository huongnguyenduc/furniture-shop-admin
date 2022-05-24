import {getProfile, changePassWord,updateProfile} from '../services/profile';
import { message, notification } from 'antd';
export default {
    namespace: 'profile',
    state: {
        account: {}
        
    },
    effects: {
        *getProfile(action, {put,call}) {
            const response = yield call(getProfile);
            if(response.status === 200) {
                yield put({
                    type: 'saveProfile',
                    payload: response.content
                })
            }
        },
        *changePassWord(action,{put, call}) {
            const response = yield call(changePassWord, action.payload);
            
            if(response.status === 200) {
               notification.success({
                   message: 'Lưu thành công',
               })
            }
            else {
               
                notification.error({
                    message: response.errors
                });
            }
        },
        *updateProfile(action,{put,call}) {
            const response = yield call(updateProfile,action.payload);
            if(response.status === 200) {
                yield put({
                    type: 'saveProfile',
                    payload: response.content
                })
            }
            else {
                notification.error(
                    {
                        message: response.errors
                    }
                )
            }
        }
    },
    reducers: {
        saveProfile(state,action) {
         return{
             ...state,
             account: action.payload,
         }
        },
    }
}