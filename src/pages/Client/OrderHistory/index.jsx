import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../../../components/Client/Footer'
import Navbar from '../../../components/Client/Navbar'
import styles from './orderhistory.module.css'
import { Collapse, Breadcrumb, Divider, Pagination, Button, message, Popconfirm } from 'antd'
import BreadcrumbItem from 'antd/es/breadcrumb/BreadcrumbItem'
import { Link } from 'react-router-dom'
import { HomeOutlined } from '@ant-design/icons'
import { changeOrderStatus, fetchPagingOrder } from '../../../redux/slice/OrderSlice'
import Cookies from 'js-cookie'
import { formatter } from '../../../utils/helper'
import { BASE_IMAGE_URL } from '../../../utils/helper'
import { LoadingOutlined } from '@ant-design/icons'

const OrderHistory = () => {

    const dispatch = useDispatch()
    const [pageIndex, setPageIndex] = useState(1)
    const orderResponse = useSelector(state => state.order.data)
    const isLoading = useSelector(state => state.order.isLoading)


    const onChangePage = (value) => {
        setPageIndex(value)
    }

    const cancelOrder = (id, status) => {
        const userToken = JSON.parse(Cookies.get("information"))
        dispatch(changeOrderStatus({ id, status, token: userToken.accessToken }))
            .then(res => {
                if (res.meta.requestStatus === "rejected") {
                    message.error(res.payload)
                }
                else {
                    message.success("Hủy đơn hàng thành công !")
                    dispatch(fetchPagingOrder(
                        {
                            id: userToken.userId,
                            pageIndex: pageIndex,
                            token: userToken.accessToken
                        }
                    ))
                }
            })
    }

    useEffect(() => {
        const userToken = JSON.parse(Cookies.get("information"))
        dispatch(fetchPagingOrder(
            {
                id: userToken.userId,
                pageIndex: pageIndex,
                token: userToken.accessToken
            }
        ))
    }, [pageIndex])

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
                        Lịch Sử Đơn Hàng
                    </BreadcrumbItem>
                </Breadcrumb>
                <div className={styles.orderWrapper}>

                    {isLoading === true ?

                        <div style={{ textAlign: 'center' }}>
                            <LoadingOutlined style={{ fontSize: '5rem' }} />
                        </div>

                        :

                        orderResponse?.data?.map((item, index) => {
                            return (
                                <div className={styles.orderItem} key={index}>
                                    <Collapse>
                                        <Collapse.Panel header={`Mã đơn hàng : ${item.id}`}>
                                            <div>
                                                <Divider orientation="left">Thông Tin Đơn Hàng</Divider>
                                                <div className={styles.orderInfo}>
                                                    <h4>Địa chỉ : <span>{item.address}</span></h4>
                                                    <h4>Trạng Thái : <span>{item.status}</span></h4>
                                                    <h4>Ngày đặt hàng : <span>{item.createdAt.split(" ")[0]}</span></h4>
                                                    <h4>Ghi Chú : <span>{item.note}</span></h4>
                                                    <h4>Tổng Tiền : <span>{formatter.format(item.total)}</span></h4>
                                                    {item.status === "Processing" ?
                                                        <Popconfirm
                                                            title='Hủy đơn hàng'
                                                            description='Bạn có chắc chắn muốn hủy đơn hàng này chứ ?'
                                                            placement='right'
                                                            okText='Xóa'
                                                            cancelText='Không'
                                                            onConfirm={() => cancelOrder(item.id, 4)}
                                                        >
                                                            <Button type='primary'>Hủy Đơn Hàng</Button>
                                                        </Popconfirm>

                                                        : null}
                                                </div>
                                                <Divider orientation="left">Chi Tiết Đơn Hàng</Divider>
                                                {
                                                    item.orderDetails.map((order, index) => {
                                                        return (
                                                            <div className={styles.orderDetail} key={index}>
                                                                <img src={`${BASE_IMAGE_URL}${order.thumbnail}`} className={styles.img} />
                                                                <p>{order.productName}</p>
                                                                <p>{order.quantity}</p>
                                                                <p>{order.size}</p>
                                                                <p>{order.color}</p>
                                                                <p>{formatter.format(order.price)}</p>
                                                                <p className={styles.orderSubtotal}>{formatter.format(order.subTotal)}</p>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </Collapse.Panel>
                                    </Collapse>
                                </div>
                            )
                        })
                    }
                </div>

                <div className={styles.pagination}>
                    <Pagination onChange={onChangePage} defaultCurrent={pageIndex} total={orderResponse.totalPage !== undefined ? orderResponse.totalPage * 10 : 10} responsive />
                </div>
            </div>

            <Footer />
        </>
    )
}

export default OrderHistory