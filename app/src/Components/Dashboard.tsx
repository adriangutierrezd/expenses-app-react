import { Plus } from 'lucide-react'
import { DateRangePicker } from './DateRangePicker'
import { BarChart } from './BarChart';
import { useExpenses } from '../hooks/useExpenses';
import { useEffect, useState } from 'react';
import { addDays } from "date-fns"



interface DateRange{
    from: Date,
    to: Date
  }

export function Dashboard(){


    const defaultDate = new Date();
    const defaultSelected: DateRange = {
      from: defaultDate,
      to: addDays(defaultDate, 4)
    };
    const { getExpenses, expenses, expensesByCategory } = useExpenses()
    const [dateRange, setDateRange] = useState<DateRange>(defaultSelected)

    const handleDateRangeChange = (data: DateRange) => {
        setDateRange(data)
    }

    useEffect(() => {
        getExpenses({ user: 1, initialDate: dateRange.from, endDate: dateRange.to })
    }, [dateRange])

    return(
        <main>
            <h1>Hi, XXXX</h1>
            <div className='flex'>
                <button title='Add a new expense' className='ml-auto button button-primary'><Plus /></button>
            </div>
            <DateRangePicker handleDateRangeChange={handleDateRangeChange}/>
            {expenses.length > 0 
            ? <BarChart chartTitle='Last X days' chartId='expenseByCategoryBarTable' seriesName='Amount spent' data={expensesByCategory}/> 
            : 'Seems like you haven`t register any expenses yet...'}
            <h2>Your expenses on detail:</h2>
        </main>
    )
}