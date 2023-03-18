export const useApi = (route) => {
    let link = `http://localhost:3004/${route}`;

    async function get() { 
        const data = await fetch(link)
        return await data.json(); 
    }

    async function getUsers() { 
        const data = await fetch(link)
        return await data.json(); 
    }

    async function getUserByEmail(params) { 
        const data = await fetch(`${link}?email=${params}`)
        return await data.json();
    }
    async function getPostsByUser(params) {
        const data = await fetch(`${link}?userId=${params}`)
        return await data.json(); 
    }
    function post(newPost) {
        fetch(link, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPost)
        })
    }
    function remove(params) {
        fetch(`${link}/${params}`, {
            method: 'DELETE'
        })
    }

    return {
        get, getUsers, getUserByEmail, getPostsByUser, post, remove
    }
}
