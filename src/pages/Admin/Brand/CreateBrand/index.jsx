import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './createbrand.module.css'
import { Form, Input, Select, Button, message } from 'antd'
import Title from '../../../../components/Admin/Title'
import { createBrand } from '../../../../redux/slice/BrandSlice'
import { useForm } from 'antd/es/form/Form'
import Cookies from 'js-cookie'

const CreateBrand = () => {

    const dispatch = useDispatch()
    const [form] = useForm()

    const onFinish = (value) => {
        const userToken = JSON.parse(Cookies.get("information"))
        dispatch(createBrand({ body: value, token: userToken.accessToken }))
            .then(res => {
                if (res.meta.requestStatus === "rejected") {
                    message.error(res.payload)
                } else {
                    message.success("Tạo thương hiệu thành công !")
                    form.resetFields()
                }
            })
    }

    const isCreate = useSelector(state => state.brand.isCreate)

    return (
        <div className={styles.container}>
            <Title title={'THÊM MỚI THƯƠNG HIỆU'} />
            <div className={styles.form}>
                <Form
                    form={form}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 10 }}
                    onFinish={onFinish}
                >
                    <Form.Item name='name' required={true} label="Tên Thương Hiệu " rules={[{ required: true, message: 'Không được để trống' }]}>
                        <Input type='text' />
                    </Form.Item>
                    <Form.Item name='status' required={true} label="Trạng Thái">
                        <Select >
                            <Select.Option value={0}>Ngưng Hoạt Động</Select.Option>
                            <Select.Option value={1}>Hoạt Động</Select.Option>
                        </Select>
                    </Form.Item>
                    <Button type='primary' htmlType='submit' loading={isCreate}>Thêm Mới</Button>
                </Form>
            </div>
        </div>
    )
}

export default CreateBrand