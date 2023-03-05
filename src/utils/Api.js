

class Api {
    constructor(link) {
        this.link = link
    }
    async get() {
        const data = await fetch(this.link)
        return await data.json(); 
    }
    async getUserByEmail(params) { 
        const data = await fetch(`${this.link}?email=${params}`)
        return await data.json();
    }
    async getPostsByUser(params) {
        const data = await fetch(`${this.link}?userId=${params}`)
        return await data.json(); 
    }
    post(newPost) {
        fetch(this.link, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPost)
        })
    }
    delete(params) {
        fetch(`${this.link}/${params}`, {
            method: 'DELETE'
        })
    }
}

export default Api;