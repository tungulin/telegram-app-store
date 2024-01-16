import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IDefaultSliceState } from './ISlice'
import { getFQAs, getCategories } from 'API/main';
import { getBrandInfo } from 'API/brand';

export const gettingFQAs = createAsyncThunk(
    'main/getFQAs',
    async (data: any, thunkApi) => {
        try {
            const response = await getFQAs(data)
            return response as any
        } catch (err) {
            return thunkApi.rejectWithValue(err)
        }
    }
);

export const gettingBrand = createAsyncThunk(
    'main/gettingBrand',
    async (data: any, thunkApi) => {
        try {
            const response = await getBrandInfo(data)
            return response as any
        } catch (err) {
            return thunkApi.rejectWithValue(err)
        }
    }
);

export const gettingCategories = createAsyncThunk(
    'main/getCategories',
    async (data: any, thunkApi) => {
        try {
            const response = await getCategories(data)
            return response as any
        } catch (err) {
            return thunkApi.rejectWithValue(err)
        }
    }
);

const initialState: IDefaultSliceState = {
    theme: localStorage.getItem('theme') || 'default',
    filters: {},
    FQAItems: [],
    categories: [],
    brandInfo: null
}

export const defaultSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        toogleTheme: (state) => {
            state.theme === 'default' ? state.theme = 'dark' : state.theme = 'default'
            localStorage.setItem('theme', state.theme)
        },
        setFilters: (state, action) => {
            state.filters = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(gettingFQAs.fulfilled, (state, action) => {
                state.FQAItems = [...action.payload]
            })
            .addCase(gettingCategories.fulfilled, (state, action) => {
                state.categories = [...action.payload]
            })
            .addCase(gettingBrand.fulfilled, (state, action) => {
                state.brandInfo = action.payload
            })

    }
})

export const { toogleTheme, setFilters } = defaultSlice.actions