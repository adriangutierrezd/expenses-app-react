import { ComboboxDemo } from "./Combobox";
import { getCurrencies } from '../services/currenciesService'
import { updateUserService } from '../services/userService'
import { useUser } from "../hooks/useUser";
import { getErrorMessage } from "../utils/errors";
import { useToast } from "../../@/components/ui/use-toast"


interface CurrencyOption {label: string, value: string}

export function SettingsPage(){

    const {user, set} = useUser()
    const currenciesRaw : Record<string, string> = getCurrencies()
    const keys = Object.keys(currenciesRaw)
    const { toast } = useToast()

    const defaultCurrency = user.currency ?? null

    const currenciesFormatted: Array<CurrencyOption> = []
    keys.forEach((k: string) => {

        const label = `(${k}) - ${currenciesRaw[k]}`
        const currencyObj = { label, value: k}
        currenciesFormatted.push(currencyObj)
    })

    const handleSelectUpdate = async(value: string) => {

        try{
            const data = { currency: value }
            const response = await updateUserService({ data, token: user.token, id: user.id })
            if(response.status !== 200) throw new Error(response.message)
            set({ ...user, currency: value })
            toast({
                title: "Currency updated successfully.",
                duration: 2000
            })
        }catch(error){
            toast({
                variant: 'destructive',
                title: "Uh oh! Something went wrong.",
                description: getErrorMessage(error)
            })
        }

    }

    
    return(
        <main>
            <h1>Settings</h1>
            <ComboboxDemo defaultSelect={defaultCurrency === null ? '' : defaultCurrency} commandPlaceHolder='Search currency...' handleSelectUpdate={handleSelectUpdate} selectMessage='Select your currency' data={currenciesFormatted}/>
        </main>
    )
}