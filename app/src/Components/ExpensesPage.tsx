// import { useExpenses } from "../hooks/useExpenses"
import { ExpensesTable } from "./ExpensesTable"
import { NewExpenseForm } from './NewExpenseForm'

export function ExpensesPage(){


    return (
        <main>
            <h1>Your expenses</h1>
            <NewExpenseForm/>
            <section className="my-8">
                <ExpensesTable data={[]}/>
            </section>
        </main>
    )
}