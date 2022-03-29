const axios = require('axios')
const stable = require('stable')

const API = process.env.REACT_APP_TUMBLR_ENDPOINT

export const getUsers = async () => {
    const users = await axios.get(`${API}`)
    const flagIndex = (flag) => {
        if (!flag) {
            return 0
        }
        else if (flag === "🟢") {
            return -2
        } else if (flag === "🟠") {
            return -1
        } else if (flag === "🔴") {
            return -3
        }
    }

    return stable(users.data, ((a, b) => a.flag !== b.flag ? flagIndex(a.flag) < flagIndex(b.flag) : a.date < b.date))
}

export const updateFlag = async (userId, flag) => {
    return axios.post(`${API}/flag/${encodeURIComponent(userId)}/${flag}`)
}