import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './viewcarousels.module.css'
import { Space, Tag, Button, Table, message } from 'antd'
import { Link } from 'react-router-dom'
import Title from '../../../../components/Admin/Title'
import Cookies from 'js-cookie'
import { fetchAdminCarousel, deleteCarousel } from '../../../../redux/slice/CarouselSlice'

const ViewCarousels = () => {

    const dispatch = useDispatch()
    const listCarousel = useSelector(state => state.carousel.data)
    const error = useSelector(state => state.carousel.error)

    const handleDeleteCarousel = (id) => {
        const userToken = JSON.parse(Cookies.get("information"))
        dispatch(deleteCarousel({ id: id, token: userToken.accessToken }))
    }

    const colums = [
        {
            title: 'ID',
            key: 'id',
            dataIndex: 'id'
        },
        {
            title: 'Tên Carousel',
            key: 'name',
            dataIndex: 'name'
        },
        {
            title: 'Thứ Tự',
            key: 'sortOrder',
            dataIndex: 'sortOrder'
        },
        {
            title: 'Trạng Thái',
            key: 'status',
            dataIndex: 'status',
            render: (value) => (
                <Tag color={value === 'Enable' ? 'green' : 'red'}>
                    {value}
                </Tag>
            )
        },
        {
            title: 'Hành Động',
            key: 'action',
            render: (_, record) => (
                <Space size='large' style={{ cursor: 'pointer' }}>
                    <Link to={`chinh-sua/${record.id}`}>
                        <p>Sửa</p>
                    </Link>
                    <p onClick={() => handleDeleteCarousel(record.id)}>Xóa</p>
                </Space>
            ),
        }
    ]

    useEffect(() => {
        const userToken = JSON.parse(Cookies.get("information"))
        dispatch(fetchAdminCarousel({ token: userToken.accessToken }))
        let timeOut
        if (error !== null) {
            timeOut = setTimeout(() => {
                message.error(error)
            }, 2000)
        }
        return () => clearTimeout(timeOut)
    }, [dispatch, error])

    return (
        <div className={styles.container}>
            <Title title={'DANH SÁCH CAROUSEL'} />
            <div className={styles.title}>
                <Link to={'tao-moi'}>
                    <Button>Thêm Carousel</Button>
                </Link>
            </div>
            <Table columns={colums} dataSource={listCarousel.data} className={styles.table} rowKey='id' />
        </div>
    )
}

export default ViewCarousels