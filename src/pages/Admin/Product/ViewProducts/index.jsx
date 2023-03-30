import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './viewproducts.module.css'
import { Space, Tag, Button, Table, message, Pagination } from 'antd'
import { Link } from 'react-router-dom'
import Title from '../../../../components/Admin/Title'
import { BASE_IMAGE_URL } from '../../../../utils/helper'
import { deleteProduct, fetchProductPaging } from '../../../../redux/slice/ProductSlice'
import Cookies from 'js-cookie'


const ViewProducts = () => {

    const dispatch = useDispatch()
    const [page, setPage] = useState(1)


    const handleDeleteProduct = (id) => {
        const userToken = JSON.parse(Cookies.get("information"))

        dispatch(deleteProduct({ id, token: userToken.accessToken }))
            .then(res => {
                if (res.meta.requestStatus === "rejected") {
                    message.error(res.payload)
                } else {
                    message.success("Xóa thành công !")
                }
            })
    }

    const columns = [
        {
            title: 'ID',
            key: 'ID',
            dataIndex: 'id'
        },
        {
            title: 'Hình Ảnh',
            key: 'thumbnail',
            dataIndex: 'thumbnail',
            render: (_, record) => (
                <img src={`${BASE_IMAGE_URL}${record.thumbnail}`} alt={record.slug} className={styles.img}></img>
            )
        },
        {
            title: 'Sản Phẩm',
            key: 'name',
            dataIndex: 'name'
        },
        {
            title: 'Số Lượng',
            key: 'stock',
            dataIndex: 'stock'
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
                    <Link to={`chinh-sua/hinh-anh/${record.id}`}>
                        <p>Ảnh Sản Phẩm</p>
                    </Link>
                    <Link to={`chinh-sua/${record.slug}`}>
                        <p>Sửa Sản Phẩm</p>
                    </Link>
                    <p onClick={() => handleDeleteProduct(record.id)}>Xóa</p>
                </Space>
            ),

        }
    ]

    const productResponse = useSelector(state => state.product.data)
    const isLoading = useSelector(state => state.product.isLoading)

    useEffect(() => {
        const userToken = JSON.parse(Cookies.get("information"))
        dispatch(fetchProductPaging({ pageIndex: page, token: userToken.accessToken }))
            .then(res => {
                if (res.meta.requestStatus === "rejected") {
                    message.error(res.payload)
                }
            })
    }, [dispatch, page])

    const onChangePageIndex = (page) => {
        setPage(page)
    }


    return (
        <div className={styles.container}>
            <Title title={'DANH SÁCH SẢN PHẨM'} />
            <div className={styles.title}>
                <Link to={'tao-moi'}>
                    <Button>Thêm Sản Phẩm</Button>
                </Link>
            </div>
            <div className={styles.tableContainer}>
                <Table columns={columns} loading={isLoading} pagination={false} dataSource={productResponse.data} className={styles.table} rowKey='id' />
                <div className={styles.pagination}>
                    <Pagination onChange={onChangePageIndex} defaultCurrent={1} total={productResponse.totalPage !== undefined ? productResponse.totalPage * 10 : 10} responsive />
                </div>
            </div>
        </div>
    )
}

export default ViewProducts