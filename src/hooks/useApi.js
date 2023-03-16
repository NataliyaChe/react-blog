import React from 'react';

export const useApi = () => {
    const link = `http://localhost:3004/${route}`;

    const get = async () => { 
        const data = await fetch(link)
        return await data.json(); 
    }

    const getUserByEmail(params) = async () => { 
        const data = await fetch(`${link}?email=${params}`)
        return await data.json();
    }

    const getPostsByUser(params) = async () => { 
        const data = await fetch(`${link}?userId=${params}`)
        return await data.json(); 
    }

    return {
        getUserByEmail, getPostsByUser
    }
}


// class Api {
//     constructor(route) {
//         this.link = `http://localhost:3004/${route}`
//     }
//     async get() {
//         const data = await fetch(this.link)
//         return await data.json(); 
//     }
//     async getUserByEmail(params) { 
//         const data = await fetch(`${this.link}?email=${params}`)
//         return await data.json();
//     }
//     async getPostsByUser(params) {
//         const data = await fetch(`${this.link}?userId=${params}`)
//         return await data.json(); 
//     }
//     post(newPost) {
//         fetch(this.link, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(newPost)
//         })
//     }
//     delete(params) {
//         fetch(`${this.link}/${params}`, {
//             method: 'DELETE'
//         })
//     }
// }

// export default Api;