import React, { useEffect } from 'react'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import styles from './register.module.css'
import Title from '../../../components/Client/Title'
import { Form, Input, Button, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useNavigate } from 'react-router'
import { Register } from '../../../redux/slice/AuthenSlice'
import { Link } from 'react-router-dom'

const RegisterPage = () => {

    const [form] = useForm()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const userToken = Cookies.get("information")
        if (userToken !== undefined) {
            navigate('/')
        }
    }, [])

    const handleRegister = (value) => {
        dispatch(Register(value))
            .then(res => {
                if (res.meta.requestStatus === "rejected") {
                    message.error(res.payload)
                }
                else if (res.payload.success === false) {
                    message.error(res.payload.message)
                }
                else {
                    message.success("Đăng ký tài khoản thành công !")
                    form.resetFields()
                }
            })
    }

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <Title title='Đăng Ký' />
                <div className={styles.form}>
                    <Form
                        labelCol={{ span: 6 }}
                        wrapperCol={{ xs: 22, sm: 22, md: 24, lg: 24, xl: 24 }}
                        layout='vertical'
                        style={{ maxWidth: '600px' }}
                        onFinish={handleRegister}
                        form={form}
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
                        <Button htmlType='submit' type='primary'>Đăng Ký</Button>
                    </Form>
                    <div style={{ textAlign: 'center', margin: '2rem 0' }}>
                        <Link to={'/'}>
                            <Button type='primary' >Quay Lại Trang Chủ</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage