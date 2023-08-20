import { subDays } from "date-fns"
import { DateRange } from './types'

const defaultDate = new Date()
const defaultSelection: DateRange = {
    from: subDays(defaultDate, 7),
    to: defaultDate
}

const defaultCategoriesColor = '#000000'


export { defaultSelection, defaultCategoriesColor }
