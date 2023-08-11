import { Input } from "../../@/components/ui/input"
import { Label } from "../../@/components/ui/label"
import { Button } from "../../@/components/ui/button"

export function ChangePasswordForm() {
    
    const handleSubmit = (event) => {
        event.preventDefault()
        
    }
    
    return (

        <article className="border border-slate-300 p-4 rounded my-3">

            <header className="font-bold mb-5">
                Change your password
            </header>

            <form onSubmit={handleSubmit} className="flex flex-col">

                <Label className='mb-2'>Current password</Label>
                <Input type='password' name='current-password' required className="mb-3" />

                <Label className='mb-2'>New password</Label>
                <Input type='password' name='new-password' required className="mb-3" />
                <Label className='mb-2'>Repeat new password</Label>
                <Input type='password' name='repeat-new-password' required className="mb-3" />
                <Button type='submit' className="my-3">Change password</Button>
            </form>

        </article>
    )
}