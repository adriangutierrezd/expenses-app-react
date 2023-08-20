const BASE_URL = 'http://localhost:3000/categories'


export const createCategoryService = async({ name, color, token } : { name: string, color: string, token: string }) => {
    
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);
    
        const raw = JSON.stringify({name, color});
    
        const requestOptions = {
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

export const editCategoryService = async({ name, color, token, categoryId } : { name: string, color: string, token: string, categoryId: string }) => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({name, color});

    const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const response = await fetch(`${BASE_URL}/${categoryId}`, requestOptions)
    const res = await response.json()

    res.status = response.status
    return res

}


export const deleteCategories = async ({ token, categoryId } : { token: string, categoryId: string }) => {

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
    };

    const response = await fetch(`${BASE_URL}/${categoryId}`, requestOptions)
    const res = await response.json()

    res.status = response.status
    return res

}
