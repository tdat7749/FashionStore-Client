import React, { useEffect } from 'react'
import { useForm } from 'antd/es/form/Form'
import Title from '../../../../components/Admin/Title'
import { useDispatch, useSelector } from 'react-redux'
import styles from './createcategory.module.css'
import { Form, Input, Select, Button, message } from 'antd'
import { createCategory, fetchParentCategories } from '../../../../redux/slice/CategorySlice'
import Cookies from 'js-cookie'


const CreateCategory = () => {

    const dispatch = useDispatch()
    const [form] = useForm()

    const onFinish = (value) => {
        const userToken = JSON.parse(Cookies.get("information"))
        dispatch(createCategory({ body: value, token: userToken.accessToken }))
            .then(res => {
                if (res.meta.requestStatus === "rejected") {
                    message.error(res.payload)
                } else {
                    message.success("Tạo danh mục thành công !")
                    form.resetFields()
                }
            })
    }

    const parentCategories = useSelector(state => state.category.data.data)
    const isCategoryCreate = useSelector(state => state.category.isCreate)
    const error = useSelector(state => state.category.error)

    useEffect(() => {
        const userToken = JSON.parse(Cookies.get("information"))
        dispatch(fetchParentCategories({ token: userToken.accessToken }))
            .then(res => {
                if (res.meta.requestStatus === "rejected") {
                    message.error(res.payload)
                }
            })
    }, [dispatch])


    return (
        <div className={styles.container}>
            <Title title={'THÊM MỚI DANH MỤC'} />
            <div className={styles.form}>
                <Form
                    form={form}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 10 }}
                    onFinish={onFinish}
                >
                    <Form.Item name='categoryName' required={true} label="Tên Danh Mục " rules={[{ required: true, message: 'Không được để trống' }]}>
                        <Input type='text' />
                    </Form.Item>
                    <Form.Item name='parentId' required={true} label="Danh Mục Cha">
                        <Select defaultValue={0}>
                            <Select.Option key={'danhmuccha'} value={0}>Danh Mục Cha</Select.Option>
                            {parentCategories !== undefined &&
                                parentCategories.map((item, index) => {
                                    return <Select.Option key={index} value={item.id}>{item.categoryName}</Select.Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name='status' required={true} label="Trạng Thái">
                        <Select defaultValue={0}>
                            <Select.Option value={0}>Ngưng Hoạt Động</Select.Option>
                            <Select.Option value={1}>Hoạt Động</Select.Option>
                        </Select>
                    </Form.Item>
                    <Button type='primary' htmlType='submit' loading={isCategoryCreate}>Thêm Mới</Button>
                </Form>
            </div>
        </div>
    )
}

export default CreateCategory