import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Title from '../../../../components/Admin/Title'
import Cookies from 'js-cookie'
import { getAllRoles, getRoleUser, updateRoleUser } from '../../../../redux/slice/RoleSlice'
import { message, Button, Checkbox, Form } from 'antd'
import styles from './permission.module.css'

const Permission = () => {

    const { userName } = useParams()

    const dispatch = useDispatch()

    const listRoles = useSelector(state => state.role.data.data)
    const listCurrentRoles = useSelector(state => state.role.listRoles.data)
    const isUpdate = useSelector(state => state.role.isUpdate)
    const isLoading = useSelector(state => state.role.isLoading)
    const isRoleLoading = useSelector(state => state.role.isRoleLoading)

    const onFinish = (value) => {
        const userToken = JSON.parse(Cookies.get("information"))
        const body = {
            userName: userName,
            listRoles: value.listRoles
        }

        dispatch(updateRoleUser({ body, token: userToken.accessToken }))
            .then(res => {
                if (res.meta.requestStatus === "rejected") {
                    message.error(res.payload)
                }
                else {
                    message.success("Cập nhật quyền thành công !")
                }
            })
    }

    useEffect(() => {
        const userToken = JSON.parse(Cookies.get("information"))
        dispatch(getAllRoles({ token: userToken.accessToken }))
            .then(res => {
                if (res.meta.requestStatus === "rejected") {
                    message.error(res.payload)
                }
            })

        dispatch(getRoleUser({ userName: userName, token: userToken.accessToken }))
            .then(res => {
                if (res.meta.requestStatus === "rejected") {
                    message.error(res.payload)
                }
            })
    }, [dispatch, userName])


    return (
        <div className={styles.container}>
            <Title title={'QUYỀN TÀI KHOẢN'} />
            <div className={styles.title}>
                <Link to={'/admin/nguoi-dung'}>
                    <Button>Quay lại danh sách</Button>
                </Link>
            </div>
            <div>
                <h4 className={styles.titlePermission}>Danh Sách Quyền</h4>
                {(isLoading === false && isRoleLoading === false) &&
                    <Form
                        initialValues={{
                            listRoles: listCurrentRoles
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item name='listRoles'>
                            <Checkbox.Group
                            >
                                {listRoles?.map((item, index) => {
                                    return <Checkbox key={index} value={item.name}>{item.name}</Checkbox>
                                })}
                            </Checkbox.Group>
                        </Form.Item>

                        <Button type='primary' loading={isUpdate} htmlType='submit'>Thay Đổi Quyền</Button>
                    </Form>}
            </div>
        </div>
    )
}

export default Permission