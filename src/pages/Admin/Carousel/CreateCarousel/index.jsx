import React from 'react'
import Title from '../../../../components/Admin/Title'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'antd/es/form/Form'
import { Form, Input, Select, Button, message, InputNumber, Upload } from 'antd'
import Cookies from 'js-cookie'
import { UploadOutlined } from '@ant-design/icons'
import styles from './createcarousel.module.css'
import { useNavigate } from 'react-router'
import { createCarousel } from '../../../../redux/slice/CarouselSlice'

const CreateCarousel = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [form] = useForm()

    const isCreate = useSelector(state => state.carousel.isCreate)

    const beforeUpload = () => {
        // không cho Upload Component chạy upload
        return false;
    }

    const onNavigate = () => {
        navigate('/admin/slide-show')
    }

    const onFinish = (value) => {
        const formData = {
            ...value,
            url: value?.url?.file === undefined ? null : value?.url?.file,
        }

        const userToken = JSON.parse(Cookies.get("information"))
        dispatch(createCarousel({ body: formData, token: userToken.accessToken }))
            .then(res => {
                if (res.meta.requestStatus === "rejected") {
                    message.error(res.payload)
                } else {
                    message.success("Tạo carousel thành công !")
                    form.resetFields()
                }
            })
    }

    return (
        <>
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
                        form={form}
                    >
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
                        <Form.Item name='url' label="Upload Hình Ảnh" rules={[{ required: true, message: 'Không được để trống' }]}>
                            <Upload beforeUpload={beforeUpload}>
                                <Button icon={<UploadOutlined />}>Upload hình ảnh</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item label>
                            <Button type='primary' htmlType='submit' loading={isCreate}>Tạo Carousel</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default CreateCarousel