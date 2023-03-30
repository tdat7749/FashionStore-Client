import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'


function PrivateRoutesClient({ auth }) {

    return (
        auth ? <Outlet /> : <Navigate to="/dang-nhap" />
    )
}

export default PrivateRoutesClient