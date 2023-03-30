import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductCollection from '../../../components/Client/ProductCollection'
import { fetchPublicProductPaging } from '../../../redux/slice/ProductSlice'
import styles from './product.module.css'
import Filter from '../../../components/Client/Filter'
import Navbar from '../../../components/Client/Navbar'
import { Button, Pagination, Breadcrumb, message } from 'antd'
import { fetchPublicCategories } from '../../../redux/slice/CategorySlice'
import { fetchPublicBrand } from '../../../redux/slice/BrandSlice'
import { LoadingOutlined, HomeOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import BreadcrumbItem from 'antd/es/breadcrumb/BreadcrumbItem'
import Footer from '../../../components/Client/Footer'

const Product = () => {

    const dispatch = useDispatch()


    const [isOpenFilter, setIsOpenFilter] = useState(false)
    const [paging, setPaging] = useState(1)
    const [category, setCategory] = useState('')
    const [brand, setBrand] = useState('')

    useEffect(() => {
        dispatch(fetchPublicCategories())
            .then(res => {
                if (res.meta.requestStatus === 'rejected') {
                    message.error(res.payload)
                }
            })
        dispatch(fetchPublicBrand())
            .then(res => {
                if (res.meta.requestStatus === 'rejected') {
                    message.error(res.payload)
                }
            })
        dispatch(fetchPublicProductPaging({
            pageIndex: paging,
            category: category,
            brand: brand
        }))
            .then(res => {
                if (res.meta.requestStatus === 'rejected') {
                    message.error(res.payload)
                }
            })
    }, [dispatch, paging, category, brand])

    const productResponse = useSelector(state => state.product.data)
    const categories = useSelector(state => state.category.data.data)
    const parents = useSelector(state => state.category.parents)
    const brands = useSelector(state => state.brand.data.data)
    const isLoading = useSelector(state => state.product.isLoading)


    const onChangeCategory = useCallback((e) => {
        setCategory(e.target.value)
    }, [setCategory])

    const onChangeBrand = useCallback((e) => {
        setBrand(e.target.value)

    }, [setBrand])

    const onChangePage = (value) => {
        setPaging(value)
    }

    const resetFilter = () => {
        setPaging(1)
        setCategory('')
        setBrand('')
    }

    return (
        <>
            {isOpenFilter &&
                <Filter
                    setIsOpenFilter={setIsOpenFilter}
                    categories={categories}
                    parents={parents}
                    brands={brands}
                    onChangeCategory={onChangeCategory}
                    onChangeBrand={onChangeBrand}
                    category={category}
                    brand={brand}
                />}
            <Navbar />
            <div className={styles.container}>
                <Breadcrumb className={styles.breadcrumb}>
                    <BreadcrumbItem>
                        <HomeOutlined />
                        <Link to='/'>Trang Chủ</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        Cửa Hàng
                    </BreadcrumbItem>
                </Breadcrumb>
                <div className={styles.productsWrapper}>
                    <div className={styles.sort}>
                        <Button type='primary' style={{ marginRight: '2rem' }} onClick={() => setIsOpenFilter(true)}>Mở Bộ Lọc</Button>
                        <Button type='primary' onClick={() => resetFilter()}>Xóa Lọc</Button>
                    </div>
                    {isLoading === true ?

                        <div style={{ textAlign: 'center' }}>
                            <LoadingOutlined style={{ fontSize: '5rem' }} />
                        </div>

                        :

                        <div className={styles.listProduct}>
                            {
                                productResponse?.data?.length > 0 ?
                                    <>
                                        <ProductCollection listProduct={productResponse?.data} title={'Sản Phẩm Của Cửa Hàng'} />
                                        <div className={styles.pagination}>
                                            <Pagination onChange={onChangePage} defaultCurrent={paging} total={productResponse.totalPage !== undefined ? productResponse.totalPage * 10 : 10} responsive />
                                        </div>
                                    </>
                                    :
                                    <div className={styles.noProduct}>
                                        <h3>Hiện không có sản phẩm nào</h3>
                                    </div>
                            }
                        </div>
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Product