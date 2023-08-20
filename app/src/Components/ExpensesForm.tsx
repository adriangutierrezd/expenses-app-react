import { DatePicker } from './DatePicker'
import { useState, useEffect, ChangeEvent } from 'react'
import { Input } from "../../@/components/ui/input"
import { Button } from "../../@/components/ui/button"
import { Textarea } from "../../@/components/ui/textarea"
import { useCategories } from "../hooks/useCategories"
import { useUser } from '../hooks/useUser'
import CustomSelect from './CustomSelect'
import { useToast } from "../../@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { getErrorMessage } from '../utils/errors'
import { Expense } from '../types'
import { SelectCategoryOption } from './SelectCategoryOption'

interface CategoriesList {
    text: JSX.Element,
    id: string,
    value: string
}

interface Props{
    mode: string,
    defaultName?: string,
    defaultAmount?: number,
    defaultDate?: Date,
    defaultDescription?: string,
    defaultCategory?: string,
    expenseId?: string,
    handleSubmitP: ({ name, amount, token, category, description, date, expenseId }: { name: string, description?: string, token: string, category?:string, amount: number, date: Date, expenseId?:string }) => Promise<Expense>,
    handleOpenDialog?: (state: boolean) => void 
}

export function ExpensesForm({mode, expenseId, defaultAmount, defaultCategory, defaultName, defaultDescription, defaultDate, handleSubmitP, handleOpenDialog}: Props){

    const { toast } = useToast()
    const modeSmall = mode === 'small' ? 'col-span-6' : ''
    const { user } = useUser()
    const { categories, getCategories } = useCategories()
    const [categoriesList, setCategoriesList] = useState<Array<CategoriesList>>([])
    const [loading, setLoading] = useState(false)

    const [name, setName] = useState<string>(defaultName || '')
    const [date, setDate] = useState<Date>(defaultDate || new Date())
    const [description, setDescription] = useState<string>(defaultDescription || '')
    const [amount, setAmount] = useState<number>(defaultAmount || 0)
    const [category, setCategory] = useState(defaultCategory || '')

    const selectedValue = defaultCategory ? categories.filter(catg => catg.id == defaultCategory) : null
    const triggerPlaceholder = selectedValue ? <SelectCategoryOption name={selectedValue[0].name} color={selectedValue[0].color} /> : 'Pick a category'

    
    useEffect(() => {
        getCategories({categories: user.categories})

        const categoriesListAux: Array<CategoriesList> = categories.map((category => {
            return {
                text: <SelectCategoryOption name={category.name} color={category.color} />,
                id: category.id.toString(),
                value: category.id.toString()
            }
        }))
        setCategoriesList(categoriesListAux)
    }, [categories])


    const handleDateChange = (date: Date) => {
        setDate(date)
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true)
        try{
            if(date === undefined) throw new Error('You must select a date')
            if(category === '') throw new Error('You must select a category')
            await handleSubmitP({ name, amount, token: user.token, category, description, date, expenseId })
            toast({
                variant: "default",
                title: "Changes saved.",
                duration: 2000
            })
        }catch(error){
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: getErrorMessage(error),
                duration: 2000
            })
        }finally{
            setLoading(false)
            setName('')
            setAmount(0)
            setDescription('')
            setCategory('')
            if(typeof handleOpenDialog === 'function') handleOpenDialog(false)
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
                <Input className={`${modeSmall} col-span-12`} type="text" value={name} name="name" placeholder="Type your expense name" required maxLength={50} minLength={2} onChange={handleChangeName} />
                <Input placeholder='Type your expense cost' value={amount === 0 ? '' : amount} className={`${modeSmall} col-span-12`} onChange={handleAmountChange} type='number' name='amount' step={0.01} min={0.01} required/>
                <DatePicker classes={`col-span-12 ${modeSmall} w-100`} handleDateChange={handleDateChange} defaultDate={date}/>
                <CustomSelect handleSelect={handleSelect} items={categoriesList} classes={`col-span-12 ${modeSmall} w-100`} triggerPlaceholder={triggerPlaceholder} />
                <Textarea onChange={handleChangeDescription} value={description} className='col-span-12' name="description" cols={30} rows={3} placeholder='Put some notes about this expense (Optional)'/>

                {
                    loading ?
                        <Button type="submit" disabled className='col-span-12'><Loader2 className="animate-spin" /></Button>
                        :
                        <Button type="submit" className='col-span-12'>Save</Button>
                }
            </form>
        </>
    )

}