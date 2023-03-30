import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_API_URL } from '../../utils/helper'


export const fetchCategories = createAsyncThunk(
    'category/fetchCategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_API_URL}categories/low`)
            return response.data
        } catch (error) {
            if (error.response.status === 401) {
                return rejectWithValue('Bạn không có quyền !')
            }
            return rejectWithValue('Có lỗi xảy ra')
        }
    }
)

export const fetchAllCategories = createAsyncThunk(
    'category/fetchAllCategories',
    async ({ token }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_API_URL}categories`, {
                headers: {
                    'Authorization': 'Bearer ' + token
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

export const fetchPublicCategories = createAsyncThunk(
    'category/fetchPublicCategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_API_URL}categories/public`)
            return response.data
        } catch (error) {
            if (error.response.status === 401) {
                return rejectWithValue('Bạn không có quyền !')
            }
            return rejectWithValue('Có lỗi xảy ra')
        }
    }
)

export const fetchParentCategories = createAsyncThunk(
    'category/fetchParentCategories',
    async ({ token }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_API_URL}categories/parent`, {
                headers: {
                    'Authorization': 'Bearer ' + token
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

export const fetchDetailCategory = createAsyncThunk(
    'category/fetchDetailCategory',
    async ({ id, token }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_API_URL}categories/${id}`, {
                headers: {
                    'Authorization': 'Bearer ' + token
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


export const deleteCategory = createAsyncThunk(
    'category/deleteCategory',
    async ({ id, token }, { rejectWithValue }) => {
        try {
            await axios.delete(`${BASE_API_URL}categories/${id}`, {
                headers: {
                    'Authorization': 'Bearer ' + token
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


export const createCategory = createAsyncThunk(
    'category/createCategory',
    async ({ body, token }, { rejectWithValue }) => {
        try {
            await axios.post(`${BASE_API_URL}categories`, body, {
                headers: {
                    "Content-Type": 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
        } catch (error) {
            if (error.response.status === 401) {
                return rejectWithValue('Bạn không có quyền !')
            }
            return rejectWithValue('Có lỗi xảy ra')
        }
    }
)


export const updateCategory = createAsyncThunk(
    'category/updateCategory',
    async ({ body, token }, { rejectWithValue }) => {
        try {
            await axios.put(`${BASE_API_URL}categories`, body, {
                headers: {
                    "Content-Type": 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
        } catch (error) {
            if (error.response.status === 401) {
                return rejectWithValue('Bạn không có quyền !')
            }
            return rejectWithValue('Có lỗi xảy ra')
        }
    }
)

const CategorySlice = createSlice({
    name: 'category',
    initialState: {
        isLoading: false,
        error: null,
        isCreate: false,
        isUpdate: false,
        detail: {},
        data: {},
        parents: []
    },
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(fetchCategories.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.data = action.payload
            state.isLoading = false
        })
        builder.addCase(fetchCategories.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })


        builder.addCase(fetchAllCategories.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchAllCategories.fulfilled, (state, action) => {
            state.data = action.payload
            state.isLoading = false
        })
        builder.addCase(fetchAllCategories.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })


        builder.addCase(fetchPublicCategories.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchPublicCategories.fulfilled, (state, action) => {
            state.data = action.payload
            state.parents = state.data.data.filter(item => item.parentId === 0)
            state.isLoading = false
        })
        builder.addCase(fetchPublicCategories.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })


        builder.addCase(fetchParentCategories.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchParentCategories.fulfilled, (state, action) => {
            state.data = action.payload
            state.isLoading = false
        })
        builder.addCase(fetchParentCategories.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })


        builder.addCase(fetchDetailCategory.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchDetailCategory.fulfilled, (state, action) => {
            state.detail = action.payload
            state.isLoading = false
        })
        builder.addCase(fetchDetailCategory.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })


        builder.addCase(deleteCategory.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(deleteCategory.fulfilled, (state, action) => {
            state.data = state.data?.data?.filter(item => item.id !== action.payload)
            state.isLoading = false
        })
        builder.addCase(deleteCategory.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })


        builder.addCase(createCategory.pending, (state) => {
            state.isLoading = true
            state.isCreate = true
        })
        builder.addCase(createCategory.fulfilled, (state) => {
            state.isLoading = false
            state.isCreate = false
        })
        builder.addCase(createCategory.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })


        builder.addCase(updateCategory.pending, (state) => {
            state.isLoading = true
            state.isUpdate = true
        })
        builder.addCase(updateCategory.fulfilled, (state) => {
            state.isLoading = false
            state.isUpdate = false
        })
        builder.addCase(updateCategory.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
    }
})


export default CategorySlice.reducer