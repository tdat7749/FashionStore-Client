import React, { useCallback, useState } from 'react'
import styles from './productdetail.module.css'
import { InputNumber, Button, message } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { formatter } from '../../../utils/helper'
import { useDispatch } from 'react-redux'
import { AddToCart } from '../../../redux/slice/CartSlice'

const ProductDetail = ({ detail }) => {

    const [color, setColor] = useState(null)
    const [size, setSize] = useState(null)
    const [quantity, setQuantity] = useState(0)

    const dispatch = useDispatch()

    const onChangeSize = (value) => {
        if (value === size) {
            setSize(null)
        }
        else {
            setSize(value)
        }
    }

    const onChangeColor = (value) => {
        if (value === color) {
            setColor(null)
        }
        else {
            setColor(value)
        }
    }

    const onChangeValueInput = useCallback((value) => {
        setQuantity(value)
    }, [setQuantity])

    const ToCart = () => {
        if (color === null) {
            message.error('Vui lòng lựa chọn màu của sản phẩm !')
        }
        else if (size === null) {
            message.error('Vui lòng lựa chọn size của sản phẩm !')
        }

        else if (quantity < 1) {
            message.error('Số lượng sản phẩm phải lớn hơn hoặc bằng 1')
        }
        else {
            const body = {
                productId: detail.id,
                productCartId: detail.id + color + size,
                quantity: quantity,
                color: color,
                size: size,
                price: detail.price,
                subTotal: detail.price * quantity,
                image: detail.thumbnail
            }
            dispatch(AddToCart(body))
            message.success('Thêm vào giỏ hàng thành công !')
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.nameWrapper}>
                <h4>{detail.name}</h4>
            </div>
            <div className={styles.priceWrapper}>
                <span>{formatter.format(detail.priceSale)}</span>
            </div>
            <div className={styles.colorWrapper}>
                <h4>Màu Sắc : </h4>
                <ul>
                    {detail?.colors?.map((item, index) => {
                        return <li className={styles.color} onClick={() => onChangeColor(item.value)} key={index} style={{ backgroundColor: item.value, opacity: item.value === color ? '1' : null }}>

                        </li>
                    })}
                </ul>
            </div>
            <div className={styles.sizeWrapper}>
                <h4>Kích Thước : </h4>
                <ul>
                    {detail?.sizes?.map((item, index) => {
                        return <li className={styles.size} onClick={() => onChangeSize(item.value)} style={{ border: item.value === size ? '#000 1px solid' : null }} key={index}>
                            {item.value}
                        </li>
                    })}
                </ul>
            </div>
            <div className={styles.quantityWrapper}>
                <InputNumber
                    type={'number'}
                    defaultValue={0}
                    min={0}
                    max={detail.stock}
                    bordered
                    disabled={detail.stock === 0 ? true : false}
                    size={'large'}
                    style={{ width: '30%' }}
                    onChange={onChangeValueInput}
                />
                <p>Số lượng còn lại : <span>{detail.stock}</span></p>
            </div>
            <div className={styles.btnWrapper}>
                <Button
                    size={'large'}
                    block
                    className={styles.btnBuy}
                    icon={<ShoppingCartOutlined />}
                    onClick={() => ToCart()}
                >
                    Thêm Vào Giỏ Hàng
                </Button>


            </div>
            <div className={styles.descriptionWrapper}>
                <h3>Mô Tả :</h3>
                <p>{detail.description}</p>

            </div>
        </div>
    )
}

export default ProductDetail