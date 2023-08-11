import { ChangePasswordForm } from "./ChangePasswordForm";
import { DeleteAccount } from "./DeleteAccount";

export function ProfilePage(){
    return(
        <main>

            <h1>Your profile</h1>
            <ChangePasswordForm/>
            <DeleteAccount/>


        </main>
    )
}