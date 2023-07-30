import axios from 'axios'
const BASE_URL = '/api/blogs'

// .then promise version
// const getAll = () => {
//   const request = axios.get(baseUrl)
//   return request.then(response => response.data)
// }

const getAll = async () => {
  const response = await axios.get(BASE_URL)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll }