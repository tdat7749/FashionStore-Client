import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchLatestProduct } from '../../../redux/slice/ProductSlice';
import { fetchSlide } from '../../../redux/slice/CarouselSlice'
import Slide from '../../../components/Client/Slide'
import ProductCollection from '../../../components/Client/ProductCollection'
import NewsCollection from '../../../components/Client/NewsCollection'
import styles from './home.module.css'
import Navbar from '../../../components/Client/Navbar'
import Footer from '../../../components/Client/Footer'
import { news } from '../../../utils/helper';

const Home = () => {
    const dispatch = useDispatch();
    const carousel = useSelector((state) => state.carousel.data.data)
    const latestProduct = useSelector((state) => state.product.data.data)

    useEffect(() => {
        dispatch(fetchLatestProduct())
        dispatch(fetchSlide())
    }, [dispatch])

    return (
        <>
            <Navbar />
            <Slide carousel={carousel} />
            <div className={styles.container}>
                <section>
                    <ProductCollection listProduct={latestProduct} title={'Sản Phẩm Mới Nhất'} />
                </section>
                <section>
                    <NewsCollection news={news} title={'Tin Tức'} />
                </section>
            </div>
            <Footer />
        </>
    )
}

export default Home