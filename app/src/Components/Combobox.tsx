
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { ComboboxData } from '../types'

import { cn } from "../../@/lib/utils"
import { Button } from "../../@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../../@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../@/components/ui/popover"


interface Props{
    data: Array<ComboboxData>,
    selectMessage: string,
    commandPlaceHolder: string
}

export function ComboboxDemo({data, selectMessage, commandPlaceHolder} : Props) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [buttonText, setButtonText] = React.useState(selectMessage)

  React.useEffect(() => {

    if(value != '') setButtonText(data.find(d => d.value == value).label)
    
  }, [value])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {buttonText}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={commandPlaceHolder} />
          <CommandEmpty>No data found.</CommandEmpty>
          <CommandGroup>
            {data.map((dat) => (
              <CommandItem className="w-full"
                key={dat.value}
                onSelect={() => {
                  setValue(dat.value)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === dat.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {dat.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
