import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_API_URL } from "../../utils/helper";

export const getUser = createAsyncThunk(
    'user/getUser',
    async ({ id, token }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_API_URL}authenticates/verify/${id}`,
                {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                }
            )
            return response.data
        } catch (error) {
            if (error.response.status === 401) {
                return rejectWithValue("Vui lòng đăng nhập lại")
            }
            return rejectWithValue("Có lỗi xảy ra !")
        }
    }
)

export const getPagingUser = createAsyncThunk(
    'user/getPagingUser',
    async ({ pageIndex, token }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_API_URL}users/paging?pageSize=10&pageIndex=${pageIndex}`,
                {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                }
            )
            return response.data
        } catch (error) {
            if (error.response.status === 401) {
                return rejectWithValue("Bạn không có quyền")
            }
            return rejectWithValue("Có lỗi xảy ra !")
        }
    }
)


export const changeInformation = createAsyncThunk(
    'user/changeInformation',
    async ({ body, token }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_API_URL}users/`, body,
                {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                }
            )
            return response.data
        } catch (error) {
            if (error.response.status === 401) {
                return rejectWithValue("Bạn không có quyền")
            }
            return rejectWithValue("Có lỗi xảy ra !")
        }
    }
)

export const changePassword = createAsyncThunk(
    'user/changePassword',
    async ({ body, token }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`${BASE_API_URL}users/password`, body,
                {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                }
            )
            return response.data
        } catch (error) {
            if (error.response.status === 401) {
                return rejectWithValue("Bạn không có quyền")
            }
            return rejectWithValue("Có lỗi xảy ra !")
        }
    }
)



const UserSlice = createSlice({
    name: 'user',
    initialState: {
        isLoading: false,
        error: null,
        data: null,
        listUser: {

        },
        isUpdate: false,
        auth: false

    },
    reducers: {
        logOut: (state) => {
            Cookies.remove("information")
            state.data = null
            state.auth = false
        }
    },

    extraReducers(builder) {
        builder.addCase(getUser.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(getUser.fulfilled, (state, action) => {
            if (action.payload === undefined) {
                state.data = null
                state.auth = false
            }
            else {
                state.data = action.payload
                state.auth = true
            }
            state.isLoading = false
        })

        builder.addCase(getUser.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
            Cookies.remove("information")
        })


        builder.addCase(getPagingUser.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(getPagingUser.fulfilled, (state, action) => {
            state.listUser = action.payload
            state.isLoading = false
        })

        builder.addCase(getPagingUser.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })



        builder.addCase(changeInformation.pending, (state) => {
            state.isUpdate = true
        })

        builder.addCase(changeInformation.fulfilled, (state) => {
            state.isUpdate = false
        })

        builder.addCase(changeInformation.rejected, (state, action) => {
            state.isUpdate = false
            state.error = action.payload
        })


        builder.addCase(changePassword.pending, (state) => {
            state.isUpdate = true
        })

        builder.addCase(changePassword.fulfilled, (state) => {
            state.isUpdate = false
        })

        builder.addCase(changePassword.rejected, (state, action) => {
            state.isUpdate = false
            state.error = action.payload
        })
    }
})

export default UserSlice.reducer
export const { logOut } = UserSlice.actions
