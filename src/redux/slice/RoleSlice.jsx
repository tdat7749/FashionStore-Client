import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API_URL } from "../../utils/helper";


export const getAllRoles = createAsyncThunk(
    'role/getAllRoles',
    async ({ token }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_API_URL}users/role`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            return response.data
        } catch (error) {
            if (error.response.status === 401) {
                return rejectWithValue("Bạn không có quyền 1")
            }
            return rejectWithValue("Có lỗi xảy ra !")
        }
    }
)


export const getRoleUser = createAsyncThunk(
    'role/getRoleUser',
    async ({ token, userName }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_API_URL}users/role/${userName}`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            return response.data
        } catch (error) {
            if (error.response.status === 401) {
                return rejectWithValue("Bạn không có quyền 1")
            }
            return rejectWithValue("Có lỗi xảy ra !")
        }
    }
)

export const updateRoleUser = createAsyncThunk(
    'user/updateRoleUser',
    async ({ token, body }, { rejectWithValue }) => {
        try {
            await axios.put(`${BASE_API_URL}users/roles`, body, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
        } catch (error) {
            if (error.response.status === 401) {
                return rejectWithValue("Bạn không có quyền")
            }
            return rejectWithValue("Có lỗi xảy ra !")
        }
    }
)



const RoleSlice = createSlice({
    name: 'role',
    initialState: {
        isLoading: false,
        isRoleLoading: false,
        error: null,
        data: {},
        listRoles: {},
        isUpdate: false
    },

    extraReducers(builder) {
        builder.addCase(getAllRoles.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(getAllRoles.fulfilled, (state, action) => {
            state.data = action.payload
            state.isLoading = false
        })

        builder.addCase(getAllRoles.rejected, (state, action) => {
            state.error = action.payload
            state.isLoading = false
        })


        builder.addCase(getRoleUser.pending, (state) => {
            state.isRoleLoading = true
        })

        builder.addCase(getRoleUser.fulfilled, (state, action) => {
            state.listRoles = action.payload
            state.isRoleLoading = false
        })

        builder.addCase(getRoleUser.rejected, (state, action) => {
            state.error = action.payload
            state.isRoleLoading = false
        })


        builder.addCase(updateRoleUser.pending, (state) => {
            state.isUpdate = true
        })

        builder.addCase(updateRoleUser.fulfilled, (state) => {
            state.isUpdate = false
        })

        builder.addCase(updateRoleUser.rejected, (state, action) => {
            state.isUpdate = false
            state.error = action.payload
        })
    }
})

export default RoleSlice.reducer