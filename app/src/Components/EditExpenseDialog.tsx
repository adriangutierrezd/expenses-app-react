
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "../../@/components/ui/dialog"

import { Pencil } from 'lucide-react'
import { ExpensesForm } from './ExpensesForm';
import { useExpenses } from "../hooks/useExpenses";
import { useState } from "react"


interface Props{
    mode: string,
    defaultName: string,
    defaultAmount: number,
    defaultDate: Date,
    defaultDescription?: string,
    defaultCategory: string,
    expenseId: string,
    dialogHeader: string
}

export function EditExpenseDialog({ dialogHeader, defaultAmount, defaultCategory, defaultName, defaultDescription, defaultDate, expenseId }: Props) {

    const { editExpense } = useExpenses()
    const [open, setOpen] = useState(false)

    const handleOpen = (state: boolean) => {
        setOpen(state)
    }
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className='flex mr-2 items-center bg-blue-200 text-blue-700 p-2 hover:bg-blue-300 duration-200 rounded'>
                <Pencil className='h-4 w-4' />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{dialogHeader}</DialogTitle>
                </DialogHeader>
                <ExpensesForm mode='' handleSubmitP={editExpense} expenseId={expenseId} defaultAmount={defaultAmount} defaultCategory={defaultCategory} defaultName={defaultName} defaultDescription={defaultDescription} defaultDate={new Date(defaultDate)} handleOpenDialog={handleOpen} />
            </DialogContent>
        </Dialog>
    )
}