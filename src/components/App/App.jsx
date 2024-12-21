import React, { useMemo, useCallback, useState, useEffect } from 'react'
import Catalog from '../Catalog/Catalog'
import { generateRandomCatalogItems } from '../../utils/catalogGenerator'
import styles from './App.module.css'
import MultiFilters from '../MultiFilters/MultiFilters'
import Search from '../Search/Search'
import Sorts from '../Sorts/Sorts'
import useItemsToDisplay from '../../hooks/useItemsToDisplay'

const App = () => {
    const [catalogItems, setCatalogItems] = useState(
        generateRandomCatalogItems(20)
    )
    const [multiFilters, setMultiFilters] = useState([])
    const [searchQueryFilter, setSearchQueryFilter] = useState('')
    const [priceRangeFilter, setPriceRangeFilter] = useState({
        minPrice: '',
        maxPrice: '',
    })
    
    const handleSortChange = useCallback((sorting) => {
        setCatalogItems((prevItems) => [...prevItems].sort(sorting))
    }, [])

    const handleMultiFiltersChange = useCallback((activeFilters) => {
        setMultiFilters(activeFilters)
    }, [])

    const handleSearchFilterChange = useCallback((searchQueryFilterFilter) => {
        setSearchQueryFilter(searchQueryFilterFilter)
    }, [])

    const handlePriceRangeFilterChange = useCallback((newRange) => {
        setPriceRangeFilter(newRange)
    }, [])

    const hasActiveFilters = useMemo(() => {
        return (
            multiFilters.length > 0 ||
            searchQueryFilter.length > 0 ||
            priceRangeFilter.minPrice != '' ||
            priceRangeFilter.maxPrice != ''
        )
    }, [multiFilters, searchQueryFilter, priceRangeFilter])

    const catalogItemsToDisplay = useItemsToDisplay(
        multiFilters,
        searchQueryFilter,
        priceRangeFilter,
        catalogItems
    )

    return (
        <div className={styles.wrapper}>
            <h1>Lamoda</h1>
            <div className={styles.container}>
                <div className={styles.searchAndFilters}>
                    <Search onSearchChange={handleSearchFilterChange} />
                    <Sorts onSortChange={handleSortChange} />
                </div>
                <nav>
                    <MultiFilters
                        onMultiFiltersChange={handleMultiFiltersChange}
                        onSearchChange={handleSearchFilterChange}
                        onPriceRangeFilterChange={handlePriceRangeFilterChange}
                    />
                    <h3 className={styles.totalItems}>
                        Total Products: {catalogItemsToDisplay.length}{' '}
                    </h3>
                </nav>
                <Catalog
                    items={catalogItemsToDisplay}
                    hasActiveFilters={hasActiveFilters}
                />
            </div>
        </div>
    )
}

export default App
