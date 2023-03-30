import React from 'react'
import { Carousel } from 'antd'
import styles from './slide.module.css'
import { BASE_IMAGE_URL } from '../../../utils/helper'

const Slide = ({ carousel }) => {
    return (
        <>
            <Carousel autoplay autoplaySpeed={3000}>
                {carousel !== undefined &&
                    carousel.map((item, index) => {
                        return <img key={index} src={`${BASE_IMAGE_URL}${item.url}`} alt={item.name} className={styles.image} />
                    })}
            </Carousel>
        </>
    )
}

export default Slide