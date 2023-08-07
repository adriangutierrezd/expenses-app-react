import { zodResolver } from "@hookform/resolvers/zod"
import { format, addDays } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { cn } from "../../@/lib/utils"
import { Button } from "../../@/components/ui/button"
import { Calendar } from "../../@/components/ui/calendar"
import { useEffect, useState } from 'react'
import { RefreshCw } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../@/components/ui/popover"
import { useToast } from "../../@/components/ui/use-toast"
import { Toaster } from "../../@/components/ui/toaster"
 
const FormSchema = z.object({
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
})
 
export function DateRangePicker({handleDateRangeChange}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
 
  const { toast } = useToast()

  const defaultDate = new Date();
  const defaultSelected: DateRange = {
    from: defaultDate,
    to: addDays(defaultDate, 4)
  };

  interface DateRange{
    from: Date,
    to: Date
  }

  const [range, setRange] = useState<DateRange>(defaultSelected);
  const [rangeValue, setRangeValue] = useState<string>()

  useEffect(() => {


    if(range !== undefined){
      const initialDate = format(range.from, "PPP")
      const endDate = range.to !== undefined ? format(range.to, "PPP") : ''
      setRangeValue(`${initialDate} to ${endDate}`)
    }else{
      setRangeValue('Pick a date range')
    }


  }, [range])



  const handleSubmit = (event: any) => {
    event.preventDefault()

    if(range === undefined || range.to === undefined || range.from === undefined){
      toast({
        title: "Uh oh! Something went wrong.",
        description: "You need to provide a start and an end date.",
      })
      return
    }


    handleDateRangeChange(range)
    return range
  }

  return (
    <>
    <Form {...form}>
      <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-4">
        <FormField
          control={form.control}
          name="dob"
          render={( ) => (
            <FormItem className="col-span-10">
              <FormLabel>Date range:</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal"
                      )}
                    >
                      {typeof rangeValue !== 'undefined' ? (
                        rangeValue
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    defaultMonth={defaultDate}
                    selected={range}
                    onSelect={setRange}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className='col-span-2 self-end'><RefreshCw /></Button>
      </form>
    </Form>
    <Toaster />
    </>
  )
}