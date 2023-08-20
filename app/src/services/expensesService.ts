const BASE_URL = 'http://localhost:3000/expenses'
import { CreateExpenseService, EditExpenseService } from '../types'

export const createExpenseService = async ({ name, description, amount, date, category, token }: CreateExpenseService) => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({ name, description, amount, date, category });

    const requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };


    const response = await fetch(BASE_URL, requestOptions)
    const res = await response.json()

    res.status = response.status
    return res
}

export const editExpenseService = async ({ name, description, amount, date, category, token, expenseId }: EditExpenseService) => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({ name, description, amount, date, category });

    const requestOptions: RequestInit = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const response = await fetch(`${BASE_URL}/${expenseId}`, requestOptions)
    const res = await response.json()

    res.status = response.status
    return res

}

export const deleteExpenseService = async ({ token, expenseId }: { token: string, expenseId: string }) => {

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions: RequestInit = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
    };

    const response = await fetch(`${BASE_URL}/${expenseId}`, requestOptions)
    const res = await response.json()

    res.status = response.status
    return res
}
