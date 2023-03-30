import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LeftNav from '../components/Admin/LeftNav'
import CreateBrand from '../pages/Admin/Brand/CreateBrand'
import UpdateBrand from '../pages/Admin/Brand/UpdateBrand'
import ViewBrands from '../pages/Admin/Brand/ViewBrands'
import CreateCarousel from '../pages/Admin/Carousel/CreateCarousel'
import UpdateCarousel from '../pages/Admin/Carousel/UpdateCarousel'
import ViewCarousels from '../pages/Admin/Carousel/ViewCarousels'
import CreateCategory from '../pages/Admin/Category/CreateCategory'
import UpdateCategory from '../pages/Admin/Category/UpdateCategory'
import ViewCategories from '../pages/Admin/Category/ViewCategories'
import Dashboard from '../pages/Admin/Dashboard'
import ViewOrders from '../pages/Admin/Order/ViewOrders'
import CreateProduct from '../pages/Admin/Product/CreateProduct'
import UpdateImageProduct from '../pages/Admin/Product/UpdateImageProduct'
import UpdateProduct from '../pages/Admin/Product/UpdateProduct'
import ViewProducts from '../pages/Admin/Product/ViewProducts'
import CreateUser from '../pages/Admin/User/CreateUser'
import Permission from '../pages/Admin/User/Permission'
import ViewUsers from '../pages/Admin/User/ViewUsers'
import styles from './AdminRoutes.module.css'

const AdminRoutes = () => {

  return (
    <>
      <div className={styles.container}>
        <LeftNav className={styles.leftNav} />
        <div className={styles.right}>
          <Routes>
            <Route path='/' element={<Dashboard />} />


            <Route path='thuong-hieu' element={<ViewBrands />} />
            <Route path='thuong-hieu/tao-moi' element={<CreateBrand />} />
            <Route path='thuong-hieu/chinh-sua/:id' element={<UpdateBrand />} />


            <Route path='danh-muc' element={<ViewCategories />} />
            <Route path='danh-muc/tao-moi' element={<CreateCategory />} />
            <Route path='danh-muc/chinh-sua/:id' element={<UpdateCategory />} />


            <Route path='san-pham' element={<ViewProducts />} />
            <Route path='san-pham/tao-moi' element={<CreateProduct />} />
            <Route path='san-pham/chinh-sua/:slugParam' element={<UpdateProduct />} />
            <Route path='san-pham/chinh-sua/hinh-anh/:id' element={<UpdateImageProduct />} />

            <Route path='nguoi-dung' element={<ViewUsers />} />
            <Route path='nguoi-dung/phan-quyen/:userName' element={<Permission />} />
            <Route path='nguoi-dung/tao-moi' element={<CreateUser />} />

            <Route path='don-hang' element={<ViewOrders />} />


            <Route path='slide-show' element={<ViewCarousels />} />
            <Route path='slide-show/tao-moi' element={<CreateCarousel />} />
            <Route path='slide-show/chinh-sua/:id' element={<UpdateCarousel />} />

          </Routes>
        </div>
      </div>
    </>
  )
}

export default AdminRoutes