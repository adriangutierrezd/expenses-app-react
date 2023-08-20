const BASE_URL = 'http://localhost:3000/users'

interface Props {
    password: string,
    token: string,
    id: string
}
export const changePasswordService = async({ password, token, id } : Props) => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({ password });

    const requestOptions: RequestInit = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };


    const response = await fetch(`${BASE_URL}/${id}`, requestOptions)
    const data = await response.json()

    data.status = response.status
    return data

}
