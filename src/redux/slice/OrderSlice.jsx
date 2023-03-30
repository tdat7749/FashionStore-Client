import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_API_URL } from '../../utils/helper'


export const fetchPagingOrder = createAsyncThunk(
    'order/fetchPagingOrder',
    async ({ id, pageIndex, token }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_API_URL}orders/public/paging?UserId=${id}&pageIndex=${pageIndex}&pageSize=5`, {
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


export const fetchPagingAdminOrder = createAsyncThunk(
    'order/fetchPagingAdminOrder',
    async ({ status, pageIndex, token }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_API_URL}orders/paging?pageIndex=${pageIndex}&pageSize=10&Status=${status}`, {
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


export const changeOrderStatus = createAsyncThunk(
    'order/changeOrderStatus',
    async ({ id, status, token }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`${BASE_API_URL}orders/status`, {
                OrderId: id,
                StatusId: status
            },
                {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                }
            )
            return response.data
        } catch (error) {
            if (error.response.status === 401) {
                return rejectWithValue('Bạn không có quyền !')
            }
            return rejectWithValue('Có lỗi xảy ra')
        }
    }
)

const OrderSlice = createSlice({
    name: 'order',
    initialState: {
        isLoading: false,
        error: null,
        data: {}
    },
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(fetchPagingOrder.pending, (state) => {
            return {
                ...state,
                isLoading: true
            }
        })
        builder.addCase(fetchPagingOrder.fulfilled, (state, action) => {
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }
        })
        builder.addCase(fetchPagingOrder.rejected, (state, action) => {

            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        })


        builder.addCase(fetchPagingAdminOrder.pending, (state) => {
            return {
                ...state,
                isLoading: true
            }
        })
        builder.addCase(fetchPagingAdminOrder.fulfilled, (state, action) => {
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }
        })
        builder.addCase(fetchPagingAdminOrder.rejected, (state, action) => {

            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        })


        builder.addCase(changeOrderStatus.pending, (state) => {
            return {
                ...state,
                isLoading: true
            }
        })
        builder.addCase(changeOrderStatus.fulfilled, (state, action) => {
            return {
                ...state,
                isLoading: false,
            }
        })
        builder.addCase(changeOrderStatus.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        })
    }
})


export default OrderSlice.reducer
