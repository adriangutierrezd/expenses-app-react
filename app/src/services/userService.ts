const BASE_URL = '/api/users'
interface Props {
    data?: object,
    token: string,
    id: string
}
export const updateUserService = async({ data, token, id } : Props) => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({ ...data });

    const requestOptions: RequestInit = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };


    const response = await fetch(`${BASE_URL}/${id}`, requestOptions)
    const res = await response.json()

    res.status = response.status
    return res
}

export const deleteUserService = async({ token, id } : Props) => {
    
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);
    
        const requestOptions: RequestInit = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        }

        const response = await fetch(`${BASE_URL}/${id}`, requestOptions)
        const res = await response.json()

        res.status = response.status
        return res
}


