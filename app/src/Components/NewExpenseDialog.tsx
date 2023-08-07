import { Button } from "../../@/components/ui/button"
import { Plus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../@/components/ui/dialog"
import { NewExpenseForm } from "./NewExpenseForm"

export function NewExpenseDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button><Plus/></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new expense</DialogTitle>
        </DialogHeader>
        <NewExpenseForm mode='small'/>
      </DialogContent>
    </Dialog>
  )
}
