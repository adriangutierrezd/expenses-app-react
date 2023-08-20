import { DataTable } from './CustomDatatable';
import { ColumnDef } from '@tanstack/react-table';
import { Category } from '../types'
import { EditCategoryDialog } from './EditCategoryDialog';
import { DeleteCategoryModal } from './DeleteCategoryModal';

import { HoverCard } from './CustomHoverCard';

const columns: ColumnDef<Category>[] = [
    {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "color",
        header: "Color",
        cell: ({row}) => {
          return(
            <HoverCard content={row.original.color}><div className='rounded mr-2' style={{backgroundColor: row.original.color, width: 20, height: 20}}></div></HoverCard>
          )
        }
      },
      {
        id: "actions",
        cell: ({row}) => {
            return (
                <span className='flex'>

                  <EditCategoryDialog categoryColor={row.original.color} categoryId={row.original.id} categoryName={row.original.name} dialogHeader={`Edit category ${row.original.name}`}/>
                  <DeleteCategoryModal categoryId={row.original.id} dialogDescription='This action is irreversible and it will delete this category and all expenses linked to it' dialogHeader={`Are you sure you want to delete ${row.original.name} ?`} />

                </span>
              )
        }
      }
]

export function CategoriesTable({data}: {data: Array<Category>}){
    return(
        <DataTable columns={columns} data={data} />
    )
}