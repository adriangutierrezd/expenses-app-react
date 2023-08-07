import { DataTable } from './CustomDatatable';
import { ColumnDef } from '@tanstack/react-table';
import { Expense } from '../types'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'



import { Button } from "../../@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../@/components/ui/dropdown-menu"


const columns: ColumnDef<Expense>[] = [
    {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "category.name",
        header: "Category",
      },
      {
        accessorKey: "amount",
        header: "Amount",
      },
      {
        accessorKey: "date",
        header: "Date",
      },
      {
        id: "actions",
        cell: () => {
            //const exp = row.original
            return (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                        <Pencil />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Trash2 />
                        Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )
        }
      }
]

export function ExpensesTable({data}: {data: Array<Expense>}){
    return(
        <DataTable columns={columns} data={data}/>
    )
}