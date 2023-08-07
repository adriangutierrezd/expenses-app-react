import { DatePicker } from './DatePicker'
import { useState, useEffect } from 'react'
import { Input } from "../../@/components/ui/input"
import { Button } from "../../@/components/ui/button"
import { Textarea } from "../../@/components/ui/textarea"
import { useCategories } from "../hooks/useCategories"


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../../@/components/ui/select"


export function NewExpenseForm({mode}: {mode:string}){

    const { categories, getCategories } = useCategories()

    useEffect(() => {
        getCategories({user: 1})
    }, [])


    const [name, setName] = useState<string>('')
    const [date, setDate] = useState<Date | null>(null)
    const [description, setDescription] = useState<string | null>(null)
    const [amount, setAmount] = useState<number>(0.0)
    const [category, setCategory] = useState('')



    const handleDateChange = (date: Date) => {
        setDate(date)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log({
            name, 
            description,
            amount,
            date,
            category
        })
    }

    const handleChangeName = (event) => {
        setName(event.target.name)
    }

    const modeSmall = mode === 'small' ? '' : 'md:col-span-6'

    return(
        <form onSubmit={handleSubmit} className='grid grid-cols-12 gap-4'>
            <Input className={`${modeSmall} col-span-12`} type="text" name="name" placeholder="Type your expense name" required maxLength={50} minLength={2} onChange={handleChangeName} />
            <Input placeholder='Type your expense cost' className={`${modeSmall} col-span-12`} type='number' name='amount' step={0.01} min={0.01} required/>
            <DatePicker classes={`col-span-12 ${modeSmall} w-100`} handleDateChange={handleDateChange} defaultDate={new Date()}/>
            <Select required name="category">
                <SelectTrigger className={`${modeSmall} col-span-12`}>
                    <SelectValue placeholder="Pick a category" />
                </SelectTrigger>
                <SelectContent>
                    {
                        categories.map(category => {
                            return (<SelectItem value={category.id.toString()} key={category.id}>
                                <span className='flex items-center'>
                                    <div className='rounded mr-2' style={{backgroundColor: category.color, width: 10, height: 10}}></div>
                                    {category.name}
                                </span>
                            </SelectItem>)
                        })
                    }
                </SelectContent>
            </Select>
            <Textarea className='col-span-12' name="description" cols={30} rows={3} placeholder='Put some notes about this expense (Optional)'/>

            <Button className='col-span-12' type='submit'>Create</Button>
        </form>
    )

}