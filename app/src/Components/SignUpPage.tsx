import { Input } from "../../@/components/ui/input"
import { Label } from "../../@/components/ui/label"
import { Button } from "../../@/components/ui/button"
import { NavLink } from "react-router-dom"



export function SignUpPage() {

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    return (
        <main className="h-screen w-screen flex justify-center items-center p-2">
            <section className="w-full border border-slate-300 rounded p-2">
                <h1 className='text-center'>Sign Up!</h1>
                <form onSubmit={handleSubmit}>
                    <Label>Username</Label>
                    <Input type='text' name="username" placeholder="Type your username" required />

                    <Label>Password</Label>
                    <Input type='password' name="password" required />

                    <Label>Repeat password</Label>
                    <Input type='password' name="repeat-password" required />

                    <div className="flex justify-between align-center w-full my-3">
                        <NavLink className='self-center underline text-blue-500' to="/sign-in">Already have an account?</NavLink>
                        <Button type="submit">Sign Up</Button>
                    </div>
                </form>
            </section>
        </main>
    )
}