
export interface ExpenseByCategory {
    category: string,
    amount: number,
    color: string
}

export interface Category{
    name: string, 
    color: string,
    id: number,
    user: number
}

export interface Expense{
    name: string, 
    description?: string,
    user: number,
    amount: number,
    date: Date,
    category: Category
}