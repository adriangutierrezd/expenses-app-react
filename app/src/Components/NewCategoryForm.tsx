import { useState } from "react"
import { Button } from "../../@/components/ui/button"


export function NewCategoryForm(){

    const initialColor = '#7424D5'

    const [name, setName] = useState('')
    const [color, setColor] = useState(initialColor)


    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handleColorChange = (event) => {
        setColor(event.target.value)
    }

    const handleSubmit = (event) => {

        event.preventDefault()

        console.log(name, color)
    }

    return(
        <form onSubmit={handleSubmit} className='grid grid-cols-12 gap-2'>
            <input type="color" name="color" onChange={handleColorChange} className='col-span-1 minimalist-color-input' value={initialColor}/>
            <input type="text" name="name" onChange={handleNameChange} required minLength={2} maxLength={50} placeholder="Type your new category name..." className='col-span-11 border border-slate-300 rounded p-2'/>
            <Button type="submit" className='col-span-12'>Create</Button>
        </form>
    )

      
}