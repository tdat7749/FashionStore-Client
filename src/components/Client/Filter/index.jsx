import React from 'react'
import styles from './filter.module.css'
import { CloseOutlined } from '@ant-design/icons'
import { Form, Radio } from 'antd'

const Filter = ({ setIsOpenFilter, categories, parents, brands, onChangeCategory, onChangeBrand, category, brand }) => {


    return (
        <div className={styles.container}>
            <div className={styles.filter}>
                <div className={styles.closeIcon}>
                    <CloseOutlined onClick={() => setIsOpenFilter(false)} />
                    <div className={styles.filterWrapper}>
                        <div className={styles.filterOption}>
                            <h4 className={styles.filterHeader}>Danh Mục</h4>
                            <Radio.Group
                                buttonStyle='solid'
                                size='middle'
                                className={styles.radioGroup}
                                onChange={onChangeCategory}
                                defaultValue={category}
                            >
                                {parents?.map((parent, key) => {
                                    const child = categories.filter(item => item.parentId === parent.id)
                                    {
                                        return <div key={key}>
                                            <h4 className={styles.parent}>{parent.categoryName}</h4>
                                            {
                                                child.map((item, index) => {
                                                    return <Radio.Button key={index} className={styles.child} value={item.id}>{item.categoryName}</Radio.Button>
                                                })
                                            }
                                        </div>
                                    }
                                })}
                            </Radio.Group>
                        </div>

                        <div className={styles.filterOption}>
                            <h4 className={styles.filterHeader}>Thương Hiệu</h4>
                            <Radio.Group
                                buttonStyle='solid'
                                size='middle'
                                className={styles.radioGroup}
                                onChange={onChangeBrand}
                                defaultValue={brand}
                            >
                                {brands?.map((item, key) => {
                                    return <Radio.Button key={key} className={styles.child} value={item.id}>{item.name}</Radio.Button>
                                })}
                            </Radio.Group>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filter