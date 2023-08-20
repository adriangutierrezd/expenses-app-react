import { CategoryForm } from "./CategoryForm"
import { CategoriesTable } from './CategoriesTable'
import { useEffect } from "react"
import { useUser } from '../hooks/useUser';
import { useCategories } from "../hooks/useCategories"

export function CategoriesPage(){

    const { user } = useUser()
    const { categories, getCategories, createCategory} = useCategories()
    
    useEffect(() => {
        getCategories({categories: user.categories})
    }, [categories])


    return(
        <main>
            <h1>Categories</h1>
            <CategoryForm handleSubmitP={createCategory} />
            <section className='my-8'>
                <CategoriesTable data={categories} />
            </section>
        </main>
    )
}