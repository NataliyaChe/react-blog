

class Api {
    link = 'http://localhost:3004/posts';
    constructor() {
        
    }
    async get() {
        
        const data = await fetch(this.link)
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