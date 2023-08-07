import { Category } from '../types'
import { useState } from 'react'
import { categories as categoriesJSON } from '../mocks/categories.json'

export function useCategories(){

    const [categories, setCategories] = useState<Array<Category>>([])


    const getCategories = ({ user }: { user: number }) => {

        const categoriesToReturn =  categoriesJSON.filter(category => {
            return Number(category.user) === user
        })
        setCategories(categoriesToReturn)
    }


    return { categories, getCategories }

}