const BASE_URL = 'http://localhost:3000/users'

interface Props {
    data: Object<any>,
    token: string,
    id: string
}
export const updateUserService = async({ data, token, id } : Props) => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({ ...data });

    const requestOptions = {
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
