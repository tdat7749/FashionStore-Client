import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './createuser.module.css'
import { Form, Input, Button, message } from 'antd'
import Title from '../../../../components/Admin/Title'
import { useForm } from 'antd/es/form/Form'
import { Register } from '../../../../redux/slice/AuthenSlice'
const CreateUser = () => {

    const dispatch = useDispatch()
    const [form] = useForm()

    const onFinish = (value) => {
        dispatch(Register(value))
            .then(res => {
                if (res.meta.requestStatus === "rejected") {
                    message.error(res.payload)
                }
                else if (res.payload.success === false) {
                    message.error(res.payload.message)
                }
                else {
                    message.success("Thêm mới tài khoản thành công !")
                    form.resetFields()
                }
            })
    }

    const isLoading = useSelector(state => state.authen.isLoading)

    return (
        <div className={styles.container}>
            <Title title={'THÊM NGƯỜI DÙNG MỚI'} />
            <div className={styles.form}>
                <Form
                    form={form}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 10 }}
                    onFinish={onFinish}
                >
                    <Form.Item name='userName' required={true} label="Tên Tài Khoản " rules={
                        [
                            { required: true, message: 'Không được để trống' },
                            { min: 6, message: 'Tài khoản phải nhiều hơn 6 ký tự' }
                        ]}>
                        <Input type='text' />
                    </Form.Item>
                    <Form.Item name='password' required={true} label="Mật Khẩu " rules={
                        [
                            { required: true, message: 'Không được để trống' },
                            { min: 6, message: 'Mật khẩu phải nhiều hơn 6 ký tự' }
                        ]
                    }>
                        <Input type='password' />
                    </Form.Item>
                    <Form.Item name='email' required={true} label="Địa Chỉ Email" rules={[{ required: true, message: 'Không được để trống' }]}>
                        <Input type='email' />
                    </Form.Item>
                    <Form.Item name='firstName' required={true} label="Họ và Tên Đệm" rules={[{ required: true, message: 'Không được để trống' }]}>
                        <Input type='text' />
                    </Form.Item>
                    <Form.Item name='lastName' required={true} label="Tên" rules={[{ required: true, message: 'Không được để trống' }]}>
                        <Input type='text' />
                    </Form.Item>
                    <Form.Item name='phoneNumber' required={true} label="Số Điện Thoại" rules={
                        [
                            { required: true, message: 'Không được để trống' },
                            { min: 10, message: 'Số điện thoại không được ít hơn 10 số' },
                            { max: 11, message: 'Số điện thoại không được nhiều hơn 11 số' }
                        ]}>
                        <Input type='text' />
                    </Form.Item>

                    <Button type='primary' htmlType='submit' loading={isLoading}>Thêm Mới</Button>
                </Form>
            </div>
        </div>
    )
}

export default CreateUser