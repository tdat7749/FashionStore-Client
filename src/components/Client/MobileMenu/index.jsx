import React from 'react'
import styles from './mobilemenu.module.css'
import { MenuItem } from '../../../utils/helper'
import { CloseOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const MobileMenu = ({ setIsOpenMenu, isOpenMenu }) => {

    const user = useSelector(state => state.user.data?.data)

    return (
        <>

            <div className={styles.container}>
                <CloseOutlined className={styles.btnClose} onClick={() => setIsOpenMenu(!isOpenMenu)} />
                <ul className={styles.menuMobile}>
                    {MenuItem.map((item, index) => {
                        return <Link to={`${item.path}`} key={index}>
                            <li className={styles.menuItem}>
                                {item.title}
                            </li>
                        </Link>
                    })}
                    {user === undefined &&
                        <>
                            <Link to='/dang-nhap'>
                                <h4>Đăng Nhập</h4>
                            </Link>
                            <Link to='/dang-ky'>
                                <h4>Đăng Ký</h4>
                            </Link>
                        </>
                    }
                </ul>
            </div>
        </>
    )
}

export default MobileMenu