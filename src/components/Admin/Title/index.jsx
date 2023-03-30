import React from 'react'
import styles from './title.module.css'

const Title = ({ title }) => {
    return (
        <div className={styles.header}>
            <h2>{title}</h2>
        </div>
    )
}

export default Title