import {
    HoverCard as HoverCardTmp,
    HoverCardContent,
    HoverCardTrigger,
} from "../../@/components/ui/hover-card"
  

interface Props {
    children: Element,
    content: string
}

export function HoverCard({children, content} : Props){
    return(
        <HoverCardTmp>
            <HoverCardTrigger key='d'>{children}</HoverCardTrigger>
            <HoverCardContent>
                {content}
            </HoverCardContent>
        </HoverCardTmp>
    )
}