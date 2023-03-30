import React, { useEffect } from 'react'
import Title from '../../../../components/Admin/Title'
import { useDispatch, useSelector } from 'react-redux'
import styles from './updatecategory.module.css'
import { Form, Input, Select, Button, message } from 'antd'
import { useNavigate, useParams } from 'react-router'
import { fetchParentCategories, fetchDetailCategory, updateCategory } from '../../../../redux/slice/CategorySlice'
import Cookies from 'js-cookie'


const UpdateCategory = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()




    const category = useSelector(state => state.category.detail.data)
    const parentCategories = useSelector(state => state.category.data.data)
    const isUpdate = useSelector(state => state.category.isUpdate)
    const isLoading = useSelector(state => state.category.isLoading)


    useEffect(() => {
        const userToken = JSON.parse(Cookies.get("information"))
        dispatch(fetchDetailCategory({ id: id, token: userToken.accessToken }))
            .then(res => {
                if (res.meta.requestStatus === "rejected") {
                    message.error(res.payload)
                }
            })

        dispatch(fetchParentCategories({ token: userToken.accessToken }))
            .then(res => {
                if (res.meta.requestStatus === "rejected") {
                    message.error(res.payload)
                }
            })
    }, [dispatch, id])

    const onFinish = (value) => {
        const userToken = JSON.parse(Cookies.get("information"))
        dispatch(updateCategory({ body: value, token: userToken.accessToken }))
            .then(res => {
                if (res.meta.requestStatus === "rejected") {
                    message.error(res.payload)
                } else {
                    message.success("Sửa danh mục thành công !")
                }
            })
    }

    const onNavigate = () => {
        navigate("/admin/danh-muc")
    }

    return (
        <>
            {(category !== undefined && isLoading === false) &&
                <div className={styles.container}>
                    <Title title={'CHỈNH SỬA DANH MỤC'} />
                    <div className={styles.btn}>
                        <Button onClick={() => onNavigate()}>Quay lại danh sách</Button>
                    </div>
                    <div className={styles.form}>
                        <Form
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 10 }}
                            onFinish={onFinish}
                            initialValues={{
                                categoryId: category.id,
                                categoryName: category.categoryName,
                                status: category.status === 'Disable' ? 0 : category.status === 'Enable' ? 1 : -1,
                                parentId: category.parentId
                            }}
                        >
                            <Form.Item name='categoryId' required={true} label="Mã Danh Mục " rules={[{ required: true, message: 'Không được để trống' }]}>
                                <Input type='text' disabled />
                            </Form.Item>
                            <Form.Item name='categoryName' required={true} label="Tên Danh Mục " rules={[{ required: true, message: 'Không được để trống' }]}>
                                <Input type='text' />
                            </Form.Item>
                            <Form.Item name='parentId' required={true} label="Danh Mục Cha">
                                <Select >
                                    <Select.Option key={'danhmuccha'} value={0}>Danh Mục Cha</Select.Option>
                                    {parentCategories !== undefined &&

                                        parentCategories.map((item, index) => {
                                            return <Select.Option key={index} value={item.id}>{item.categoryName}</Select.Option>
                                        })
                                    }
                                </Select>
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

export default UpdateCategory