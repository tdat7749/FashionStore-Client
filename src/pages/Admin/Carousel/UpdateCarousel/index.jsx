import React, { useEffect } from 'react'
import Title from '../../../../components/Admin/Title'
import { useDispatch, useSelector } from 'react-redux'
import styles from './updatecarousel.module.css'
import { Form, Input, Select, Button, message, InputNumber, Upload } from 'antd'
import { useNavigate, useParams } from 'react-router'
import Cookies from 'js-cookie'
import { UploadOutlined } from '@ant-design/icons'
import { fetchDetailCarousel, updateCarousel } from '../../../../redux/slice/CarouselSlice'

const UpdateCarousel = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onNavigate = () => {
        navigate("/admin/slide-show")
    }

    const carousel = useSelector(state => state.carousel.detail.data)
    const isUpdate = useSelector(state => state.carousel.isUpdate)
    const isLoading = useSelector(state => state.carousel.isLoading)

    useEffect(() => {
        const userToken = JSON.parse(Cookies.get("information"))
        dispatch(fetchDetailCarousel({ id: id, token: userToken.accessToken }))
            .then(res => {
                if (res.meta.requestStatus === "rejected") {
                    message.error(res.payload)
                }
            })

    }, [dispatch, id])

    const beforeUpload = () => {
        // không cho Upload Component chạy upload
        return false;
    }

    const onFinish = (value) => {
        const formData = {
            ...value,
            url: value?.url?.file === undefined ? null : value?.url?.file,
        }

        const userToken = JSON.parse(Cookies.get("information"))
        dispatch(updateCarousel({ body: formData, token: userToken.accessToken }))
            .then(res => {
                if (res.meta.requestStatus === "rejected") {
                    message.error(res.payload)
                } else {
                    message.success("Sửa carousel thành công !")
                }
            })
    }

    return (
        <>
            {(carousel !== undefined && isLoading === false) &&
                <div className={styles.container}>
                    <Title title={'CHỈNH SỬA CAROUSEL'} />
                    <div className={styles.btn}>
                        <Button onClick={() => onNavigate()}>Quay lại danh sách</Button>
                    </div>
                    <div className={styles.form}>
                        <Form
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 10 }}
                            onFinish={onFinish}
                            initialValues={{
                                slideId: carousel.id,
                                name: carousel.name,
                                status: carousel.status === 'Disable' ? 0 : carousel.status === 'Enable' ? 1 : -1,
                                sortOrder: carousel.sortOrder,
                            }}
                        >
                            <Form.Item name='slideId' required={true} label="Mã Carousel " rules={[{ required: true, message: 'Không được để trống' }]}>
                                <Input type='text' disabled />
                            </Form.Item>
                            <Form.Item name='name' required={true} label="Tên Carousel " rules={[{ required: true, message: 'Không được để trống' }]}>
                                <Input type='text' />
                            </Form.Item>
                            <Form.Item name='sortOrder' required={true} label="Thứ Tự Sắp Xếp" rules={[{ required: true, message: 'Không được để trống' }]}>
                                <InputNumber />
                            </Form.Item>
                            <Form.Item name='status' required={true} label="Trạng Thái">
                                <Select >
                                    <Select.Option value={0}>Disable</Select.Option>
                                    <Select.Option value={1}>Enable</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name='url' label="Upload Hình Ảnh" >
                                <Upload beforeUpload={beforeUpload}>
                                    <Button icon={<UploadOutlined />}>Upload hình ảnh</Button>
                                </Upload>
                            </Form.Item>
                            <Form.Item label>
                                <Button type='primary' htmlType='submit' loading={isUpdate}>Chỉnh Sửa</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            }
        </>
    )
}

export default UpdateCarousel