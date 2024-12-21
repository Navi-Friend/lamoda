import { CATEGORIES, COLORS } from '../constants'
import scarf from '../public/images/scarf.webp'
import trouses from '../public/images/trouses.webp'
import boots from '../public/images/boots.webp'
import { v4 as uuidv4 } from 'uuid'

export const generateRandomCatalogItems = (n = 10) => {
    let items = []
    for (let index = 0; index < n; index++) {
        items.push(
            generateCatalogItem(
                generateRandomString(),
                generateRandomString(),
                randomChoice(Object.values(COLORS)),
                randomChoice(Object.values(CATEGORIES)),
                getRandomInt(10, 9999),
                getRandomFloat(0, 5),
                randomChoice([scarf, trouses, boots])
            )
        )
    }
    return items
}

const generateCatalogItem = (
    newName,
    newDescription,
    newColor,
    newCategory,
    newPrice,
    newRating,
    newImageURL
) => {
    return {
        id: uuidv4(),
        name: newName,
        description: newDescription,
        color: newColor,
        category: newCategory,
        price: newPrice,
        rating: newRating,
        imageURL: newImageURL,
    }
}

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const getRandomFloat = (min, max) => {
    return (Math.random() * max).toFixed(1)
}

const randomChoice = (arr) => {
    const randomIndex = Math.floor(Math.random() * arr.length)
    return arr[randomIndex]
}

const generateRandomString = () => Math.random().toString(36).substring(2)
