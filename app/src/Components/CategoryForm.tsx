import { ChangeEvent, useState } from "react"
import { Button } from "../../@/components/ui/button"
import { defaultCategoriesColor } from "../consts"
import { Loader2 } from "lucide-react"
import { getErrorMessage } from '../utils/errors'
import { useUser } from "../hooks/useUser"
import { toast } from "../../@/components/ui/use-toast"


interface Props {

    defaultName?: string, 
    defaultColor?: string, 
    categoryId?: string, 
    handleSubmitP: ({ name, color, token, categoryId }: { name: string, color: string, token: string, categoryId?:string }) => Promise<void>,
    handleOpenDialog?: (state: boolean) => void 

}

export function CategoryForm({ defaultName, defaultColor, categoryId, handleSubmitP, handleOpenDialog }: Props) {

    const { user } = useUser()
    const [name, setName] = useState(defaultName || '')
    const [color, setColor] = useState(defaultColor || defaultCategoriesColor)
    const [loading, setLoading] = useState(false)


    const handleNameChange = (event: ChangeEvent) => {
        const target = event.target as HTMLInputElement
        setName(target.value)
    }

    const handleColorChange = (event: ChangeEvent) => {
        const target = event.target as HTMLInputElement
        setColor(target.value)
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true)
        try{
            await handleSubmitP({name, color, token: user.token, categoryId})
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
            setColor(defaultCategoriesColor)
            if(typeof handleOpenDialog === 'function') handleOpenDialog(false)
        }
    }


    return (
        <>
            <form onSubmit={handleSubmit} className='grid grid-cols-12 gap-2'>
                <input type="color" name="color" onChange={handleColorChange} className='col-span-1 minimalist-color-input' value={color} />
                <input type="text" name="name" onChange={handleNameChange} value={name} required minLength={2} maxLength={50} placeholder="Type your new category name..." className='col-span-11 border border-slate-300 rounded p-2' />
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