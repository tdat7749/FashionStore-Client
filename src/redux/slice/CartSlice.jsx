import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API_URL } from "../../utils/helper";

export const createOrder = createAsyncThunk(
    'cart/createOrder',
    async ({ body, token }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_API_URL}orders`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })

            return response
        } catch (error) {
            if (error.response.status === 401) {
                return rejectWithValue("Bạn không có quyền !")
            }
            return rejectWithValue("Có lỗi xảy ra")
        }
    }
)

const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        isLoading: false,
        error: null,
        cart: {
            cartDetail: [],
            total: 0,
        }
    },

    reducers: {
        AddToCart: (state, action) => {
            if (state.cart.cartDetail.length === 0) {
                state.cart.cartDetail = [action.payload]
            }
            else {
                let isInCart = state.cart.cartDetail.find((item) => item.productCartId === action.payload.productCartId)
                if (isInCart === undefined) {
                    state.cart.cartDetail = [...state.cart.cartDetail, action.payload]
                }
                else {
                    const newCart = state.cart.cartDetail.map((item) => {
                        if (item.productCartId === action.payload.productCartId) {
                            item.quantity += action.payload.quantity
                        }
                        return item
                    })
                    state.cart.cartDetail = newCart
                }
            }
            state.cart.total = state.cart.cartDetail.reduce((subTotal, currentValue) => subTotal + currentValue.subTotal, 0)
        },

        RemoveFromCart: (state, action) => {
            state.cart.cartDetail.splice(action.payload, 1)
            state.cart.total = state.cart.cartDetail.reduce((subTotal, currentValue) => subTotal + currentValue.subTotal, 0)
        },

    },

    extraReducers(builder) {
        builder.addCase(createOrder.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(createOrder.fulfilled, (state) => {
            state.cart = {
                cartDetail: [],
                total: 0
            }
            state.isLoading = false
        })

        builder.addCase(createOrder.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
    }
})

export const { AddToCart, RemoveFromCart } = CartSlice.actions
export default CartSlice.reducer