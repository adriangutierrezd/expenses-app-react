import { DatePicker } from './DatePicker'
import { useState, useEffect, ChangeEvent } from 'react'
import { Input } from "../../@/components/ui/input"
import { Button } from "../../@/components/ui/button"
import { Textarea } from "../../@/components/ui/textarea"
import { useCategories } from "../hooks/useCategories"
import { useUser } from '../hooks/useUser'
import CustomSelect from './CustomSelect'
import { useToast } from "../../@/components/ui/use-toast"
import { useExpenses } from '../hooks/useExpenses'
import { Loader2 } from "lucide-react"
import { getErrorMessage } from '../utils/errors'

interface CategoriesList {
    text: JSX.Element,
    id: string,
    value: string
}

export function NewExpenseForm({mode}: {mode:string}){

    const { createExpense } = useExpenses()
    const { toast } = useToast()
    const modeSmall = mode === 'small' ? 'col-span-6' : ''
    const { user } = useUser()
    const { categories, getCategories } = useCategories()
    const [categoriesList, setCategoriesList] = useState<Array<CategoriesList>>([])
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        getCategories({categories: user.categories})

        const categoriesListAux: Array<CategoriesList> = categories.map((category => {
            return {
                text: <span className='flex items-center'>
                    <div className='mr-2 rounded h-2 w-2' style={{backgroundColor: category.color}}></div>
                    {category.name}
                </span>,
                id: category.id.toString(),
                value: category.id.toString()
            }
        }))
        setCategoriesList(categoriesListAux)
    }, [categories])


    const [name, setName] = useState<string>('')
    const [date, setDate] = useState<Date>(new Date())
    const [description, setDescription] = useState<string | null>(null)
    const [amount, setAmount] = useState<number>(0.0)
    const [category, setCategory] = useState('')

    const handleDateChange = (date: Date) => {
        setDate(date)
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setLoading(true)
        try {

            if(!date) throw new Error('Date is required')

            await createExpense({          
                name, 
                description,
                amount,
                date,
                category, token: user.token })
            toast({
                variant: "default",
                title: "Expense created succesfully.",
                duration: 2000
            })
        } catch (err) {
            const message = getErrorMessage(err)
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: message,
                duration: 2000
            })
        } finally {
            setLoading(false)
        }

    }

    const handleChangeName = (event: ChangeEvent) => {
        const target = event.target as HTMLInputElement
        setName(target.value)
    }

    const handleChangeDescription = (event: ChangeEvent) => {
        const target = event.target as HTMLInputElement
        setDescription(target.value)
    }

    const handleAmountChange = (event: ChangeEvent) => {
        const target = event.target as HTMLInputElement
        setAmount(Number(target.value))
    }
    
    const handleSelect = (data: string) => {
        setCategory(data)
    }

    return(
        <>
            <form onSubmit={handleSubmit} className='grid grid-cols-12 gap-4'>
                <Input className={`${modeSmall} col-span-12`} type="text" name="name" placeholder="Type your expense name" required maxLength={50} minLength={2} onChange={handleChangeName} />
                <Input placeholder='Type your expense cost' className={`${modeSmall} col-span-12`} onChange={handleAmountChange} type='number' name='amount' step={0.01} min={0.01} required/>
                <DatePicker classes={`col-span-12 ${modeSmall} w-100`} handleDateChange={handleDateChange} defaultDate={date}/>
                <CustomSelect handleSelect={handleSelect} items={categoriesList} classes={`col-span-12 ${modeSmall} w-100`} triggerPlaceholder={'Select a category'} />
                <Textarea onChange={handleChangeDescription} className='col-span-12' name="description" cols={30} rows={3} placeholder='Put some notes about this expense (Optional)'/>

                {
                    loading ?
                        <Button type="submit" disabled className='col-span-12'><Loader2 className="animate-spin" /></Button>
                        :
                        <Button type="submit" className='col-span-12'>Create</Button>
                }
            </form>
        </>
    )

}