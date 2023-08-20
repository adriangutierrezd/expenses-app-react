import { Category, Expense } from '../types'
import { useState, useEffect } from 'react'
import { createCategoryService, editCategoryService, deleteCategories } from '../services/categoriesService'
import { useUser } from './useUser'

export function useCategories(){

    const { set, user } = useUser()
    const [categories, setCategories] = useState<Array<Category>>(user.categories)


    useEffect(() => {
        setCategories(user.categories)
    }, [user.categories])

    const getCategories = ({ categories }: { categories: Array<Category> }) => {
        setCategories(categories)
    }

    const createCategory = async ({ name, color, token }: { name: string, color: string, token: string }) => {
        const newCategory = await createCategoryService({name, color, token })
        if(newCategory.status !== 201) throw new Error(newCategory.message)
        const newUser = {...user, categories: [...user.categories, newCategory]}
        set(newUser)
    }

    const editCategory = async ({ name, color, token, categoryId }: { name: string, color: string, token: string, categoryId: string }) => {
        const newCategory = await editCategoryService({name, color, token, categoryId })
        if(newCategory.status !== 200) throw new Error(newCategory.message)
        const actualCategories = [...user.categories]
        const index = actualCategories.findIndex((category: Category) => category.id === newCategory.id)
        actualCategories[index] = newCategory
        const newUser = {...user, categories: actualCategories}
        set(newUser)
    }
 
    const deleteCategoy = async ({ token, categoryId }: { token: string, categoryId: string }) => {
        const res = await deleteCategories({ token, categoryId })
        if(res.status !== 200) throw new Error(res.message)
        const newExpenses = [...user.expenses].filter((expense: Expense) => expense.category.id.toString() !== categoryId)
        const newCategories = [...user.categories].filter((category: Category) => category.id.toString() != categoryId)
        const newUser = {...user, categories: newCategories, expenses: newExpenses}
        set(newUser)
    }

    return { categories, getCategories, createCategory, editCategory, deleteCategoy }

}
