import { BiPlus } from "react-icons/bi"
import '../css/Buttons.css'

export function AddExpenseModalButton() {
    return(
      <button className='primaryButton' title='Opens modal to add a new expense' ><BiPlus/></button>
    )
  }

