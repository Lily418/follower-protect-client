const axios = require('axios');

const API = process.env.REACT_APP_TUMBLR_ENDPOINT

export const getUsers = async () => {
    const users = await axios.get(`${API}`)
    return users.data.sort((a, b) => a.posts.length === b.posts.length ? a.date < b.date : a.posts.length < b.posts.length)
}