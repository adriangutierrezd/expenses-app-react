const BASE_URL = 'http://localhost:3000/users'

interface Props {
    username: string,
    password: string
}
export const signUpService = async({ username, password } : Props) => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ username, password });

    const requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };


    const response = await fetch(BASE_URL, requestOptions)
    const data = await response.json()

    data.status = response.status
    return data

}
