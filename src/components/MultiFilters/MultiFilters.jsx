import React, { useCallback, useEffect, useState, memo } from 'react'
import styles from './MultiFilters.module.css'
import { CATEGORIES, COLORS } from '../../constants'

const MultiFilters = ({ onMultiFiltersChange, onPriceRangeFilterChange }) => {
    // field "key" is for programmer, "name" - for user
    const [multiFilters, setMultiFilters] = useState([
        {
            key: COLORS.RED,
            name: 'Red',
            fn: (catalogItem) => catalogItem.color === COLORS.RED,
            isActive: false,
        },
        {
            key: COLORS.GREEN,
            name: 'Green',
            fn: (catalogItem) => catalogItem.color === COLORS.GREEN,
            isActive: false,
        },
        {
            key: COLORS.BLUE,
            name: 'Blue',
            fn: (catalogItem) => catalogItem.color === COLORS.BLUE,
            isActive: false,
        },
        {
            key: COLORS.BROWN,
            name: 'Brown',
            fn: (catalogItem) => catalogItem.color === COLORS.BROWN,
            isActive: false,
        },
        {
            key: COLORS.YELLOW,
            name: 'Yellow',
            fn: (catalogItem) => catalogItem.color === COLORS.YELLOW,
            isActive: false,
        },
        {
            key: COLORS.YELLOW,
            name: 'Yellow',
            fn: (catalogItem) => catalogItem.color === COLORS.YELLOW,
            isActive: false,
        },
    ])

    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')

    const handleMultiFiltersChange = useCallback(
        (activeFilter) => {
            setMultiFilters((prevFilters) => {
                return prevFilters.map((filter) => {
                    if (filter.key == activeFilter.key) {
                        filter.isActive = !filter.isActive
                        return filter
                    }
                    return filter
                })
            })
        },
        [onMultiFiltersChange]
    )
    useEffect(
        () => onMultiFiltersChange(multiFilters.filter((f) => f.isActive)),
        [multiFilters]
    )

    const handlePriceChange = useCallback(
        (min, max) => {
            const regex = /^(\d+)?$/;
            if (regex.test(min) && regex.test(max)) {
                setMinPrice((prevMin) => (prevMin != min ? min : prevMin))
                setMaxPrice((prevMax) => (prevMax != max ? max : prevMax))
            }
        },
        [onPriceRangeFilterChange]
    )

    useEffect(() => onPriceRangeFilterChange({ minPrice, maxPrice }))
    return (
        <div>
            <ul className={styles.filters}>
                <h3>Color Filters</h3>
                {multiFilters.map((filter) => (
                    <li
                        className={filter.isActive ? styles.activeFilter : ''}
                        key={filter.key}
                        onClick={() => handleMultiFiltersChange(filter)}
                        checked={filter.isActive}
                    >
                        {filter.name}
                    </li>
                ))}
            </ul>
            <div className={styles.priceFiltersWithLabel}>
                <h3>Filter by price</h3>
                <div className={styles.priceFilters}>
                    <div>
                        <label htmlFor="min">from, $</label>
                        <input
                            id="min"
                            type="text"
                            placeholder="0"
                            value={minPrice}
                            onChange={(e) =>
                                handlePriceChange(e.target.value, maxPrice)
                            }
                        />
                    </div>
                    <div>
                        <label htmlFor="max">to, $</label>
                        <input
                            id="max"
                            type="text"
                            placeholder="9999"
                            value={maxPrice}
                            onChange={(e) =>
                                handlePriceChange(minPrice, e.target.value)
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default memo(MultiFilters)
