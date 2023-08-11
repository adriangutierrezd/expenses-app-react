import { Alert } from "./Alert"

export function NoExpensesYet(){
    return(
        <Alert title='Opps!' message="Seems like you haven't registerd any expense on this period of time" />
    )
}