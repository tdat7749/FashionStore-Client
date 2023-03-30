import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './updateimageproduct.module.css'
import { Space, Button, Table, message, Upload, Form, Input } from 'antd'
import { Link, useParams } from 'react-router-dom'
import Title from '../../../../components/Admin/Title'
import { BASE_IMAGE_URL } from '../../../../utils/helper'
import Cookies from 'js-cookie'
import { createImage, deleteImage, fetchProductImage } from '../../../../redux/slice/ProductSlice'
import { UploadOutlined } from '@ant-design/icons'
import { useForm } from 'antd/es/form/Form'


const UpdateImageProduct = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const [form] = useForm()


    const handleDeleteImage = (id) => {
        const userToken = JSON.parse(Cookies.get("information"))
        dispatch(deleteImage({ id: id, token: userToken.accessToken }))
            .then(res => {
                if (res.meta.requestStatus === "rejected") {
                    message.error(res.payload)
                }
                else {
                    message.success("Xóa hình ảnh thành công !")
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
            key: 'url',
            dataIndex: 'url',
            render: (_, record) => (
                <img src={`${BASE_IMAGE_URL}${record.url}`} alt={record.nameImage} className={styles.img}></img>
            )
        },
        {
            title: 'Hành Động',
            key: 'action',
            render: (_, record) => (
                <Space size='large' style={{ cursor: 'pointer' }}>
                    <p onClick={() => handleDeleteImage(record.id)}>Xóa</p>
                </Space>
            ),

        }
    ]

    useEffect(() => {
        const userToken = JSON.parse(Cookies.get("information"))
        dispatch(fetchProductImage({ id: id, token: userToken.accessToken }))
            .then(res => {
                if (res.meta.requestStatus === "rejected") {
                    message.error(res.payload)
                }
            })
    }, [dispatch, id])

    const productImageResponse = useSelector(state => state.product.listImages)
    const isLoading = useSelector(state => state.product.isLoading)


    const beforeUpload = () => {

        return false
    }


    const onFinish = (value) => {
        const userToken = JSON.parse(Cookies.get("information"))
        const body = {
            productId: Number(id),
            nameImage: value.nameImage,
            image: value.image.file
        }

        dispatch(createImage({ body, token: userToken.accessToken }))
            .then(res => {
                if (res.meta.requestStatus === "rejected") {
                    message.error(res.payload)
                }
                else {
                    message.success("Thêm hình ảnh thành công !")
                    form.resetFields()
                    dispatch(fetchProductImage({ id: id, token: userToken.accessToken }))
                }
            })
    }

    return (
        <div className={styles.container}>
            <Title title={`DANH SÁCH HÌNH ẢNH CỦA SẢN PHẨM MÃ ${id}`} />
            <div className={styles.title}>
                <div>
                    <Form
                        onFinish={onFinish}
                        encType='multipart/form-data'
                        form={form}
                    >
                        <Form.Item label='Tên hình ảnh' name='nameImage' rules={[{ required: true, message: 'Không được để trống' }]}>
                            <Input type='text' />
                        </Form.Item>
                        <Form.Item name='image' rules={[{ required: true, message: 'Không được để trống' }]}>
                            <Upload
                                beforeUpload={beforeUpload}
                            >
                                <Button icon={<UploadOutlined />}>Nhấp vào để chọn ảnh</Button>
                            </Upload>
                        </Form.Item>

                        <Button type='primary' htmlType='submit'>Thêm Hình Ảnh</Button>
                        <p>Lưu ý: Trong một lần chỉ nên thêm 1 hình ảnh</p>
                    </Form>

                </div>
                <div>
                    <Link to={'/admin/san-pham'}>
                        <Button>Quay lại danh sách</Button>
                    </Link>
                </div>

            </div>
            <div>
                <Table columns={columns} loading={isLoading} pagination={false} dataSource={productImageResponse.data} className={styles.table} rowKey='id' />
            </div>
        </div>
    )
}

export default UpdateImageProduct