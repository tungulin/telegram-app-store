import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IUserSliceState } from './ISlice'
import { loginViaWebApp } from 'API/user';

export const loginnerViaWebApp = createAsyncThunk(
    'user/loginViaWebApp',
    async (data: any, thunkApi) => {
        try {
            const response = await loginViaWebApp(data)
            return response as any
        } catch (err) {
            return thunkApi.rejectWithValue(err)
        }
    }
);

const initialState: IUserSliceState = {
    isAuth: false,
    info: null
}

export const userSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loginnerViaWebApp.fulfilled, (state, action) => {
                state.isAuth = true
                state.info = action.payload
                localStorage.setItem('authorization', action.payload.jwtToken)
            })
    }
})