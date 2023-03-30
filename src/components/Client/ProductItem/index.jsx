import React from 'react'
import styles from './productitem.module.css'
import { Link } from 'react-router-dom'
import { formatter, BASE_IMAGE_URL } from '../../../utils/helper'

const ProductItem = ({ product }) => {
    return (
        <div className={styles.container}>
            <Link to={`/san-pham/${product.slug}`}>
                <img src={`${BASE_IMAGE_URL}${product.thumbnail}`} alt={product.name} className={styles.img} />
            </Link>
            <div className={styles.information}>
                <h4>{product.name}</h4>
                <h5>{formatter.format(product.priceSale)}</h5>
            </div>
        </div>
    )
}

export default ProductItem