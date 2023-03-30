import React, { useEffect, useState } from 'react'
import styles from './navbar.module.css'
import { ShoppingOutlined, MenuOutlined, DownOutlined } from '@ant-design/icons'
import { Dropdown, Space } from 'antd'
import MobileMenu from '../MobileMenu'
import Menu from '../Menu'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../../../redux/slice/UserSlice'


const Navbar = () => {
    const [isOpenMenu, setIsOpenMenu] = useState(false)

    const userData = useSelector(state => state.user.data?.data)

    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logOut())
    }

    const items = [
        {
            label: <Link to='/thong-tin-tai-khoan'><h4>Thông Tin Tài Khoản</h4></Link>,
            key: '0',
        },
        {
            label: <Link to='/lich-su-dat-hang'>Lịch Sử Hóa Đơn</Link>,
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: <Link to='/' onClick={() => handleLogout()}>Đăng Xuất</Link>,
            key: '3',
        },
    ];

    return (
        <>
            {isOpenMenu && <MobileMenu setIsOpenMenu={setIsOpenMenu} isOpenMenu={isOpenMenu} />}
            <nav className={styles.container}>
                <div className={styles.navbar}>
                    <div className={styles.navleft}>
                        <Link to={'/'}>
                            <img src="https://360boutique.vn/wp-content/uploads/2021/10/LOGO-360-DUNG-TAM-THOI-MAU-DEN-05.png" alt="logo" className={styles.logo} />
                        </Link>
                    </div>
                    <div className={styles.navcenter}>
                        <input type="text" placeholder='Chưa có làm nên để cho zui thôi :D' className={styles.search} />
                    </div>
                    <div className={styles.navright}>
                        {userData === undefined &&
                            <>
                                <Link to='/dang-nhap'>
                                    <h4>Đăng Nhập</h4>
                                </Link>
                                <Link to='/dang-ky'>
                                    <h4>Đăng Ký</h4>
                                </Link>
                            </>
                        }


                        {userData !== undefined &&
                            <Dropdown
                                menu={{
                                    items,
                                }}
                                trigger={['click']}
                            >
                                <Space className={styles.username}>
                                    <span >{userData?.userName}</span>
                                    <DownOutlined />
                                </Space>
                            </Dropdown>
                        }

                        <Link to={'/gio-hang'}>
                            <ShoppingOutlined className={styles.cartLogo} />
                        </Link>
                        <MenuOutlined className={styles.mobileBtn} onClick={() => setIsOpenMenu(!isOpenMenu)} />
                    </div>
                </div>
            </nav>
            <Menu />
        </>
    )
}

export default Navbar