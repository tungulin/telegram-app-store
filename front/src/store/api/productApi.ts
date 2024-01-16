import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from 'store/baseQuery'
import { IDefaultSliceState, IProductsApi } from '../slice/ISlice';


export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: axiosBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL + '/product' }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProducts: builder.query<IProductsApi[], { offset: number, filters?: IDefaultSliceState['filters'] }>({
            query: ({ offset, filters }) => ({ method: "POST", url: `/getProducts`, data: { brandId: 1, params: { filters, offset, limit: 10 } } }),
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName
            },
            merge: (currentCache, newItems, { arg }) => {
                if (arg.offset == 0) return [...newItems]

                return [...currentCache, ...newItems];
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
            },
        }),
    }),
})

export const { useGetProductsQuery } = productsApi;
