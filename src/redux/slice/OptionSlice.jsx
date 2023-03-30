import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_API_URL } from '../../utils/helper'


export const fetchOption = createAsyncThunk(
    'option/fetchOption',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_API_URL}options`)
            return response.data
        } catch (error) {
            if (error.response.status === 401) {
                return rejectWithValue('Bạn không có quyền !')
            }
            return rejectWithValue('Có lỗi xảy ra')
        }
    }
)

const OptionSlice = createSlice({
    name: 'option',
    initialState: {
        isLoading: false,
        error: null,
        data: {}
    },
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(fetchOption.pending, (state) => {
            return {
                ...state,
                isLoading: true
            }
        })
        builder.addCase(fetchOption.fulfilled, (state, action) => {
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }
        })
        builder.addCase(fetchOption.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        })
    }
})


export default OptionSlice.reducer
