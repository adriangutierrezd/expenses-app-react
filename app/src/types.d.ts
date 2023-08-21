
export interface ExpenseByCategory {
    category: string,
    amount: number,
    color: string
}

export interface Category{
    name: string, 
    color: string,
    id: string,
    user: number
}

export interface Expense{
    id: string,
    name: string, 
    description?: string,
    user: number,
    amount: number,
    date: Date,
    category: Category
}

export interface ComboboxData{
    value: string,
    label: string
}


export interface DateRange{
    from: Date,
    to: Date
}

export interface ExpensesByMonth{
    month: string,
    year: number,
    amount: number
}

export interface CreateExpenseService{
    name: string,
    description?: string|null,
    amount: number,
    date: Date,
    category: string,
    token: string,
    expenseId?: string
}

export interface EditExpenseService{
    name: string,
    description?: string|null,
    amount: number,
    date: Date,
    category: string,
    token: string,
    expenseId?: string
}

export interface CustomSelectItem{
    text: string | JSX.Element,
    id: string,
    value: string
}
