import { Input } from "../../@/components/ui/input"
import { Label } from "../../@/components/ui/label"
import { Button } from "../../@/components/ui/button"
import { changePasswordService } from '../services/changePasswordService'
import { useToast } from "../../@/components/ui/use-toast"
import { ChangeEvent, useState } from "react"
import { loginService } from "../services/loginService"
import { getErrorMessage } from "../utils/errors"
import { Loader2 } from "lucide-react"
import { useUser } from "../hooks/useUser"


export function ChangePasswordForm() {

    const { toast } = useToast()

    const user = useUser()
    const [ currentPassword, setCurrentPassword ] = useState('')
    const [ newPassword, setNewPassword ] = useState('')
    const [ newPasswordR, setNewPasswordR ] = useState('')
    const [loading, setLoading] = useState(false)


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true)

        try{

            if(newPassword != newPasswordR) throw new Error("Passwords don't match")
            const res = await loginService({ username: user.username, password: currentPassword })
            if(res.status !== 200) throw new Error(res.message)

        }catch(error){
            setLoading(false)
            toast({
                variant: 'destructive',
                title: "Uh oh! Something went wrong.",
                description: getErrorMessage(error)
            })
            return
        }

        try{

            const passwordUpdate = await changePasswordService({ password: newPassword, token: user.token, id: user.id })
            if(passwordUpdate.status !== 200) throw new Error(passwordUpdate.message)
            toast({
                title: "Password changed successfully.",
                duration: 2000
            })

        }catch(error){
            toast({
                title: "Uh oh! Something went wrong.",
                description: getErrorMessage(error),
            })
        }finally{
            setLoading(false)
            setCurrentPassword('')
            setNewPassword('')
            setNewPasswordR('')
        }

    }


    const handleCurrentPasswordChange = (event: ChangeEvent) => {
        const target = event.target as HTMLInputElement
        setCurrentPassword(target.value)
    }

    const handleNewPasswordChange = (event: ChangeEvent) => {
        const target = event.target as HTMLInputElement
        setNewPassword(target.value)
    }

    const handleNewPasswordRChange = (event: ChangeEvent) => {
        const target = event.target as HTMLInputElement
        setNewPasswordR(target.value)
    }
    
    return (

        <article className="border border-slate-300 p-4 rounded my-3">

            <header className="font-bold mb-5">
                Change your password
            </header>

            <form onSubmit={handleSubmit} className="flex flex-col">

                <Label className='mb-2'>Current password</Label>
                <Input onChange={handleCurrentPasswordChange} value={currentPassword} type='password' name='current-password' required className="mb-3" />

                <Label className='mb-2'>New password</Label>
                <Input onChange={handleNewPasswordChange} value={newPassword} type='password' name='new-password' required className="mb-3" />
                <Label className='mb-2'>Repeat new password</Label>
                <Input onChange={handleNewPasswordRChange} value={newPasswordR} type='password' name='repeat-new-password' required className="mb-3" />
                {
                    loading ?
                        <Button type="submit" disabled className='my-3'><Loader2 className="animate-spin" /></Button>
                        :
                        <Button type="submit" className='my-3'>Save</Button>
                }
            </form>
        </article>
    )
}