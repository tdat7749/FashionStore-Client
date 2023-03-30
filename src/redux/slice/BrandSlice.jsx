import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_API_URL } from '../../utils/helper'

export const fetchBrand = createAsyncThunk(
    'brand/fetchBrand',
    async ({ token }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_API_URL}brands`,
                {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
            return response.data
        } catch (error) {
            if (error.response.status === 401) {
                return rejectWithValue('Bạn không có quyền !')
            }
            return rejectWithValue('Có lỗi xảy ra !')
        }
    }
)

export const fetchPublicBrand = createAsyncThunk(
    'brand/fetchPublicBrand',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_API_URL}brands/public`)
            return response.data
        } catch (error) {
            if (error.response.status === 401) {
                return rejectWithValue('Bạn không có quyền !')
            }
            return rejectWithValue('Có lỗi xảy ra !')
        }
    }
)

export const fetchDetailBrand = createAsyncThunk(
    'brand/fetchDetailBrand',
    async ({ id, token }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_API_URL}brands/${id}`,
                {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
            return response.data
        } catch (error) {
            if (error.response.status === 401) {
                return rejectWithValue('Bạn không có quyền !')
            }
            return rejectWithValue('Có lỗi xảy ra !')
        }
    }
)




export const deleteBrand = createAsyncThunk(
    'brand/deleteBrand',
    async ({ brandId, token }, { rejectWithValue }) => {
        try {
            await axios.delete(`${BASE_API_URL}brands/${brandId}`,
                {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
        } catch (error) {
            if (error.response.status === 401) {
                return rejectWithValue('Bạn không có quyền !')
            }
            return rejectWithValue('Có lỗi xảy ra !')
        }
    }
)

export const createBrand = createAsyncThunk(
    'brand/createBrand',
    async ({ body, token }, { rejectWithValue }) => {
        try {
            await axios.post(`${BASE_API_URL}brands`, body, {
                headers: {
                    "Content-Type": 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
        } catch (error) {
            if (error.response.status === 401) {
                return rejectWithValue('Bạn không có quyền !')
            }
            return rejectWithValue('Có lỗi xảy ra !')
        }
    }
)

export const updateBrand = createAsyncThunk(
    'brand/updateBrand',
    async ({ body, token }, { rejectWithValue }) => {
        try {
            await axios.put(`${BASE_API_URL}brands`, body, {
                headers: {
                    "Content-Type": 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
        } catch (error) {
            if (error.response.status === 401) {
                return rejectWithValue('Bạn không có quyền !')
            }
            return rejectWithValue('Có lỗi xảy ra !')
        }
    }
)

const BrandSlice = createSlice({
    name: 'brand',
    initialState: {
        isLoading: false,
        error: null,
        isCreate: false,
        isUpdate: false,
        data: {},
        detail: {}
    },
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(fetchBrand.pending, (state) => {
            return {
                ...state,
                isLoading: true
            }
        })
        builder.addCase(fetchBrand.fulfilled, (state, action) => {
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }
        })
        builder.addCase(fetchBrand.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        })


        builder.addCase(fetchPublicBrand.pending, (state) => {
            return {
                ...state,
                isLoading: true
            }
        })
        builder.addCase(fetchPublicBrand.fulfilled, (state, action) => {
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }
        })
        builder.addCase(fetchPublicBrand.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        })


        builder.addCase(fetchDetailBrand.pending, (state) => {
            return {
                ...state,
                isLoading: true
            }
        })
        builder.addCase(fetchDetailBrand.fulfilled, (state, action) => {
            return {
                ...state,
                isLoading: false,
                detail: action.payload
            }
        })
        builder.addCase(fetchDetailBrand.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        })


        builder.addCase(deleteBrand.pending, (state) => {
            return {
                ...state,
                isLoading: true
            }
        })
        builder.addCase(deleteBrand.fulfilled, (state) => {
            return {
                ...state,
                isLoading: false,

            }
        })
        builder.addCase(deleteBrand.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        })

        builder.addCase(createBrand.pending, (state) => {
            return {
                ...state,
                isCreate: true
            }
        })
        builder.addCase(createBrand.fulfilled, (state) => {
            return {
                ...state,
                isCreate: false,
            }
        })
        builder.addCase(createBrand.rejected, (state, action) => {
            return {
                ...state,
                isCreate: false,
                error: action.payload
            }
        })

        builder.addCase(updateBrand.pending, (state) => {
            return {
                ...state,
                isUpdate: true
            }
        })
        builder.addCase(updateBrand.fulfilled, (state) => {
            return {
                ...state,
                isUpdate: false,
            }
        })
        builder.addCase(updateBrand.rejected, (state, action) => {
            return {
                ...state,
                isUpdate: false,
                error: action.payload
            }
        })
    }
})


export default BrandSlice.reducer