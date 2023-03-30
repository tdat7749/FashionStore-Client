import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API_URL } from '../../utils/helper'
import Cookies from "js-cookie";


export const AuthenticateClient = createAsyncThunk(
    'authen/AuthenticateClient',
    async (body, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_API_URL}authenticates/login`, body)
            return response.data
        } catch (error) {
            if (error.response.status === 401) {
                return rejectWithValue('Không có quyền !')
            }
            return rejectWithValue('Có lỗi sảy ra !')
        }
    }
)


export const AuthenticateAdmin = createAsyncThunk(
    'authen/AuthenticateAdmin',
    async (body, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_API_URL}authenticates/admin-login`, body)
            return response.data
        } catch (error) {
            if (error.response.status === 401) {
                return rejectWithValue('Không có quyền !')
            }
            return rejectWithValue('Có lỗi sảy ra !')
        }
    }
)

export const Register = createAsyncThunk(
    'authen/Register',
    async (body, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_API_URL}authenticates/register`, body)
            return response.data
        } catch (error) {
            if (error.response.status === 401) {
                return rejectWithValue('Không có quyền !')
            }
            return rejectWithValue('Có lỗi sảy ra !')
        }
    }
)

const AuthenSlice = createSlice({
    name: 'authen',
    initialState: {
        isLoading: false,
        error: null,
        data: null
    },

    reducers: {
        getUser: (state, action) => {
            if (action.payload !== null) {
                state.data = action.payload
            }
        },
    },

    extraReducers(builder) {
        builder.addCase(AuthenticateClient.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(AuthenticateClient.fulfilled, (state, action) => {
            if (action.payload.success === true) {
                Cookies.set('information', JSON.stringify(action.payload.data), { expires: 1 })
                state.isLoading = false
                state.error = null
                state.data = action.payload.data
            }
            state.isLoading = false
        })
        builder.addCase(AuthenticateClient.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })



        builder.addCase(Register.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(Register.fulfilled, (state) => {
            state.isLoading = false
        })
        builder.addCase(Register.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
    }
})

export const { getUser } = AuthenSlice.actions

export default AuthenSlice.reducer