// import { useExpenses } from "../hooks/useExpenses"
import { ExpensesTable } from "./ExpensesTable"
import { ExpensesForm } from './ExpensesForm'
import { useExpenses } from "../hooks/useExpenses"

export function ExpensesPage(){

    const { createExpense, expenses } = useExpenses()

    return (
        <main>
            <h1>Your expenses</h1>
            <ExpensesForm mode='big' handleSubmitP={createExpense}/>
            <section className="my-8">
                <ExpensesTable data={expenses}/>
            </section>
        </main>
    )
}