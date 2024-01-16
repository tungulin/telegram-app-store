import axios from "axios";
import { IGetProducts } from "./IAPI";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL + '/product',
    headers: { 'Authorization': localStorage.getItem('authorization') }
});

export const getProducts = (data: IGetProducts) => {
    return instance.post('/getProducts', data).then(resp => resp.data)
}

export const getProduct = (data: { id: string | undefined, brandId: string | undefined }) => {
    return instance.get('/getProduct', { params: data }).then(resp => resp.data)
}

export const setRating = (data: { productId: number, score: number }) => {
    return instance.post('/setRating', data).then(resp => resp.data)
}