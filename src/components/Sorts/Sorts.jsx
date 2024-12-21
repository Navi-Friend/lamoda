import { useCallback, useState, memo, useEffect } from 'react'
import styles from './Sorts.module.css'

const Sorts = ({ onSortChange }) => {
    const [sorts, setSorts] = useState([
        {
            key: 'cheapFirst',
            name: 'Cheap First',
            fn: (item1, item2) => item1.price - item2.price,
            isActive: false,
        },
        {
            key: 'expensiveFirst',
            name: 'Expensive First',
            fn: (item1, item2) => item2.price - item1.price,
            isActive: false,
        },
        {
            key: 'popularFirst',
            name: 'Highly Rated First',
            fn: (item1, item2) => item2.rating - item1.rating,
            isActive: true,
        },
    ])

    const handleChangeSortStatus = (activeSort) => {
        setSorts((prevSorts) => {
            return prevSorts.map((sort) => {
                if (sort.key == activeSort.key) {
                    sort.isActive = !sort.isActive
                    return sort
                }
                sort.isActive = false
                return sort
            })
        })
    }

    useEffect(() => {
        const activeSort = sorts.filter((sort) => sort.isActive)[0]
        activeSort ? onSortChange(activeSort.fn) : () => 0
    }, [sorts])

    return (
        <div className={styles.sorts}>
            {sorts.map((sort) => (
                <button
                    className={`${styles.sort} ${sort.isActive ? styles.activeSort : ''}`}
                    onClick={() => handleChangeSortStatus(sort)}
                    key={sort.key}
                >
                    {sort.name}
                </button>
            ))}
        </div>
    )
}
export default memo(Sorts)
