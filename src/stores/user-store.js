const axios = require('axios');

const API = "http://localhost:3000"

export const getUsers = async () => {
    const users = await axios.get(`${API}/`)
    return users.data.sort((a, b) => a.posts.length < b.posts.length)
}