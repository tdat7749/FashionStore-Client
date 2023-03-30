import React from 'react'
import styles from './checkout.module.css'
import { Button, Form, Input, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../../../redux/slice/CartSlice'
import { useNavigate } from 'react-router'
import { Breadcrumb } from 'antd'
import BreadcrumbItem from 'antd/es/breadcrumb/BreadcrumbItem'
import { HomeOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import TextArea from 'antd/es/input/TextArea'
import { BASE_IMAGE_URL, formatter } from '../../../utils/helper'
import Navbar from '../../../components/Client/Navbar'
import Footer from '../../../components/Client/Footer'
import Cookies from 'js-cookie'

const Checkout = () => {

    const cart = useSelector(state => state.cart.cart)
    const user = useSelector(state => state.user.data.data)
    const createOrderLoading = useSelector(state => state.cart.isLoading)
    const error = useSelector(state => state.cart.error)

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const onSubmit = (value) => {

        const details = cart?.cartDetail?.map((item) => {
            return {
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
                subTotal: item.subTotal,
                color: item.color,
                size: item.size
            }
        })
        const body = {
            userId: user.id,
            total: cart.total,
            address: value.address,
            phoneNumber: value.phoneNumber,
            fullName: value.fullName,
            note: value.note,
            details: details
        }

        const authenData = JSON.parse(Cookies.get('information'))
        const token = authenData.accessToken

        dispatch(createOrder({ body, token }))
            .then(res => {
                console.log(res)
                if (res.payload.status >= 200 && res.payload.status <= 299) {
                    message.success('Mua hàng thành công ! !')
                    navigate('/gio-hang')
                } else {
                    message.error(error)
                }
            })
    }

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
                        <Link to='/gio-hang'>Giỏ Hàng</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        Checkout
                    </BreadcrumbItem>
                </Breadcrumb>
                <div className={styles.checkoutWrapper}>
                    <div className={styles.leftCheckout}>
                        <div className={styles.formWrapper}>
                            <h4>Thông Tin Giao Hàng</h4>
                            <Form
                                onFinish={onSubmit}
                                labelCol={{ span: 15 }}
                                layout='vertical'
                            >
                                <Form.Item label="Họ Và Tên" name='fullName' required rules={[{ required: true, message: "Không được để trống !" }]}>
                                    <Input required />
                                </Form.Item>
                                <Form.Item label="Địa Chỉ" name='address' required rules={[{ required: true, message: "Không được để trống !" }]}>
                                    <Input required />
                                </Form.Item>
                                <Form.Item label="Số Điện Thoại" name='phoneNumber' required rules={[{ required: true, message: "Không được để trống !" }]}>
                                    <Input required />
                                </Form.Item>
                                <Form.Item label="Ghi Chú" name='note'>
                                    <TextArea />
                                </Form.Item>

                                <Button type='primary' loading={createOrderLoading} htmlType='submit'>Đặt Hàng</Button>
                            </Form>
                        </div>
                    </div>
                    <div className={styles.rightCheckout}>
                        <div className={styles.cartWrapper}>
                            {cart?.cartDetail.map((item, index) => {
                                return (
                                    <div key={index} className={styles.cartItem}>
                                        <img src={`${BASE_IMAGE_URL}${item.image}`} className={styles.image} />
                                        <p className={styles.color} style={{ backgroundColor: item.color }}></p>
                                        <p className={styles.quantity}>{item.quantity}</p>
                                        <p className={styles.subtotal}>{formatter.format(item.subTotal)}</p>
                                    </div>
                                )
                            })}
                            <hr />
                            <div className={styles.cartTotal}>
                                <h4>Tổng Tiền</h4>
                                <p>{formatter.format(cart.total)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Checkout