const link = 'http://localhost:3004/posts';

const api = {
    async get() {
        
            const data = await fetch(link)
            return await data.json();
            
    },
    post(newPost) {
        fetch(link, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPost)
        })
    },
    delete(params) {
        fetch(`${link}/${params}`, {
            method: 'DELETE'
        })
    }
}

export default api;