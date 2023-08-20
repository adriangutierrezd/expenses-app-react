import { Input } from "../../@/components/ui/input"
import { Label } from "../../@/components/ui/label"
import { Button } from "../../@/components/ui/button"
import { NavLink } from "react-router-dom"
import { ChangeEvent, useState } from 'react'
import { useToast } from "../../@/components/ui/use-toast"
import { signUpService } from '../services/signUpService'
import { loginService } from "../services/loginService"
import { useUser } from "../hooks/useUser"
import { getErrorMessage } from "../utils/errors"
import { useNavigate } from "react-router-dom";


export function SignUpPage() {

    const { toast } = useToast()
    const { set } = useUser()


    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ passwordRepeat, setPasswordRepeat ] = useState('')
    const navigate = useNavigate()


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if(password != passwordRepeat){
            toast({
                title: "Uh oh! Something went wrong.",
                description: "Passwords must match",
              })
            return
        }

        try{

            const res = await signUpService({ username, password })
            if(res.status !== 201) throw new Error(res.message)

            const resLogIn = await loginService({ username, password })
            if(resLogIn.status !== 200) throw new Error(resLogIn.message)
            set(resLogIn)
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

    const handlePasswordRChange = (event: ChangeEvent) => {
        const target = event.target as HTMLInputElement
        setPasswordRepeat(target.value)
    }

    return (
        <main className="h-screen w-screen flex justify-center items-center p-2">
            <section className="w-full border border-slate-300 rounded p-2">
                <h1 className='text-center'>Sign Up!</h1>
                <form onSubmit={handleSubmit}>
                    <Label>Username</Label>
                    <Input type='text' onChange={handleUsernameChange} name="username" minLength={3} placeholder="Type your username" required />

                    <Label>Password</Label>
                    <Input type='password' onChange={handlePasswordChange} name="password" minLength={3} required />

                    <Label>Repeat password</Label>
                    <Input type='password' onChange={handlePasswordRChange} name="repeat-password" minLength={3} required />

                    <div className="flex justify-between align-center w-full my-3">
                        <NavLink className='self-center underline text-blue-500' to="/sign-in">Already have an account?</NavLink>
                        <Button type="submit">Sign Up</Button>
                    </div>
                </form>
            </section>
        </main>
    )
}