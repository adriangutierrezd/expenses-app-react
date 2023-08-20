import { Input } from "../../@/components/ui/input"
import { Label } from "../../@/components/ui/label"
import { Button } from "../../@/components/ui/button"
import { NavLink } from "react-router-dom"
import { loginService } from "../services/loginService"
import { useToast } from "../../@/components/ui/use-toast"
import { ChangeEvent, useState } from "react"
import { useUser } from "../hooks/useUser"
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../utils/errors"

export function SignInPage() {

    const { toast } = useToast()
    const { set } = useUser()

    const navigate = useNavigate()

    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try{
            const res = await loginService({ username, password })
            if(res.status !== 200) throw new Error(res.message)
            set(res)
            navigate('/')
        }catch(error){
            const message = getErrorMessage(error)
            toast({
                title: "Uh oh! Something went wrong.",
                description: message,
              })
        }

    }

    const handleUsernameChange = (event: ChangeEvent) => {
        const target = event.target as HTMLInputElement
        setUsername(target.value)
    }

    const handlePasswordChange = (event: ChangeEvent) => {
        const target = event.target as HTMLInputElement
        setPassword(target.value)
    }

    return (
        <main className="h-screen w-screen flex justify-center items-center p-2">
            <section className="w-full border border-slate-300 rounded p-2">
                <h1 className='text-center'>Sign In!</h1>
                <form onSubmit={handleSubmit}>
                    <Label>Username</Label>
                    <Input type='text' onChange={handleUsernameChange} name="username" placeholder="Type your username" required />

                    <Label>Password</Label>
                    <Input type='password' onChange={handlePasswordChange} name="password" required />

                    <div className="flex justify-between align-center w-full my-3">
                        <NavLink className='self-center underline text-blue-500' to="/sign-up">Don't have an account yet?</NavLink>
                        <Button type="submit">Sign In</Button>
                    </div>
                </form>
            </section>
        </main>
    )
}