import { Trash2, Loader2 } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "../../@/components/ui/dialog"

import { Button } from '../../@/components/ui/button'
import { useState } from 'react'
import { useExpenses } from '../hooks/useExpenses'
import { useUser } from '../hooks/useUser'
import { getErrorMessage } from '../utils/errors'
import { toast } from "../../@/components/ui/use-toast"


export function DeleteExpenseModal({ dialogHeader, dialogDescription, expenseId }: { dialogHeader: string, dialogDescription: string, expenseId: string }) {

    const [open, setOpen] = useState(false)
    const { deleteExpense } = useExpenses()
    const { user } = useUser()
    const [loading, setLoading] = useState(false)

    const handleClick = async () => {
        setLoading(true)
        try {
            await deleteExpense({ expenseId, token: user.token })
            toast({
                variant: "default",
                title: "Expense delete successfully.",
                duration: 2000
            })
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: getErrorMessage(error),
                duration: 2000
            })
        } finally {
            setOpen(false)
            setLoading(false)
        }

    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className='flex items-center bg-red-200 text-red-700 p-2 hover:bg-red-300 duration-200 rounded'>
                <Trash2 className='h-4 w-4' />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{dialogHeader}</DialogTitle>
                    <DialogDescription>
                        {dialogDescription}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    {
                        loading ?
                            <Button disabled><Loader2 className="animate-spin" /></Button>
                            :
                            <Button onClick={handleClick}>Delete</Button>
                    }          
                </DialogFooter>

            </DialogContent>
        </Dialog>
    )

}