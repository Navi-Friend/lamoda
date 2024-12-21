import { memo } from 'react'
import styles from './Catalog.module.css'

const CatalogItem = ({ items, hasActiveFilters }) => {
    return (
        <ul className={styles.catalog}>
            {items.length ? (
                items.map((item) => (
                    <li key={item.id} className={styles.catalogItem}>
                        <img src={item.imageURL} alt={item.name} />
                        <div className={styles.catalogItemData}>
                            <h1>{item.name}</h1>
                            <p>{item.description}</p>
                            <div>Color: {item.color}</div>
                            <div>Price: {item.price}$</div>
                            <div>Rating: {item.rating}</div>
                        </div>
                    </li>
                ))
            ) : hasActiveFilters ? (
                <h2 className={styles.warningMessage}>
                    Nothing found matching your criteria
                </h2>
            ) : (
                ''
            )}
        </ul>
    )
}
export default memo(CatalogItem)
