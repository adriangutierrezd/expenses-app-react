import { NewCategoryForm } from "./NewCategoryForm"
import { CategoriesTable } from './CategoriesTable'
import { useCategories } from "../hooks/useCategories"
import { useEffect } from "react"


export function CategoriesPage(){

    const { categories, getCategories } = useCategories()

    useEffect(() => {
        getCategories({user: 1})
    }, [])

    return(
        <main>
            <h1>Categories</h1>
            <NewCategoryForm />
            <section className='my-8'>
                <CategoriesTable data={categories} />
            </section>
        </main>
    )
}