import { Form, Input, Button, Breadcrumb, Divider, message } from 'antd'
import BreadcrumbItem from 'antd/es/breadcrumb/BreadcrumbItem'
import { HomeOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'
import Footer from '../../../components/Client/Footer'
import Navbar from '../../../components/Client/Navbar'
import Title from '../../../components/Client/Title'
import styles from './user.module.css'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import { changeInformation, changePassword, getUser } from '../../../redux/slice/UserSlice'
import { useForm } from 'antd/es/form/Form'

const User = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [form] = useForm()

    const user = useSelector(state => state.user.data?.data)
    const isLoading = useSelector(state => state.user.isLoading)
    const isUpdate = useSelector(state => state.user.isUpdate)

    useEffect(() => {
        const userToken = JSON.parse(Cookies.get("information"))
        dispatch(getUser({ id: userToken.userId, token: userToken.accessToken }))
            .then(res => {
                if (res.meta.requestStatus === "rejected") {
                    message.error(res.payload)
                    navigate('/')
                }
            })

    }, [dispatch])


    const handleChangeInformation = (value) => {
        const userToken = JSON.parse(Cookies.get("information"))
        const body = {
            userId: value.userId,
            firstName: value.firstName,
            lastName: value.lastName,
            email: value.email,
            phoneNumber: value.phoneNumber
        }
        dispatch(changeInformation({ body: body, token: userToken.accessToken }))
            .then(res => {
                if (res.meta.requestStatus === "rejected") {
                    message.error(res.payload)
                }
                else if (res.payload.success === false) {
                    message.error(res.payload.message)
                }
                else {
                    message.success("Cập nhật thông tin thành công !")
                }
            })

    }

    const handleChangePassword = (value) => {
        const userToken = JSON.parse(Cookies.get("information"))
        const body = {
            userId: value.userId,
            currentPassword: value.currentPassword,
            newPassword: value.newPassword,
            comfirmPassword: value.comfirmPassword
        }

        dispatch(changePassword({ body: body, token: userToken.accessToken }))
            .then(res => {
                if (res.meta.requestStatus === "rejected") {
                    message.error(res.payload)
                }
                else if (res.payload.success === false) {
                    message.error(res.payload.message)
                }
                else {
                    message.success("Đổi mật khẩu thành công !")
                    form.resetFields()
                }
            })
    }

    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <Breadcrumb className={styles.breadcrumb}>
                    <BreadcrumbItem>
                        <HomeOutlined />
                        <Link to='/'>Trang Chủ</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        Thông Tin Người Dùng
                    </BreadcrumbItem>
                </Breadcrumb>
                {(isLoading === false && user !== undefined) &&
                    <div className={styles.informationContainer}>
                        <Title title={'THÔNG TIN NGƯỜI DÙNG'} />
                        <div className={styles.basicInfomartion}>
                            <Divider orientation='left'>Thông Tin Cơ Bản</Divider>
                            <Form
                                labelCol={{ span: 4 }}
                                wrapperCol={{ sm: 24, md: 18, lg: 16, xl: 10 }}
                                layout='vertical'
                                initialValues={{
                                    userId: user.id,
                                    userName: user.userName,
                                    email: user.email,
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    phoneNumber: user.phoneNumber
                                }}
                                onFinish={handleChangeInformation}
                            >
                                <Form.Item label='ID' name='userId' hidden>
                                    <Input type='text' disabled />
                                </Form.Item>
                                <Form.Item label='Tài Khoản' name='userName'>
                                    <Input type='text' disabled />
                                </Form.Item>
                                <Form.Item
                                    label='Họ'
                                    name='firstName'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Không được để trống'
                                        }
                                    ]}
                                >
                                    <Input type='text' />
                                </Form.Item>
                                <Form.Item
                                    label='Tên'
                                    name='lastName'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Không được để trống'
                                        }
                                    ]}
                                >
                                    <Input type='text' />
                                </Form.Item>
                                <Form.Item
                                    label='Email'
                                    name='email'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Không được để trống'
                                        }
                                    ]}
                                >
                                    <Input type='email' />
                                </Form.Item>
                                <Form.Item
                                    label='Số Điện Thoại'
                                    name='phoneNumber'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Không được để trống'
                                        },
                                        {
                                            min: 10,
                                            message: 'Số điện thoại VN cần ít nhất 10 số'
                                        },
                                        {
                                            max: 11,
                                            message: 'Số điện thoại VN nhiều nhất 11 số'
                                        }
                                    ]}
                                >
                                    <Input type='text' />
                                </Form.Item>
                                <Button type='primary' loading={isUpdate} htmlType='submit'>Cập Nhật Thông Tin</Button>
                            </Form>
                        </div>
                        <div className={styles.changePassword}>
                            <Divider orientation='left'>Thay Đổi Mật Khẩu</Divider>
                            <Form
                                labelCol={{ span: 4 }}
                                wrapperCol={{ sm: 24, md: 18, lg: 16, xl: 10 }}
                                layout='vertical'
                                initialValues={{
                                    userId: user.id
                                }}
                                onFinish={handleChangePassword}
                                form={form}
                            >
                                <Form.Item label='ID' name='userId' hidden>
                                    <Input type='text' disabled />
                                </Form.Item>
                                <Form.Item
                                    label='Mật Khẩu Hiện Tại'
                                    name='currentPassword'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Không được để trống'
                                        }
                                    ]}
                                >
                                    <Input type='text' />
                                </Form.Item>
                                <Form.Item
                                    label='Mật Khẩu Mới'
                                    name='newPassword'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Không được để trống'
                                        },
                                        {
                                            min: 6,
                                            message: 'Mật khẩu phải ít nhất 6 ký tự'
                                        }
                                    ]}
                                >
                                    <Input type='text' />
                                </Form.Item>
                                <Form.Item
                                    label='Nhập Lại Mật Khẩu'
                                    name='comfirmPassword'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Không được để trống'
                                        },
                                        {
                                            min: 6,
                                            message: 'Mật khẩu phải ít nhất 6 ký tự'
                                        }
                                    ]}
                                >
                                    <Input type='text' />
                                </Form.Item>
                                <Button type='primary' loading={isUpdate} htmlType='submit'>Đổi Mật Khẩu</Button>
                            </Form>
                        </div>
                    </div>}
            </div>
            <Footer />
        </>
    )
}

export default User