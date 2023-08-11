import { DeleteAccountDialog } from "./DeleteAccountDialog"


export function DeleteAccount() {
    
    return (

        <article className="border border-slate-300 p-4 rounded my-3">

            <header className="font-bold mb-5">
                Delete your account
            </header>

            <DeleteAccountDialog/>

        </article>
    )
}