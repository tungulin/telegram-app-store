import axios from "axios";
import { IGetFQAs, IGetFQA, IGetCategories } from "./IAPI";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL + '/main',
    headers: { 'Authorization': localStorage.getItem('authorization') }
});

export const getFQAs = (data: IGetFQAs) => {
    return instance.get('/getFQAs', { params: data }).then(resp => resp.data)
}

export const getCategories = (data: IGetCategories) => {
    return instance.get('/getCategories', { params: data }).then(resp => resp.data)
}

export const getFQA = (data: IGetFQA) => {
    return instance.get('/getFQA', { params: data }).then(resp => resp.data)
}