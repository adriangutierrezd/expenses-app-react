import { ComboboxDemo } from "./Combobox";
import { getCurrencies } from '../services/currenciesService'

export function SettingsPage(){

    const currenciesRaw = getCurrencies()
    const keys = Object.keys(currenciesRaw)

    let currenciesFormatted = []
    keys.forEach(key => {
        const label = `(${key}) - ${currenciesRaw[key]}`
        const currencyObj = { label, value: key}
        currenciesFormatted.push(currencyObj)
    })

    
    return(
        <main>
            <h1>Settings</h1>
            <ComboboxDemo commandPlaceHolder='Search currency...' selectMessage='Select your currency' data={currenciesFormatted}/>
        </main>
    )
}