import React from 'react'
import styles from './menu.module.css'
import { MenuItem } from '../../../utils/helper'
import { Link } from 'react-router-dom'

const Menu = () => {
    return (
        <div className={styles.container}>
            <ul className={styles.menu}>
                {MenuItem.map((item, index) => {
                    return <Link to={`${item.path}`} key={index}>
                        <li className={styles.menuItem}>
                            {item.title}
                        </li>
                    </Link>
                })}
            </ul>
        </div>
    )
}

export default Menu