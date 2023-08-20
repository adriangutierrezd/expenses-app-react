import { DataTable } from './CustomDatatable';
import { ColumnDef } from '@tanstack/react-table';
import { Expense } from '../types'
import { EditExpenseDialog } from './EditExpenseDialog';
import { DeleteExpenseModal } from './DeleteExpenseModal';
import { formatDateToDDMMYYYY } from '../utils/dates';

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
        cell: ({row}) => {
          return (
            <span>{formatDateToDDMMYYYY(new Date(row.original.date))}</span>
          )
        }
      },
      {
        id: "actions",
        cell: ({row}) => {
          return (
              <span className='flex'>

                <EditExpenseDialog mode='' dialogHeader={`Edit ${row.original.name}`} defaultAmount={row.original.amount} defaultCategory={row.original.category.id} defaultName={row.original.name} defaultDescription={row.original.description} defaultDate={row.original.date} expenseId={row.original.id} />
                <DeleteExpenseModal dialogHeader={`Delete ${row.original.name}`} dialogDescription={`Are you sure you want to delete ${row.original.name}?`} expenseId={row.original.id} />
              </span>
            )
        }
      }
]

export function ExpensesTable({data}: {data: Array<Expense>}){
    return(
        <DataTable columns={columns} data={data}/>
    )
}