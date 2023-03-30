import React, { useState } from 'react'
import { Menu } from 'antd'
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import styles from './leftnav.module.css'
import { Link } from 'react-router-dom';


function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem((<Link to={''}>Dashboard</Link>), 'dashboard'),
    getItem('Sản Phẩm', 'product', <MailOutlined />, [
        getItem((<Link to={'san-pham'}>Danh Sách Sản Phẩm</Link>), '1'),
        getItem((<Link to={'san-pham/tao-moi'}>Tạo Sản Phẩm</Link>), '2'),
    ]),

    getItem('Hãng Sản Phẩm', 'brand', <SettingOutlined />, [
        getItem((<Link to={'thuong-hieu'}>Danh Sách Hãng</Link>), '3'),
        getItem((<Link to={'thuong-hieu/tao-moi'}>Thêm Hãng</Link>), '4'),
    ]),
    getItem('Danh Mục Sản Phẩm', 'category', <SettingOutlined />, [
        getItem((<Link to={'danh-muc'}>Danh Sách Danh Mục</Link>), '5'),
        getItem((<Link to={'danh-muc/tao-moi'}>Thêm Danh Mục</Link>), '6'),
    ]),
    getItem('Người Dùng', 'user', <SettingOutlined />, [
        getItem((<Link to={'nguoi-dung'}>Danh Sách Người Dùng</Link>), '7'),
        getItem((<Link to={'nguoi-dung/tao-moi'}>Thêm Người Dùng</Link>), '8'),
    ]),
    getItem('Hệ Thống', 'system', <AppstoreOutlined />, [
        getItem('Slide Show', 'slide', null,
            [
                getItem((<Link to={'slide-show'}>Danh Slide Show</Link>), '9'),
                getItem((<Link to={'slide-show/tao-moi'}>Thêm Slide Show</Link>), '10')
            ]),
    ]),
];

const rootSubmenuKeys = ['dashboard', 'product', 'brand', 'category', 'user', 'system'];


const LeftNav = () => {

    const [openKeys, setOpenKeys] = useState(['dashboard']);
    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    return (
        <Menu
            mode="inline"
            openKeys={openKeys}
            defaultSelectedKeys={['dashboard']}
            onOpenChange={onOpenChange}
            items={items}
            className={styles.menu}
        />
    )
}

export default LeftNav