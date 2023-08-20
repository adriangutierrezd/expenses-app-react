import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "../../@/lib/utils"
import { Button } from "../../@/components/ui/button"
import { Calendar } from "../../@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../@/components/ui/popover"

interface Props {
  handleDateChange: (date: Date) => void
  classes?: string
  defaultDate: Date
}

export function DatePicker({handleDateChange, classes, defaultDate} : Props) {

  const [date, setDate] = React.useState<Date>(defaultDate || new Date())

  const handleSelect = (date: Date) => {
    setDate(date)
    handleDateChange(date)
  } 

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
            classes && `${classes}`
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onDayClick={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
