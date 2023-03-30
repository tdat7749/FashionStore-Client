import React, { useEffect } from 'react'
import { Form, Input, Button, message } from 'antd'
import styles from './login.module.css'
import Title from '../../../components/Client/Title'
import { useDispatch, useSelector } from 'react-redux'
import { AuthenticateClient } from '../../../redux/slice/AuthenSlice'
import { useNavigate } from 'react-router'
import Cookies from 'js-cookie'
import { getUser } from '../../../redux/slice/UserSlice'
import { Link } from 'react-router-dom'


const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const error = useSelector(state => state.authen.error)

    useEffect(() => {
        const userToken = Cookies.get("information")
        if (userToken !== undefined) {
            navigate('/')
        }
    }, [])

    const onFinish = (values) => {
        dispatch(AuthenticateClient(values))
            .then(res => {
                if (res.payload.success === false) {
                    message.error(res.payload.message)
                } else {
                    message.success('Đăng nhập thành công !')
                    const userToken = JSON.parse(Cookies.get("information"))
                    dispatch(getUser({ id: userToken.userId, token: userToken.accessToken }))
                    navigate('/')
                }
            })
        if (error !== null) {
            message.error(error)
        }

    }



    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <Title title='Đăng Nhập' />
                <div className={styles.form}>
                    <Form
                        labelCol={{ span: 6 }}
                        wrapperCol={{ xs: 22, sm: 22, md: 24, lg: 24, xl: 24 }}
                        layout='vertical'
                        style={{ maxWidth: '600px' }}
                        onFinish={onFinish}
                    >
                        <Form.Item label="Tên Đăng Nhập" name='userName' rules={[{ required: true, message: 'Không được để trống' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Mật Khẩu" name='password' rules={[{ required: true, message: 'Không được để trống' }]}>
                            <Input type='password' />
                        </Form.Item>
                        <Button htmlType='submit' type='primary'>Đăng Nhập</Button>
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

export default Login