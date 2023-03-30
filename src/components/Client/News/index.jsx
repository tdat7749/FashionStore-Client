import React from 'react'
import styles from './news.module.css'

const News = ({ news }) => {
    return (
        <div className={styles.newsWrapper}>
            <img src={news.thumbnail} alt={news.title} className={styles.newsImage} />
            <div className={styles.newsContent}>
                <p className={styles.newsCreatedAt}>{news.createdAt}</p>
                <h4 className={styles.newsTitle}>{news.title}</h4>
            </div>
        </div>
    )
}

export default News