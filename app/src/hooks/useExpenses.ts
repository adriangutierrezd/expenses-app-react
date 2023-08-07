import { useState, useEffect } from 'react'
import { expenses as expensesJSON } from '../mocks/expenses.json'
import { Expense, ExpenseByCategory, Category } from '../types'


interface Props {
    user: number,
    initialDate: Date,
    endDate: Date,
    category?: Category
}


export function useExpenses(){

    const [expenses, setExpenses] = useState<Array<Expense>>([])
    const [expensesByCategory, setExpensesByCategory] = useState<Array<ExpenseByCategory>>([])

    useEffect(() => {
        groupExpensesByCategory(expenses)
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

    return { getExpenses, expenses, groupExpensesByCategory, expensesByCategory }

}