import React from 'react'
import styles from './footer.module.css'

const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.footerWrapper}>
                <div className={styles.footer}>
                    <div className={styles.footerColumns}>
                        <h4 className={styles.footerHeader}>
                            THÔNG TIN CỬA HÀNG
                        </h4>
                        <ul>
                            <li>Địa chỉ : 273 An Dương Vương, phường 2, quận 5, Tp HCM</li>
                            <li>Số điện thoại : +84 988486354</li>
                            <li>Facebook thời trang nam: Thien Dat fb.com/galahaddd</li>
                            <li>Email: hyperiondat@gmail.com</li>
                            <li>Website: https://localhost:6996</li>
                        </ul>
                    </div>
                    <div className={styles.footerColumns}>
                        <h4 className={styles.footerHeader}>
                            HỆ THỐNG CỬA HÀNG
                        </h4>
                        <ul>
                            <li>27 Chùa Bộc, Đống Đa, HN</li>
                            <li>242 Thái Hà, Đống Đa, HN</li>
                            <li>63 Đại Cổ Việt, Hai Bà Trưng, HN</li>
                            <li>20 Dương Quảng Hàm, Cầu Giấy, HN</li>
                            <li>11 Dương Quảng Hàm, Cầu Giấy, HN</li>
                            <li>346 Cầu Giấy, Cầu Giấy, HN</li>
                            <li>116 Hồ Tùng Mậu, Cầu Giấy, HN</li>
                            <li>29 Phố Nhổn, Nam Từ Liêm, HN</li>
                            <li>296 Nguyễn Trãi, Hà Đông, HN</li>
                            <li>24 Trần Phú, Hà Đông, HN</li>
                            <li>69 Quang Trung, Hà Đông, HN</li>
                            <li>272 Tô Hiệu, Lê Chân, HP</li>
                        </ul>
                    </div>
                    <div className={styles.footerColumns}>
                        <h4 className={styles.footerHeader}>
                            CHÍNH SÁCH VÀ QUY ĐỊNH CHUNG
                        </h4>
                        <ul>
                            <li>Hướng Dẫn Mua Hàng</li>
                            <li>Hình Thức Thanh Toán</li>
                            <li>Quy Định Về Bảo Mật Thông Tin</li>
                            <li>Chính Sách Bảo Hành</li>
                            <li>Chính Sách Đổi Hàng</li>
                            <li>Chính Sách Vận Chuyển</li>
                            <li>Điều Khoản Dịch Vụ</li>
                            <li>Giới Thiệu</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer