import { DateRangePicker } from './DateRangePicker'
import { useState, useEffect } from 'react'
import { DateRange } from '../types'
import { defaultSelection } from '../consts'
import { useExpenses } from '../hooks/useExpenses.ts'
import { NoExpensesYet } from './NoExpensesYet'
import { BarChart } from './BarChart'
import { LineChart } from './LineChart.tsx'

export function StatsPage(){


    const [dateRange, setDateRange] = useState<DateRange>(defaultSelection)
    const { getExpenses, expenses, expensesByCategory, expensesByMonth } = useExpenses()
    const [dateRangeName, setDateRangeName] = useState<string>('')

    const handleDateRangeChange = (data: DateRange) => {
        setDateRange(data)
        getExpenses({user: 1, initialDate: data.from, endDate: data.to})
    }
    
    useEffect(() => {
        getExpenses({user: 1, initialDate: dateRange.from, endDate: dateRange.to})
        setDateRangeName(`From ${new Date(dateRange.from).toLocaleDateString('us-US')} to ${new Date(dateRange.to).toLocaleDateString('us-US')}`)
    }, [dateRange])

    const RenderData = () => {

        if(expenses.length > 0){
            return(
                <>
                    <BarChart chartId='BarChartFromStats' chartTitle={dateRangeName} data={expensesByCategory} seriesName='Amount spent' />
                    <LineChart chartId='LineChartFromStats' chartTitle={dateRangeName} data={expensesByMonth.map(expense => expense.amount)} headings={expensesByMonth.map(expense => `${expense.year}-M${expense.month}`)} />
                </>
            )
        }else{
            return (<NoExpensesYet/>)
        }


    }

    return (
        <main>
            <h1>Stats</h1>
            <DateRangePicker handleDateRangeChange={handleDateRangeChange}/>    
            <RenderData/>
        
        </main>
    )
}