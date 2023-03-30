import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBrand, deleteBrand } from '../../../../redux/slice/BrandSlice'
import styles from './viewbrands.module.css'
import { Space, Tag, Button, Table, message } from 'antd'
import { Link } from 'react-router-dom'
import Title from '../../../../components/Admin/Title'
import Cookies from 'js-cookie'

const ViewBrands = () => {
    const dispatch = useDispatch()
    const listBrand = useSelector(state => state.brand.data)
    const error = useSelector(state => state.brand.error)

    const handleDeleteBrand = (brandId) => {
        const userToken = JSON.parse(Cookies.get("information"))
        dispatch(deleteBrand({ brandId: brandId, token: userToken.accessToken }))
    }

    const colums = [
        {
            title: 'ID',
            key: 'ID',
            dataIndex: 'id'
        },
        {
            title: 'Sản Phẩm',
            key: 'name',
            dataIndex: 'name'
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
                    <p onClick={() => handleDeleteBrand(record.id)}>Xóa</p>
                </Space>
            ),

        }
    ]



    useEffect(() => {
        const userToken = JSON.parse(Cookies.get("information"))
        dispatch(fetchBrand({ token: userToken.accessToken }))
            .then(res => {
                if (res.meta.requestStatus === "rejected") {
                    message.error(res.payload)
                }
            })
    }, [dispatch, error])

    return (
        <div className={styles.container}>
            <Title title={'DANH SÁCH THƯƠNG HIỆU'} />
            <div className={styles.title}>
                <Link to={'tao-moi'}>
                    <Button>Thêm Thương Hiệu</Button>
                </Link>
            </div>
            <Table columns={colums} dataSource={listBrand.data} className={styles.table} rowKey='id' />
        </div>
    )
}

export default ViewBrands