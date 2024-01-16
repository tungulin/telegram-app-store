import { configureStore } from '@reduxjs/toolkit'

import { defaultSlice } from './slice/defaultSlice'
import { userSlice } from './slice/userSlice';
import { productsApi } from './api/productApi';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export const store = configureStore({
    reducer: {
        default: defaultSlice.reducer,
        user: userSlice.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({ serializableCheck: false })
            .concat(productsApi.middleware)
})

setupListeners(store.dispatch);


export type AppDispatch = typeof store.dispatch;
