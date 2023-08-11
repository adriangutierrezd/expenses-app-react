import { AlertCircle } from "lucide-react"

import {
    Alert as AlertTmp,
    AlertDescription,
    AlertTitle,
} from "../../@/components/ui/alert"

interface Props {
    title: string,
    message: string
}

export function Alert({ title, message }: Props) {
    return (
        <AlertTmp className='my-4'>
            <AlertCircle className='h-4 w-4' />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>
                {message}
            </AlertDescription>
        </AlertTmp>
    )
}
