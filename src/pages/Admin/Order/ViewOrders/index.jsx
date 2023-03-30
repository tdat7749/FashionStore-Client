import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './vieworders.module.css'
import { Collapse, Divider, Pagination, message, Select, Radio } from 'antd'
import Cookies from 'js-cookie'
import { BASE_IMAGE_URL, formatter, orderStatus } from '../../../../utils/helper'
import { LoadingOutlined } from '@ant-design/icons'
import { changeOrderStatus, fetchPagingAdminOrder } from '../../../../redux/slice/OrderSlice'
import Title from '../../../../components/Admin/Title'


const ViewOrders = () => {

    const dispatch = useDispatch()
    const [pageIndex, setPageIndex] = useState(1)
    const [status, setStatus] = useState('')



    const onChangePage = (value) => {
        setPageIndex(value)
    }

    const onChangeStatus = (value, id) => {

        const userToken = JSON.parse(Cookies.get("information"))

        dispatch(changeOrderStatus({ id: id, status: value, token: userToken.accessToken }))
            .then(res => {
                if (res.meta.requestStatus === "rejected") {
                    message.error(res.payload)
                } else {
                    message.success("Thay đổi trạng thái đơn hàng thành công !")
                    dispatch(fetchPagingAdminOrder(
                        {
                            status: status,
                            pageIndex: pageIndex,
                            token: userToken.accessToken
                        }
                    ))
                }
            })
    }

    const handleFilterOrder = (e) => {
        setPageIndex(1)
        setStatus(e.target.value)
    }

    const orderResponse = useSelector(state => state.order.data)
    const isLoading = useSelector(state => state.order.isLoading)

    useEffect(() => {
        const userToken = JSON.parse(Cookies.get("information"))
        dispatch(fetchPagingAdminOrder(
            {
                status: status,
                pageIndex: pageIndex,
                token: userToken.accessToken
            }
        ))
            .then(res => {
                if (res.meta.requestStatus === "Rejected") {
                    message.error(res.payload)
                }
            })
    }, [dispatch, pageIndex, status])


    return (
        <div className={styles.container}>
            <Title title={'DANH SÁCH ĐƠN HÀNG'} />
            <div className={styles.orderFilter}>
                <Radio.Group
                    optionType="button"
                    buttonStyle="solid"
                    onChange={handleFilterOrder}
                    defaultValue={''}
                >
                    <Radio.Button value={''}>Tất Cả Đơn Hàng</Radio.Button>
                    {orderStatus.map((item, index) => {
                        return <Radio.Button key={index} value={item.value}>{item.title}</Radio.Button>
                    })}
                </Radio.Group>
            </div>
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
                                    <Collapse.Panel header={`Mã đơn hàng : ${item.id} ------- Tình Trạng Đơn Hàng : 
                                    
                                    ${item.status === "Processing" ? "Đang Xử Lý" : item.status === "Processed" ? "Đã Xử Lý" : item.status === "Delivering" ? "Đang Vận Chuyển" : item.status === "Delivered" ? "Đã Vận Chuyển" : item.status === "Cancelled" ? "Đã Hủy" : "Có lỗi gì đó fen ơi :'("}`}>
                                        <div>
                                            <Divider orientation="left">Thông Tin Đơn Hàng</Divider>
                                            <div className={styles.orderInfo}>
                                                <h4>Địa chỉ : <span>{item.address}</span></h4>
                                                <h4>Trạng Thái :
                                                    {item.status === "Cancelled" ?
                                                        <span> Đã Hủy</span>
                                                        :
                                                        <span className={styles.selectStatus}>
                                                            <Select
                                                                onChange={(value) => onChangeStatus(value, item.id)}
                                                                style={{ width: 200 }}
                                                                defaultValue={item.status === "Processing" ? 0 : item.status === "Processed" ? 1 : item.status === "Delivering" ? 2 : item.status === "Delivered" ? 3 : item.status === "Cancelled" ? 4 : -1}
                                                            >
                                                                {orderStatus.map((status, index) => {
                                                                    return <Select.Option value={status.value} key={index}>{status.title}</Select.Option>
                                                                })}
                                                            </Select></span>
                                                    }
                                                </h4>
                                                <h4>Ngày đặt hàng : <span>{item.createdAt.split(" ")[0]}</span></h4>
                                                <h4>Ghi Chú : <span>{item.note}</span></h4>
                                                <h4>Tổng Tiền : <span>{formatter.format(item.total)}</span></h4>
                                            </div>
                                            <Divider orientation="left">Chi Tiết Đơn Hàng</Divider>
                                            {
                                                item.orderDetails.map((order, index) => {
                                                    return (
                                                        <div className={styles.orderDetail} key={index}>
                                                            <img src={`${BASE_IMAGE_URL}${order.thumbnail}`} alt={order.productName} className={styles.img} />
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
                <div className={styles.pagination}>
                    <Pagination onChange={onChangePage} defaultCurrent={pageIndex} total={orderResponse.totalPage !== undefined ? orderResponse.totalPage * 10 : 10} responsive />
                </div>
            </div>
        </div>
    )


}

export default ViewOrders