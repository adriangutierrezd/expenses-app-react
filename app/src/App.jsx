import { HomePage } from './Components/HomePage'
import { AddExpenseModalButton } from './Components/AddExpenseModalButton'
import { DateRangeForm } from './Components/DateRangeForm'
import { ChartExpenseByCategory } from './Components/ChartExpenseByCategory'


function App() {

  return(
    <>
      <HomePage/>
      <AddExpenseModalButton/>
      <DateRangeForm/>
      <ChartExpenseByCategory />
    </>
  )

}

export default App
