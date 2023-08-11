import { useState, useEffect } from 'react'
import { expenses as expensesJSON } from '../mocks/expenses.json'
import { Expense, ExpenseByCategory, Category, ExpensesByMonth } from '../types'


interface Props {
    user: number,
    initialDate: Date,
    endDate: Date,
    category?: Category
}


export function useExpenses(){

    const [expenses, setExpenses] = useState<Array<Expense>>([])
    const [expensesByCategory, setExpensesByCategory] = useState<Array<ExpenseByCategory>>([])
    const [expenesByMonth, setExpensesByMonth] = useState<Array<ExpensesByMonth>>([])
    
    useEffect(() => {
        groupExpensesByCategory(expenses)
        groupExpensesByMonth(expenses)

        console.log(expenses, expenesByMonth, expensesByCategory)

    }, [expenses])

    const getExpenses = ({ user, initialDate, endDate, category }: Props) => {

        const expensesToReturn =  expensesJSON.filter(expense => {
            const expenseDate = new Date(expense.date)
            return Number(expense.user) === user && expenseDate >= initialDate && expenseDate <= endDate
        })
        setExpenses(expensesToReturn)
    }


    const groupExpensesByCategory = (expenses: Expense) => {
        
        const groupExpensesByCategory = new Map()
        expenses.forEach(expense => {
            const expensesMap = groupExpensesByCategory.get(expense.category.id)
            if(expensesMap === undefined){
                groupExpensesByCategory.set(expense.category.id, {category: expense.category.name, amount: expense.amount, color: expense.category.color})
            }else{
                const newExpensesMap = {...expensesMap}
                newExpensesMap.amount += expense.amount
                groupExpensesByCategory.set(expense.category.id, newExpensesMap)
            }

        })  
        
        setExpensesByCategory(Array.from(groupExpensesByCategory).map(expense => expense[1]))
    }

    const groupExpensesByMonth = (expenses: Array<Expense>) => {

        const expensesByMoth = new Map()
        expenses.forEach(expense => {
            const year = new Date(expense.date).getFullYear()
            const monthAux = new Date(expense.date).getMonth()

            if(isNaN(year) || isNaN(monthAux)) throw new Error('Invalid date')

            const month = (monthAux + 1).toString().padStart(2, '0')

            const key = `${year}-M${month}`

            if(expensesByMoth.has(key)){

                const actualData = expensesByMoth.get(key)
                const newData = {... actualData}
                newData.amount += expense.amount

                expensesByMoth.set(key, newData)
                return
            }

            expensesByMoth.set(key, {month, year, amount: expense.amount})
        })
        

        setExpensesByMonth(Array.from(expensesByMoth).map(e => e[1]))
    }

    return { getExpenses, expenses, groupExpensesByCategory, expensesByCategory, expenesByMonth }

}