import React from 'react'
import Title from '../Title'
import styles from './productcollection.module.css'
import ProductItem from '../ProductItem'

const ProductCollection = ({ listProduct, title }) => {
    return (
        <div className={styles.container}>
            <Title title={title} />
            {(listProduct !== undefined) &&
                <div className={styles.collection}>
                    {listProduct.map((product, index) => {
                        return <ProductItem key={index} product={product} />
                    })}
                </div>
            }
        </div>
    )
}

export default ProductCollection