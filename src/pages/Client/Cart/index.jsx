import React from 'react'
import styles from './cart.module.css'
import { Breadcrumb, Table, Space, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_IMAGE_URL, formatter } from '../../../utils/helper'
import { RemoveFromCart } from '../../../redux/slice/CartSlice'
import { Link } from 'react-router-dom'
import BreadcrumbItem from 'antd/es/breadcrumb/BreadcrumbItem'
import { HomeOutlined } from '@ant-design/icons'
import Navbar from '../../../components/Client/Navbar'
import Footer from '../../../components/Client/Footer'

const Cart = () => {

    const cart = useSelector(state => state.cart.cart)

    const dispatch = useDispatch()

    const handleDeleteCart = (index) => {
        dispatch(RemoveFromCart(index))
    }

    const columns = [
        {
            title: 'Mã Sản Phẩm',
            key: 'productCartId',
            dataIndex: 'productCartId'
        },
        {
            title: 'Hình Ảnh',
            key: 'image',
            render: (_, record) => (
                <img src={`${BASE_IMAGE_URL}${record.image}`} className={styles.img} />
            ),
        },
        {
            title: 'Màu Sắc',
            key: 'color',
            render: (_, record) => (
                <div className={styles.color} style={{ backgroundColor: record.color }}></div>
            ),
        },
        {
            title: 'Size',
            key: 'size',
            dataIndex: 'size'
        },
        {
            title: 'Đơn Giá',
            key: 'price',
            dataIndex: 'price'
        },
        {
            title: 'Số Lượng',
            key: 'quantity',
            dataIndex: 'quantity'
        },
        {
            title: 'Tổng Tiền',
            key: 'subTotal',
            dataIndex: 'subTotal'
        },
        {
            title: 'Hành Động',
            key: 'action',
            render: (index, record) => (
                <Space size='large' style={{ cursor: 'pointer' }}>
                    <p className={styles.btnXoa} onClick={() => handleDeleteCart(index)}>Xóa</p>
                </Space>
            ),

        }
    ]

    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <Breadcrumb className={styles.breadcrumb}>
                    <BreadcrumbItem>
                        <HomeOutlined />
                        <Link to='/'>Trang Chủ</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        Giỏ Hàng
                    </BreadcrumbItem>
                </Breadcrumb>
                <div className={styles.cartContainer}>
                    <div className={styles.cartDetails}>
                        {cart?.cartDetail?.length > 0 ?
                            <Table columns={columns} className={styles.tableCart} rowKey='productCartId' dataSource={cart.cartDetail} pagination={false} />
                            :
                            <div className={styles.cartEmpty}>
                                <p>Giỏ hàng đang trống !</p>
                                <Link to='/'>
                                    <Button type='primary'>Mua hàng ngay !</Button>
                                </Link>
                            </div>
                        }
                    </div>
                    <div className={styles.cartPriceWrapper}>
                        <div className={styles.cart}>
                            <div className={styles.cartWrapperPrice}>
                                <h3>Tổng Phụ </h3>
                                <p>{formatter.format(cart.total)}</p>
                            </div>
                            <hr />
                            <div className={styles.cartWrapperPrice}>
                                <h3>Vận Chuyển </h3>
                                <p>{formatter.format(0)}</p>
                            </div>
                            <div className={styles.cartWrapperPrice}>
                                <h3>VAT </h3>
                                <p>{formatter.format(0)}</p>
                            </div>
                            <hr />
                            <div className={styles.cartTotal}>
                                <h3>Tổng Tiền </h3>
                                <p>{formatter.format(cart.total)}</p>
                            </div>
                        </div>
                        {
                            cart?.cartDetail?.length > 0 &&

                            <div>
                                <Link to={'/checkout'}>
                                    <Button type='primary' className={styles.btnCheckOut}>Checkout Now !</Button>
                                </Link>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Cart