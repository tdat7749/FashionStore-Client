import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './viewcategories.module.css'
import { Space, Tag, Button, Table, message } from 'antd'
import { Link } from 'react-router-dom'
import { fetchAllCategories, deleteCategory } from '../../../../redux/slice/CategorySlice'
import Cookies from 'js-cookie'
import Title from '../../../../components/Admin/Title'


const ViewCategories = () => {


    const dispatch = useDispatch()
    const categories = useSelector(state => state.category.data)
    const error = useSelector(state => state.category.error)

    const handleDeleteCategory = (id) => {
        const userToken = JSON.parse(Cookies.get("information"))
        dispatch(deleteCategory({ id: id, token: userToken.accessToken }))
            .then(res => {
                if (res.meta.requestStatus === 'rejected') {
                    message.error(res.payload)
                }
                else {
                    message.success('Xóa thành công !')
                }
            })
    }

    const colums = [
        {
            title: 'ID',
            key: 'ID',
            dataIndex: 'id'
        },
        {
            title: 'Danh Mục',
            key: 'categoryName',
            dataIndex: 'categoryName'
        },
        {
            title: 'Id Danh Mục Cha',
            key: 'parentId',
            dataIndex: 'parentId'
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
                    <p onClick={() => handleDeleteCategory(record.id)}>Xóa</p>
                </Space>
            ),

        }
    ]

    useEffect(() => {
        const userToken = JSON.parse(Cookies.get("information"))
        dispatch(fetchAllCategories({ token: userToken.accessToken }))
            .then(res => {
                if (res.meta.requestStatus === "rejected") {
                    message.error(res.payload)
                }
            })
    }, [dispatch, error])

    return (
        <>
            <div className={styles.container}>
                <Title title={'DANH SÁCH DANH MỤC SẢN PHẨM'} />
                <div className={styles.title}>
                    <Link to={'tao-moi'}>
                        <Button>Thêm Hãng Sản Xuất</Button>
                    </Link>
                </div>
                <Table columns={colums} dataSource={categories.data} className={styles.table} rowKey='id' />
            </div>
        </>
    )
}

export default ViewCategories