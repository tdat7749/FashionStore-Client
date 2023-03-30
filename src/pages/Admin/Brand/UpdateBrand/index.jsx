import React, { useEffect } from 'react'
import Title from '../../../../components/Admin/Title'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { Form, Button, Select, Input, message } from 'antd'
import { fetchDetailBrand, updateBrand } from '../../../../redux/slice/BrandSlice'
import styles from './updatebrand.module.css'
import Cookies from 'js-cookie'


const UpdateBrand = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        const userToken = JSON.parse(Cookies.get("information"))
        dispatch(fetchDetailBrand({ id: id, token: userToken.accessToken }))
    }, [dispatch, id])

    const brand = useSelector(state => state.brand.detail.data)
    const isUpdate = useSelector(state => state.brand.isUpdate)
    const isLoading = useSelector(state => state.brand.isLoading)


    const onFinish = (value) => {
        const userToken = JSON.parse(Cookies.get("information"))
        dispatch(updateBrand({ body: value, token: userToken.accessToken }))
            .then(res => {
                if (res.meta.requestStatus === "rejected") {
                    message.error(res.payload)
                } else {
                    message.success("Sửa thương hiệu thành công !")

                }
            })
    }

    const onNavigate = () => {
        navigate("/admin/thuong-hieu")
    }

    return (
        <>
            {(brand !== undefined && isLoading === false) &&
                <div className={styles.container}>
                    <Title title={'THÊM MỚI THƯƠNG HIỆU'} />
                    <div className={styles.btn}>
                        <Button onClick={() => onNavigate()}>Quay lại danh sách</Button>
                    </div>
                    <div className={styles.form}>
                        <Form
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 10 }}
                            onFinish={onFinish}
                            initialValues={{
                                id: brand.id,
                                name: brand.name,
                                status: brand.status === 'Disable' ? 0 : brand.status === 'Enable' ? 1 : -1
                            }}
                        >
                            <Form.Item name='id' required={true} label="Mã Thương Hiệu " rules={[{ required: true, message: 'Không được để trống' }]}>
                                <Input type='text' disabled />
                            </Form.Item>
                            <Form.Item name='name' required={true} label="Tên Thương Hiệu " rules={[{ required: true, message: 'Không được để trống' }]}>
                                <Input type='text' />
                            </Form.Item>
                            <Form.Item name='status' required={true} label="Trạng Thái">
                                <Select >
                                    <Select.Option value={0}>Disable</Select.Option>
                                    <Select.Option value={1}>Enable</Select.Option>
                                </Select>
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

export default UpdateBrand