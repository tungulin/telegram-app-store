import axios from "axios";
import { ILoginViaWebApp, IGetPurchaseHistory, IGetPurchaseMeta } from "./IAPI";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL + '/user',
    headers: { 'Authorization': localStorage.getItem('authorization') }
});

export const loginViaWebApp = (data: ILoginViaWebApp) => {
    return instance.post('/loginViaWebApp', data).then(resp => resp.data)
}

export const getPurchaseHistory = (data: IGetPurchaseHistory) => {
    return instance.post('/getPurchaseHistory', data).then(resp => resp.data)
}

export const getPurchaseMeta = (data: IGetPurchaseMeta) => {
    return instance.post('/getPurchaseMeta', data).then(resp => resp.data)
}
