import axios from "axios";
import { ICreatePayment } from "./IAPI";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL + '/payment',
    headers: { 'Authorization': localStorage.getItem('authorization') }
});

export const createPayment = (data: ICreatePayment) => {
    return instance.post('/createPayment', data).then(resp => resp.data)
}