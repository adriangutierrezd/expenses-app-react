import { useState, useEffect} from 'react'
import { Expense, CreateExpenseService, DateRange } from '../types'
import { createExpenseService, editExpenseService, deleteExpenseService } from '../services/expensesService'
import { useUser } from './useUser'
import { isDateBetween } from '../utils/dates'


export function useExpenses(){

    const { set, user } = useUser()
    const [expenses, setExpenses] = useState<Array<Expense>>(user.expenses)

    useEffect(() => {
        setExpenses(user.expenses)
    }, [user.expenses])


    const getExpenses = ({from, to}: DateRange) => {
        const expensesToReturn: Array<Expense> =  user.expenses.filter((expense: Expense) => {
            if(from === undefined || to === undefined) return expense
            const expenseDate = new Date(expense.date)

            return isDateBetween({dateToCheck: expenseDate, from, to})
        })

        setExpenses(expensesToReturn)
    }

    const expensesByCategory = ({expenses}: { expenses: Array<Expense> }) => {
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
        
        return Array.from(groupExpensesByCategory).map(expense => expense[1])
    }

    const expensesByMonth = () => {
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
        

        return Array.from(expensesByMoth).map(e => e[1])
    }

    const createExpense = async ({ name, description, amount, date, category, token }: CreateExpenseService ) => {
        const newExpense = await createExpenseService({ name, description, amount, date, category, token })
        if(newExpense.status !== 201) throw new Error(newExpense.message)
        const newUser = {...user, expenses: [...user.expenses, newExpense]}
        set(newUser)
    }

    const editExpense = async({ name, description, amount, date, category, token, expenseId } : CreateExpenseService & { expenseId: string }) => {
        const updatedExpense = await editExpenseService({ name, description, amount, date, category, token, expenseId })
        if(updatedExpense.status !== 200) throw new Error(updatedExpense.message)
        const newUser = {...user, expenses: user.expenses.map((expense: Expense) => expense.id === expenseId ? updatedExpense : expense)}
        set(newUser)
    }

    const deleteExpense = async ({ token, expenseId } : { token: string, expenseId: string }) => {
        const deletedExpense = await deleteExpenseService({ token, expenseId })
        if(deletedExpense.status !== 200) throw new Error(deletedExpense.message)
        const newUser = {...user, expenses: user.expenses.filter((expense: Expense) => expense.id !== expenseId)}
        set(newUser)
    }

    return { getExpenses, expenses, expensesByCategory, expensesByMonth, createExpense, editExpense, deleteExpense }

}