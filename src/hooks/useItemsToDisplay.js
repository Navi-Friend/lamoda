import { useMemo } from 'react'

const useItemsToDisplay = (
    multiFilters,
    searchQueryFilter,
    priceRangeFilter,
    catalogItems
) => {
    return useMemo(() => {
        let multiFilteredCatalogItems = catalogItems.filter((catalogItem) =>
            multiFilters.length
                ? multiFilters.some((filter) => filter.fn(catalogItem))
                : true
        )

        let searchFilteredCatalogItems = multiFilteredCatalogItems.filter(
            (catalogItem) =>
                catalogItem.name
                    .toLowerCase()
                    .includes(searchQueryFilter.toLowerCase()) ||
                catalogItem.description
                    .toLowerCase()
                    .includes(searchQueryFilter.toLowerCase())
        )

        let priceFilteredCatalogItems = searchFilteredCatalogItems.filter(
            (catalogItem) => {
                let inf = true,
                    sup = true
                if (parseFloat(priceRangeFilter.minPrice)) {
                    inf =
                        catalogItem.price >=
                        parseFloat(priceRangeFilter.minPrice)
                }
                if (parseFloat(priceRangeFilter.maxPrice)) {
                    sup =
                        catalogItem.price <=
                        parseFloat(priceRangeFilter.maxPrice)
                }
                return sup && inf
            }
        )
        return priceFilteredCatalogItems
    }, [multiFilters, searchQueryFilter, priceRangeFilter, catalogItems])
}

export default useItemsToDisplay
