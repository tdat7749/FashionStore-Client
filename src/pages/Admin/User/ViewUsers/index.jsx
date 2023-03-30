import React, { useEffect, useState } from 'react'
import styles from './viewUser.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { Space, Tag, Button, Table, message, Pagination } from 'antd'
import { Link } from 'react-router-dom'
import Title from '../../../../components/Admin/Title'
import { BASE_IMAGE_URL } from '../../../../utils/helper'
import Cookies from 'js-cookie'
import { getPagingUser } from '../../../../redux/slice/UserSlice'

const ViewUsers = () => {

    const dispatch = useDispatch()
    const [page, setPage] = useState(1)


    const columns = [
        {
            title: 'Tài Khoản',
            key: 'userName',
            dataIndex: 'userName',

        },
        {
            title: 'Họ',
            key: 'firstName',
            dataIndex: 'firstName'
        },
        {
            title: 'Tên',
            key: 'lastName',
            dataIndex: 'lastName'
        },
        {
            title: 'Email',
            key: 'email',
            dataIndex: 'email',
        },
        {
            title: 'Số Điện Thoại',
            key: 'phoneNumber',
            dataIndex: 'phoneNumber',
        },
        {
            title: 'Hành Động',
            key: 'action',
            render: (_, record) => (
                <Space size='large' style={{ cursor: 'pointer' }}>
                    <Link to={`phan-quyen/${record.userName}`}>
                        <p>Phân Quyền</p>
                    </Link>
                </Space>
            ),
        }
    ]

    const usersResponse = useSelector(state => state.user.listUser)
    const isLoading = useSelector(state => state.user.isLoading)

    const onChangePageIndex = (page) => {
        setPage(page)
    }

    useEffect(() => {
        const userToken = JSON.parse(Cookies.get("information"))
        dispatch(getPagingUser({ pageIndex: page, token: userToken.accessToken }))
            .then(res => {
                if (res.meta.requestStatus === "rejected") {
                    message.error(res.payload)
                }
            })

    }, [dispatch, page])

    return (
        <div className={styles.container}>
            <Title title={'DANH SÁCH TÀI KHOẢN'} />
            <div className={styles.title}>
                <Link to={'tao-moi'}>
                    <Button>Thêm Tài Khoản</Button>
                </Link>
            </div>
            <div>
                <Table columns={columns} loading={isLoading} pagination={false} dataSource={usersResponse.data} className={styles.table} rowKey='userName' />
                <div className={styles.pagination}>
                    <Pagination onChange={onChangePageIndex} defaultCurrent={1} total={usersResponse.totalPage !== undefined ? usersResponse.totalPage * 10 : 10} responsive />
                </div>
            </div>
        </div>
    )
}

export default ViewUsers