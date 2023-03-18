export const useApi = (route) => {
    // let link = `http://localhost:3004/${route}`;
    let link = 'http://localhost:3004/';

    async function get(route) { 
        const data = await fetch(`${link}${route}`)
        return await data.json(); 
    }

    async function getUserByEmail(route, params) { 
        const data = await fetch(`${link}${route}?email=${params}`)
        return await data.json();
    }
    async function getPostsByUser(route, params) {
        const data = await fetch(`${link}${route}?userId=${params}`)
        return await data.json(); 
    }
    function post(route, newPost) {
        fetch(`${link}${route}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPost)
        })
    }

    function patch(route, id, value) {
        fetch(`${link}${route}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(value)
        })
    }

    function remove(route, params) {
        fetch(`${link}${route}/${params}`, {
            method: 'DELETE'
        })
    }

    return {
        get, getUserByEmail, getPostsByUser, post, patch, remove
    }
}
