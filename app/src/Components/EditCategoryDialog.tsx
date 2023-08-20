
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "../../@/components/ui/dialog"

import { Pencil } from 'lucide-react'
import { CategoryForm } from './CategoryForm';
import { useCategories } from "../hooks/useCategories";
import { useState } from "react";

export function EditCategoryDialog({ dialogHeader, categoryName, categoryColor, categoryId }: { dialogHeader: string, categoryName: string, categoryColor: string, categoryId: string }) {

    const { editCategory } = useCategories()
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
                <CategoryForm defaultName={categoryName} defaultColor={categoryColor} categoryId={categoryId} handleSubmitP={editCategory} handleOpenDialog={handleOpen} />
            </DialogContent>
        </Dialog>
    )
}