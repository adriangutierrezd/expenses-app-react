import { addDays } from "date-fns"
import { DateRange } from './types'

const defaultDate = new Date()
const defaultSelection: DateRange = {
    from: defaultDate,
    to: addDays(defaultDate, 4)
}


export { defaultSelection }
