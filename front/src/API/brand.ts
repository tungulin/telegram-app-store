import axios from "axios";
import { IGetBrand } from "./IAPI";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL + '/brand',
    headers: { 'Authorization': localStorage.getItem('authorization') }
});

export const updateBrand = (data: any) => {
    return instance.post('/updateBrand', data).then(resp => resp.data)
}

export const getBrandInfo = (data: IGetBrand) => {
    return instance.get('/getBrand', { params: data }).then(resp => resp.data)
}