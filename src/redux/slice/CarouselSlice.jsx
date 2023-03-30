import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_API_URL } from '../../utils/helper'

export const fetchSlide = createAsyncThunk(
    'carousel/fetchSlide',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_API_URL}slides/enable`)
            return response.data
        } catch (error) {
            if (error.response.status === 401) {
                return rejectWithValue('Bạn không có quyền !')
            }
            return rejectWithValue('Có lỗi xảy ra')
        }
    }
)

export const fetchDetailCarousel = createAsyncThunk(
    'carousel/fetchDetailCarousel',
    async ({ id, token }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_API_URL}slides/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            return response.data
        } catch (error) {
            if (error.response.status === 401) {
                return rejectWithValue('Bạn không có quyền !')
            }
            return rejectWithValue('Có lỗi xảy ra')
        }
    }
)



export const fetchAdminCarousel = createAsyncThunk(
    'carousel/fetchAdminCarousel',
    async ({ token }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_API_URL}slides`, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            return response.data
        } catch (error) {
            if (error.response.status === 401) {
                return rejectWithValue('Bạn không có quyền !')
            }
            return rejectWithValue('Có lỗi xảy ra')
        }
    }
)

export const deleteCarousel = createAsyncThunk(
    'carousel/deleteCarousel',
    async ({ id, token }, { rejectWithValue }) => {
        try {
            await axios.delete(`${BASE_API_URL}slides/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            return id
        } catch (error) {
            if (error.response.status === 401) {
                return rejectWithValue('Bạn không có quyền !')
            }
            return rejectWithValue('Có lỗi xảy ra')
        }
    }
)


export const updateCarousel = createAsyncThunk(
    'carousel/updateCarousel',
    async ({ body, token }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_API_URL}slides/`, body, {
                headers: {
                    "Content-Type": 'multipart/form-data',
                    Authorization: 'Bearer ' + token
                }
            })
            return response.data

        } catch (error) {
            if (error.response.status === 401) {
                return rejectWithValue('Bạn không có quyền !')
            }
            return rejectWithValue('Có lỗi xảy ra')
        }
    }
)

export const createCarousel = createAsyncThunk(
    'carousel/createCarousel',
    async ({ body, token }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_API_URL}slides/`, body, {
                headers: {
                    "Content-Type": 'multipart/form-data',
                    Authorization: 'Bearer ' + token
                }
            })
            return response.data

        } catch (error) {
            if (error.response.status === 401) {
                return rejectWithValue('Bạn không có quyền !')
            }
            return rejectWithValue('Có lỗi xảy ra')
        }
    }
)

const CarouselSlide = createSlice({
    name: 'carousel',
    initialState: {
        isLoading: false,
        isUpdate: false,
        isCreate: false,
        error: null,
        data: {},
        detail: {}
    },
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(fetchSlide.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchSlide.fulfilled, (state, action) => {
            state.data = action.payload
            state.isLoading = false
        })
        builder.addCase(fetchSlide.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })


        builder.addCase(fetchAdminCarousel.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchAdminCarousel.fulfilled, (state, action) => {
            state.data = action.payload
            state.isLoading = false
        })
        builder.addCase(fetchAdminCarousel.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })


        builder.addCase(deleteCarousel.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(deleteCarousel.fulfilled, (state, action) => {
            state.data = state.data.data.filter(item => item.id !== action.payload)
            state.isLoading = false
        })
        builder.addCase(deleteCarousel.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })


        builder.addCase(fetchDetailCarousel.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchDetailCarousel.fulfilled, (state, action) => {
            state.detail = action.payload
            state.isLoading = false
        })
        builder.addCase(fetchDetailCarousel.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })


        builder.addCase(updateCarousel.pending, (state) => {
            state.isUpdate = true
        })
        builder.addCase(updateCarousel.fulfilled, (state) => {
            state.isUpdate = false
        })
        builder.addCase(updateCarousel.rejected, (state, action) => {
            state.isUpdate = false
            state.error = action.payload
        })


        builder.addCase(createCarousel.pending, (state) => {
            state.isCreate = true
        })
        builder.addCase(createCarousel.fulfilled, (state) => {
            state.isCreate = false
        })
        builder.addCase(createCarousel.rejected, (state, action) => {
            state.isCreate = false
            state.error = action.payload
        })
    }
})


export default CarouselSlide.reducer