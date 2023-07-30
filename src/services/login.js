import axios from 'axios'
const BASE_URL = '/api/login'

const login = async (credentials) => {
    const response = await axios.post(BASE_URL, credentials)
    return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { login }