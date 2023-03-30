import React, { useEffect } from 'react'
import styles from './updateproduct.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { Form, Input, Select, Button, message, InputNumber, Upload, Checkbox, Row, Col } from 'antd'
import { fetchCategories } from '../../../../redux/slice/CategorySlice'
import { fetchBrand } from '../../../../redux/slice/BrandSlice'
import { fetchOption } from '../../../../redux/slice/OptionSlice'
import { UploadOutlined } from '@ant-design/icons'
import { fetchProductDetail, updateProduct } from '../../../../redux/slice/ProductSlice'
import Title from '../../../../components/Admin/Title'
import Cookies from 'js-cookie'

const UpdateProduct = () => {

    const dispatch = useDispatch()
    const { slugParam } = useParams()

    const categories = useSelector(state => state.category.data.data)
    const brands = useSelector(state => state.brand.data.data)
    const options = useSelector(state => state.option.data.data)
    const product = useSelector(state => state.product.detail.data)
    const errorCategory = useSelector(state => state.category.error)
    const errorBrand = useSelector(state => state.brand.error)
    const errorOption = useSelector(state => state.option.error)
    const isUpdate = useSelector(state => state.product.isUpdate)
    const isLoading = useSelector(state => state.product.isLoading)

    const onFinish = (value) => {
        const formData = {
            ...value,
            thumbnail: value?.thumbnail?.file === undefined ? null : value?.thumbnail?.file,
        }

        const userToken = JSON.parse(Cookies.get("information"))
        dispatch(updateProduct({ body: formData, token: userToken.accessToken }))
            .then(res => {
                if (res.meta.requestStatus === "rejected") {
                    message.error(res.payload)
                } else {
                    message.success("Sửa sản phẩm thành công !")
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
        dispatch(fetchProductDetail(slugParam))
        if (errorCategory !== null || errorBrand !== null || errorOption !== null) {
            message.error(errorCategory || errorBrand || errorOption)
        }

    }, [dispatch, slugParam, errorCategory, errorBrand, errorOption])

    return (
        <>
            <div className={styles.container}>
                <Title title={'CHỈNH SỬA SẢN PHẨM'} />
                {(product !== undefined && isLoading === false) &&
                    <div className={styles.form}>
                        <Form
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 10 }}
                            onFinish={onFinish}
                            encType='multipart/form-data'
                            initialValues={{
                                productId: product.id,
                                productName: product.name,
                                slug: product.slug,
                                description: product.description,
                                price: product.price,
                                priceSale: product.priceSale,
                                categoryId: product.category.id,
                                brandId: product.brand.id,
                                status: product.status === 'Disable' ? 0 : product.status === 'Enable' ? 1 : -1,
                                productInOptions: product.sizes.map((item) => item.id).concat(product.colors.map((item) => item.id))
                            }}
                        >
                            <Form.Item name='productId' required={true} label="Mã Sản Phẩm " rules={[{ required: true, message: 'Không được để trống' }]}>
                                <Input type='text' disabled />
                            </Form.Item>
                            <Form.Item name='productName' required={true} label="Tên Sản Phẩm " rules={[{ required: true, message: 'Không được để trống' }]}>
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
                                    <Select.Option value={0}>Disable</Select.Option>
                                    <Select.Option value={1}>Enable</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name='thumbnail' label="Upload Hình Ảnh" >
                                <Upload beforeUpload={beforeUpload}>
                                    <Button icon={<UploadOutlined />}>Upload hình ảnh</Button>
                                </Upload>
                            </Form.Item>
                            <Form.Item name='productInOptions' required={true} label="Trạng Thái" rules={[{ required: true, message: 'Không được để trống' }]}>
                                <Checkbox.Group
                                >
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
                                                        return <Checkbox key={index} value={item.id}>{item.value}</Checkbox>
                                                    })}
                                        </Col>
                                    </Row>
                                </Checkbox.Group>
                            </Form.Item>
                            <Button type='primary' loading={isUpdate} htmlType='submit'>Sửa Sản Phẩm</Button>
                        </Form>
                    </div>
                }
            </div>
        </>
    )
}

export default UpdateProduct