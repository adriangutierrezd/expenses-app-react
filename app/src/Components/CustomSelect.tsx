import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../@/components/ui/select"

import { CustomSelectItem } from "../types"

interface Props {
  triggerPlaceholder: string | JSX.Element,
  classes: string,
  items: Array<CustomSelectItem>,
  handleSelect: (data: string) => void
}

export default function CustomSelect({ triggerPlaceholder, classes, items, handleSelect }: Props) {


  const handleSelectItem = (data: string) => {
    handleSelect(data)
  }

  return (
    <Select onValueChange={handleSelectItem}>
      <SelectTrigger className={classes}>
        <SelectValue placeholder={triggerPlaceholder}/>
      </SelectTrigger>
      <SelectContent className="max-h-[var(--radix-select-content-available-height)]">
        {items.map((item) => (
          <SelectItem key={item.id} value={item.value}>
            {item.text}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )

}