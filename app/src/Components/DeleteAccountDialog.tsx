import {
  AlertDialog as AlertDialogTmp,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../@/components/ui/alert-dialog"
import { Button } from "../../@/components/ui/button"
import { useUser } from "../hooks/useUser"
import { deleteUserService } from "../services/userService"
import { getErrorMessage } from '../utils/errors'
import { useToast } from "../../@/components/ui/use-toast"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Loader2 } from "lucide-react";


export function DeleteAccountDialog() {

  const { user, set } = useUser()
  const { toast } = useToast()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      setLoading(true)
      const res = await deleteUserService({ id: user.id, token: user.token })
      if (res.status !== 200) throw new Error(res.message)
      set(null)
      navigate('/sign-up')
    } catch (error) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: getErrorMessage(error),
        duration: 2000
      })
    } finally {
      setLoading(false)
    }


  }


  return (
    <AlertDialogTmp>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Delete account</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form onSubmit={handleSubmit}>
            {
              loading ?
                <Button type="submit" disabled className='block w-full'><Loader2 className="animate-spin" /></Button>
                :
                <Button type="submit" className='block w-full'>Continue</Button>
            }
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogTmp>
  )
}
