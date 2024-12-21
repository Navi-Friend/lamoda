import { useState, useCallback, memo } from 'react'
import styles from './Search.module.css'

const Search = ({ onSearchChange }) => {
    const [searchQuery, setSearchQuery] = useState('')
    const handleSearchChange = useCallback(
        (event) => {
            const value = event.target.value
            if (value != ' ') {
                setSearchQuery(value.trim())
                onSearchChange(value)
            }
        },
        [onSearchChange]
    )

    return (
        <input
            className={styles.searchQuery}
            type="text"
            placeholder="Search product..."
            value={searchQuery}
            onChange={handleSearchChange}
        />
    )
}
export default memo(Search)
