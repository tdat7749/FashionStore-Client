import React, { useEffect, useState } from 'react'
import { useForm } from 'antd/es/form/Form'
import Title from '../../../../components/Admin/Title'
import { useDispatch, useSelector } from 'react-redux'
import styles from './createproduct.module.css'
import { Form, Input, Select, Button, message, InputNumber, Upload, Checkbox, Row, Col } from 'antd'
import { fetchCategories } from '../../../../redux/slice/CategorySlice'
import { fetchBrand } from '../../../../redux/slice/BrandSlice'
import { fetchOption } from '../../../../redux/slice/OptionSlice'
import { UploadOutlined, BgColorsOutlined } from '@ant-design/icons'
import { createProduct } from '../../../../redux/slice/ProductSlice'
import Cookies from 'js-cookie'



const CreateProduct = () => {

    const dispatch = useDispatch()
    const [form] = useForm()

    const categories = useSelector(state => state.category.data.data)
    const brands = useSelector(state => state.brand.data.data)
    const options = useSelector(state => state.option.data.data)
    const errorCategory = useSelector(state => state.category.error)
    const errorBrand = useSelector(state => state.brand.error)
    const errorOption = useSelector(state => state.option.error)
    const errorCreateProduct = useSelector(state => state.product.error)


    const onFinish = (value) => {
        const userToken = JSON.parse(Cookies.get("information"))

        const formData = {
            ...value,
            thumbnail: value.thumbnail.file,
        }
        dispatch(createProduct({ body: formData, token: userToken.accessToken }))
            .then(res => {
                if (res.meta.requestStatus === "rejected") {
                    message.error(res.payload)
                } else {
                    message.success("Tạo sản phẩm thành công !")
                    form.resetFields()
                }
            })
    }

    const beforeUpload = () => {
        // không cho Upload Component chạy upload
        return false;
    }

    useEffect(() => {
        const userToken = JSON.parse(Cookies.get("information"))

        dispatch(fetchBrand({ token: userToken.accessToken }))
        dispatch(fetchCategories({ token: userToken.accessToken }))
        dispatch(fetchOption({ token: userToken.accessToken }))
        let timeOut
        if (errorCategory !== null || errorBrand !== null || errorOption !== null) {
            timeOut = setTimeout(() => {
                message.error(errorCategory || errorBrand || errorOption)
            }, 2000)
        }

        return () => clearTimeout(timeOut)
    }, [dispatch, errorCategory, errorBrand, errorOption])





    return (
        <>
            <div className={styles.container}>
                <Title title={'THÊM MỚI SẢN PHẨM'} />
                <div className={styles.form}>
                    <Form
                        form={form}
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 10 }}
                        onFinish={onFinish}
                        encType='multipart/form-data'
                    >
                        <Form.Item name='name' required={true} label="Tên Sản Phẩm " rules={[{ required: true, message: 'Không được để trống' }]}>
                            <Input type='text' />
                        </Form.Item>
                        <Form.Item name='slug' required={true} label="Slug " rules={[{ required: true, message: 'Không được để trống' }]}>
                            <Input type='text' />
                        </Form.Item>
                        <Form.Item name='description' required={true} label="Mô Tả" rules={[{ required: true, message: 'Không được để trống' }]}>
                            <Input type='text' />
                        </Form.Item>
                        <Form.Item name='price' required={true} label="Giá Ban Đầu" rules={[{ required: true, message: 'Không được để trống' }]}>
                            <InputNumber />
                        </Form.Item>
                        <Form.Item name='priceSale' required={true} label="Giá Khuyến Mãi" rules={[{ required: true, message: 'Không được để trống' }]}>
                            <InputNumber />
                        </Form.Item>
                        <Form.Item name='categoryId' required={true} label="Danh Mục" rules={[{ required: true, message: 'Không được để trống' }]}>
                            <Select>
                                {categories !== undefined &&
                                    categories.map((item, index) => {
                                        return <Select.Option key={index} value={item.id}>{item.categoryName}</Select.Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item name='brandId' required={true} label="Thương Hiệu" rules={[{ required: true, message: 'Không được để trống' }]}>
                            <Select>
                                {brands !== undefined &&
                                    brands.map((item, index) => {
                                        return <Select.Option key={index} value={item.id}>{item.name}</Select.Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item name='status' required={true} label="Trạng Thái" rules={[{ required: true, message: 'Không được để trống' }]}>
                            <Select>
                                <Select.Option value={0}>Ngưng Hoạt Động</Select.Option>
                                <Select.Option value={1}>Hoạt Động</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name='thumbnail' label="Upload Hình Ảnh" rules={[{ required: true, message: 'Không được để trống' }]}>
                            <Upload beforeUpload={beforeUpload}>
                                <Button icon={<UploadOutlined />}>Upload hình ảnh</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item name='productInOptions' required={true} label="Trạng Thái" rules={[{ required: true, message: 'Không được để trống' }]}>
                            <Checkbox.Group>
                                <Row>
                                    <Col>
                                        {options !== undefined &&

                                            options.filter((item) => item.name === 'Size')
                                                .map((item, index) => {
                                                    return <Checkbox key={index} value={item.id}>{item.value}</Checkbox>
                                                })
                                        }
                                    </Col>
                                    <Col>
                                        {options !== undefined &&

                                            options.filter((item) => item.name === 'Color')
                                                .map((item, index) => {
                                                    return <Checkbox key={index} value={item.id}><BgColorsOutlined style={{ color: `${item.value}` }} /></Checkbox>
                                                })}
                                    </Col>
                                </Row>
                            </Checkbox.Group>
                        </Form.Item>
                        <Button type='primary' htmlType='submit'>Thêm Mới</Button>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default CreateProduct