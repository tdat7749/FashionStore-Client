import React, { useState, useCallback } from 'react'
import styles from './productimage.module.css'
import { BASE_IMAGE_URL } from '../../../utils/helper'

const ProductImage = ({ thumbnail, listimage }) => {

    const [mainImage, setMainImage] = useState(thumbnail)

    const handleChangeImage = useCallback((value) => {
        setMainImage(value)
    }, [setMainImage]);

    return (
        <div className={styles.container}>
            <div className={styles.productImageWrapper}>
                <div className={styles.listImageWrapper}>
                    <ul className={styles.listImage}>
                        {listimage?.map((item, index) => {
                            return <li key={index} onClick={() => handleChangeImage(item.url)}>
                                <img src={`${BASE_IMAGE_URL}${item.url}`} alt={item.nameImage} style={item.url === mainImage ? { opacity: '1' } : undefined} />
                            </li>
                        })}
                    </ul>
                </div>
                <div className={styles.mainImage}>
                    {mainImage !== undefined && <img src={`${BASE_IMAGE_URL}${mainImage}`} alt="" />}
                </div>
            </div>
        </div>
    )
}

export default ProductImage