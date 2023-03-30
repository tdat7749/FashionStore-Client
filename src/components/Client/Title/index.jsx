import React from 'react'
import styles from './title.module.css'

const Title = ({ title }) => {
    return (
        <div style={{ textAlign: 'center', margin: '1rem 0 3rem 0' }}>
            <h3 className={styles.title}>{title}</h3>
        </div>
    )
}

export default Title