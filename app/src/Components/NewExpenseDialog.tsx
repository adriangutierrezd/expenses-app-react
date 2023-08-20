import { Button } from "../../@/components/ui/button"
import { Plus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../@/components/ui/dialog"
import { ExpensesForm } from "./ExpensesForm"
import { useExpenses } from "../hooks/useExpenses"
import { useState } from "react"

export function NewExpenseDialog() {

  const { createExpense } = useExpenses()
  const [open, setOpen] = useState(false)

  const handleOpen = (state: boolean) => {
      setOpen(state)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button><Plus/></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new expense</DialogTitle>
        </DialogHeader>
        <ExpensesForm handleSubmitP={createExpense} handleOpenDialog={handleOpen} mode='small'/>
      </DialogContent>
    </Dialog>
  )
}
