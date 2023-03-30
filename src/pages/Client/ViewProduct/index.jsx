import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { fetchProductDetail } from '../../../redux/slice/ProductSlice'
import styles from './viewproduct.module.css'
import ProductImage from '../../../components/Client/ProductImage'
import ProductDetail from '../../../components/Client/ProductDetail'
import Navbar from '../../../components/Client/Navbar'
import Footer from '../../../components/Client/Footer'

const ViewProduct = () => {

    const dispatch = useDispatch();
    const { slug } = useParams()

    useEffect(() => {
        dispatch(fetchProductDetail(slug))
    }, [slug, dispatch])

    const value = useSelector(state => state.product.detail.data)
    const isLoading = useSelector(state => state.product.isLoading)

    return (
        <>
            <Navbar />
            <div className={styles.container}>
                {
                    (value !== undefined && isLoading === false) &&
                    <div className={styles.detail}>
                        <ProductImage thumbnail={value.thumbnail} listimage={value.productImages} />
                        <ProductDetail
                            detail={value}
                        />
                    </div>
                }
            </div>
            <Footer />
        </>
    )
}

export default ViewProduct