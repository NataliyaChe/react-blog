const apiMethods = {
    getMethod(link, state) {
        const fetchPosts = async () => {
            const data = await fetch(link)
            const posts = await data.json();
            state(posts)
        }
        fetchPosts()
    },
    postMethod(link, item) {
        fetch(link, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        })
    },
    deleteMethod(link) {
        fetch(link, {
            method: 'DELETE'
        })
    }
}

export default apiMethods;