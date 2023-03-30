import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API_URL } from "../../utils/helper";


export const fetchLatestProduct = createAsyncThunk(
    'product/fetchLatestProduct',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_API_URL}products/latest`)
            return response.data
        } catch (error) {
            if (error.response.status === 401) {
                return rejectWithValue('Bạn không có quyền !')
            }
            return rejectWithValue('Có lỗi xảy ra')
        }
    }
)

export const fetchProductDetail = createAsyncThunk(
    'product/fetchProductDetail',
    async (slugParam, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_API_URL}products/slug/${slugParam}`)
            return response.data
        } catch (error) {
            if (error.response.status === 401) {
                return rejectWithValue('Bạn không có quyền !')
            }
            return rejectWithValue('Có lỗi xảy ra')
        }
    }
)

export const fetchProductPaging = createAsyncThunk(
    'product/fetchProductPaging',
    async ({ pageIndex, token }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_API_URL}products/paging?pageSize=10&pageIndex=${pageIndex}`,
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
            return rejectWithValue('Có lỗi xảy ra')
        }
    }
)


export const fetchPublicProductPaging = createAsyncThunk(
    'product/fetchPublicProductPaging',
    async ({ pageIndex, category, brand }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_API_URL}products/public/paging?pageSize=10&pageIndex=${pageIndex}&categoryId=${category}&brandId=${brand}`)
            return response.data
        } catch (error) {
            if (error.response.status === 401) {
                return rejectWithValue('Bạn không có quyền !')
            }
            return rejectWithValue('Có lỗi xảy ra')
        }
    }
)

export const createProduct = createAsyncThunk(
    'product/createProduct',
    async ({ body, token }, { rejectWithValue }) => {
        try {
            await axios.post(`${BASE_API_URL}products`, body, {
                headers: {
                    'Content-Type': 'multipart/form-data',
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

export const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async ({ body, token }, { rejectWithValue }) => {
        try {
            await axios.put(`${BASE_API_URL}products`, body, {
                headers: {
                    'Content-Type': 'multipart/form-data',
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


export const deleteProduct = createAsyncThunk(
    'product/deleteProduct',
    async ({ id, token }, { rejectWithValue }) => {
        try {
            await axios.delete(`${BASE_API_URL}products/${id}`, {
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


export const fetchProductImage = createAsyncThunk(
    'product/fetchProductImage',
    async ({ id, token }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_API_URL}products/images/${id}`, {
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


export const deleteImage = createAsyncThunk(
    'product/deleteImage',
    async ({ id, token }, { rejectWithValue }) => {
        try {
            await axios.delete(`${BASE_API_URL}products/image/${id}`, {
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


export const createImage = createAsyncThunk(
    'product/createImage',
    async ({ body, token }, { rejectWithValue }) => {
        try {
            await axios.post(`${BASE_API_URL}products/images`, body, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + token
                }
            })
        } catch (error) {
            if (error.response.status === 401) {
                return rejectWithValue("Bạn không có quyền !")
            }
            return rejectWithValue("Có lỗi xảy ra !")
        }
    }
)

const ProductSlice = createSlice({
    name: 'product',
    initialState: {
        isLoading: false,
        isUpdate: false,
        isDelete: false,
        error: null,
        data: {},
        detail: {},
        listImages: {}
    },
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(fetchLatestProduct.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(fetchLatestProduct.fulfilled, (state, action) => {
            state.data = action.payload
            state.isLoading = false
        })
        builder.addCase(fetchLatestProduct.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })


        builder.addCase(fetchProductDetail.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(fetchProductDetail.fulfilled, (state, action) => {
            state.detail = action.payload
            state.isLoading = false
        })
        builder.addCase(fetchProductDetail.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })


        builder.addCase(fetchProductPaging.pending, (state) => {
            return {
                ...state,
                isLoading: true
            }
        })

        builder.addCase(fetchProductPaging.fulfilled, (state, action) => {
            return {
                ...state,
                data: action.payload,
                isLoading: false
            }
        })
        builder.addCase(fetchProductPaging.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        })


        builder.addCase(fetchPublicProductPaging.pending, (state) => {
            return {
                ...state,
                isLoading: true
            }
        })

        builder.addCase(fetchPublicProductPaging.fulfilled, (state, action) => {
            return {
                ...state,
                data: action.payload,
                isLoading: false
            }
        })
        builder.addCase(fetchPublicProductPaging.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        })



        builder.addCase(createProduct.pending, (state) => {
            return {
                ...state,
                isCreate: true
            }
        })

        builder.addCase(createProduct.fulfilled, (state) => {
            return {
                ...state,
                isCreate: false
            }
        })
        builder.addCase(createProduct.rejected, (state, action) => {
            return {
                ...state,
                isCreate: false,
                error: action.payload
            }
        })


        builder.addCase(updateProduct.pending, (state) => {
            return {
                ...state,
                isUpdate: true
            }
        })

        builder.addCase(updateProduct.fulfilled, (state) => {
            return {
                ...state,
                isUpdate: false
            }
        })
        builder.addCase(updateProduct.rejected, (state, action) => {
            return {
                ...state,
                isUpdate: false,
                error: action.payload
            }
        })


        builder.addCase(deleteProduct.pending, (state) => {
            return {
                ...state,
                isDelete: true
            }
        })

        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            return {
                ...state,
                data: {
                    ...state.data,
                    data: state?.data?.data?.filter((item) => item.id !== action.payload)
                },
                isDelete: false
            }
        })

        builder.addCase(deleteProduct.rejected, (state, action) => {
            return {
                ...state,
                isDelete: false,
                error: action.payload
            }
        })


        builder.addCase(fetchProductImage.pending, (state) => {
            return {
                ...state,
                isLoading: true
            }
        })

        builder.addCase(fetchProductImage.fulfilled, (state, action) => {
            return {
                ...state,
                listImages: action.payload,
                isLoading: false
            }
        })
        builder.addCase(fetchProductImage.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        })


        builder.addCase(deleteImage.pending, (state) => {
            return {
                ...state,
                isDelete: true
            }
        })

        builder.addCase(deleteImage.fulfilled, (state, action) => {
            return {
                ...state,
                listImages: {
                    ...state.listImages,
                    data: state?.listImages?.data?.filter((item) => item.id !== action.payload)
                },
                isDelete: false
            }
        })

        builder.addCase(deleteImage.rejected, (state, action) => {
            return {
                ...state,
                isDelete: false,
                error: action.payload
            }
        })
    }
})

export default ProductSlice.reducer