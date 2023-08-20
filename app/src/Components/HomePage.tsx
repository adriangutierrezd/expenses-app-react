import { useUser } from "../hooks/useUser"
import { useExpenses } from "../hooks/useExpenses"
import { ExpensesTable } from "./ExpensesTable"
import { NewExpenseDialog } from "./NewExpenseDialog"
import { useEffect, useState } from "react"
import { DateRangePicker } from "./DateRangePicker"
import { DateRange } from "../types"
import { defaultSelection } from "../consts"
import { BarChart } from "./BarChart"
import { NoExpensesYet } from "./NoExpensesYet"


export function HomePage(){

    const { user } = useUser()
    const { expenses, expensesByCategory, getExpenses } = useExpenses()
    const [dateRange, setDateRange] = useState<DateRange>(defaultSelection)
    const [dateRangeName, setDateRangeName] = useState<string>('')

    const handleDateRangeChange = (data: DateRange) => {
        setDateRange(data)
    }

    useEffect(() => {
        setDateRangeName(`From ${dateRange.from.toLocaleDateString('us-US')} to ${dateRange.to.toLocaleDateString('us-US')}`)
        getExpenses(dateRange)
    }, [dateRange])

    return(
        <main>
            <h1>Hi, {user.username}</h1>
            <div className='flex justify-end'>
                <NewExpenseDialog/>
            </div>

            <DateRangePicker defaultSelected={dateRange} handleDateRangeChange={handleDateRangeChange}/>
            {expenses.length > 0 
            ? <BarChart chartTitle={dateRangeName} seriesName='Amount spent' data={expensesByCategory({ expenses })}/> 
            : <NoExpensesYet/> }

            <h2>Your expenses on detail:</h2>
            <ExpensesTable data={expenses}/>
        </main>
    )

}