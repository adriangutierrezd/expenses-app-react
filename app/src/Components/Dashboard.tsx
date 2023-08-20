import { DateRangePicker } from './DateRangePicker'
import { BarChart } from './BarChart';
import { useExpenses } from '../hooks/useExpenses';
import { useEffect, useState } from 'react';
import { ExpensesTable } from './ExpensesTable';
import { NewExpenseDialog } from './NewExpenseDialog'
import { NoExpensesYet } from './NoExpensesYet';
import { DateRange } from '../types'
import { defaultSelection } from '../consts'
import { useUser } from '../hooks/useUser';
import exp from 'constants';

export function Dashboard(){

    const { user } = useUser()
    const { getExpenses, expenses, expensesByCategory } = useExpenses()
    const [dateRange, setDateRange] = useState<DateRange>(defaultSelection)
    const [dateRangeName, setDateRangeName] = useState<string>('')

    const handleDateRangeChange = (data: DateRange) => {
        setDateRange(data)
    }

    useEffect(() => {
        getExpenses({ expenses: user.expenses, initialDate: dateRange.from, endDate: dateRange.to })
        setDateRangeName(`From ${new Date(dateRange.from).toLocaleDateString('us-US')} to ${new Date(dateRange.to).toLocaleDateString('us-US')}`)
    }, [dateRange])


    console.log('This', expensesByCategory({ expenses }))

    return(
        <main>
            <h1>Hi, {user.username}</h1>
            <div className='flex justify-end'>
                <NewExpenseDialog/>
            </div>
            <DateRangePicker handleDateRangeChange={handleDateRangeChange}/>
            {expenses.length > 0 
            ? <BarChart chartTitle={dateRangeName} chartId='expenseByCategoryBarTable' seriesName='Amount spent' data={expensesByCategory({ expenses })}/> 
            : <NoExpensesYet/> }
            <h2>Your expenses on detail:</h2>
            <ExpensesTable data={expenses}/>
        </main>
    )
}