import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import ViewProduct from '../pages/Client/ViewProduct'
import Home from '../pages/Client/Home'
import Login from '../pages/Client/Login'
import User from '../pages/Client/User'
import Cart from '../pages/Client/Cart'
import Checkout from '../pages/Client/Checkout'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../redux/slice/UserSlice'
import Cookies from 'js-cookie'
import Product from '../pages/Client/Product'
import OrderHistory from '../pages/Client/OrderHistory'
import PrivateRoutesClient from './PrivateRoutesClient'
import Error from '../pages/Client/Error'
import Register from '../pages/Client/Register'


const getUserFromCookies = () => {
    if (Cookies.get('information') !== undefined) {
        const user = JSON.parse(Cookies.get('information'))
        if (user !== null) {
            return user
        }
    }
    return null
}


const ClientRoutes = () => {

    const dispatch = useDispatch()

    const auth = useSelector(state => state.user.auth)

    useEffect(() => {
        const user = getUserFromCookies()
        if (user !== null) {
            dispatch(getUser({ id: user.userId, token: user.accessToken }))
        }
        else {
            dispatch(getUser(user))
        }
    }, [dispatch])

    return (
        <>
            <Routes>
                <Route element={<PrivateRoutesClient auth={auth} />}>
                    <Route path='/lich-su-dat-hang' element={<OrderHistory />} />
                    <Route path='/thong-tin-tai-khoan' element={<User />} />
                </Route>
                <Route path='/' element={<Home />} />
                <Route path='/san-pham/:slug' element={<ViewProduct />} />
                <Route path='/dang-ky' element={<Register />} />
                <Route path='/dang-nhap' element={<Login />} />
                <Route path='/gio-hang' element={<Cart />} />
                <Route path='/checkout' element={<Checkout />} />
                <Route path='/san-pham' element={<Product />} />
                <Route path='*' element={<Error />} />
            </Routes>
        </>
    )
}

export default ClientRoutes