import React from 'react'
import styles from './newscollection.module.css'
import Title from '../Title'
import News from '../News'

const NewsCollection = ({ news, title }) => {
    return (
        <div className={styles.container}>
            <Title title={title} />
            {(news !== undefined) &&
                <div className={styles.collection}>
                    {news.map((item, index) => {
                        return <News key={index} news={item} />
                    })}
                </div>
            }
        </div>
    )
}

export default NewsCollection