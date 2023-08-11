import {
    AlertDialog as AlertDialogTmp,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "../../@/components/ui/alert-dialog"
  import { Button } from "../../@/components/ui/button"
  
  export function DeleteAccountDialog() {

    const handleSubmit = (event) => {
      event.preventDefault()
      console.log(event)
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
              <Button type="submit" className="block w-full">Continue</Button>
            </form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogTmp>
    )
  }
  