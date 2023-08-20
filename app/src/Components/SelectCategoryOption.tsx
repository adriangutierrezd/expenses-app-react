

export function SelectCategoryOption({ name, color }: { name: string, color: string }) {

    return (
        <span className='flex items-center'>
            <div className='mr-2 rounded h-2 w-2' style={{ backgroundColor: color }}></div>
            {name}
        </span>
    )

} 