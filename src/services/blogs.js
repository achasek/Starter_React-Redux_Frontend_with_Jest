import axios from 'axios';
const BASE_URL = '/api/blogs';

// we set the token here and not in loginServices since a valid token is required to create and delete blogs and therfore must be sent as part of the request, which starts here
let token = null;

// adds necessary Bearer keyword
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

// .then promise version
// const getAll = () => {
//   const request = axios.get(baseUrl)
//   return request.then(response => response.data)
// }

const getAll = async () => {
  const response = await axios.get(BASE_URL);
  console.log(response, 'response in servies');
  return response.data;
};

const create = async (newBlog) => {
  // sets token to the auth header, which is needed in the backend
  const authorizationHeader = {
    headers: { Authorization: token },
  };
  const response = await axios.post(BASE_URL, newBlog, authorizationHeader);
  return response.data;
};

const edit = async (id, edittedBlog) => {
  const authorizationHeader = {
    headers: { Authorization: token },
  };
  const response = await axios.put(
    `${BASE_URL}/${id}`,
    edittedBlog,
    authorizationHeader,
  );
  return response.data;
};

const deleteBlog = async (id) => {
  const authorizationHeader = {
    headers: { Authorization: token },
  };
  await axios.delete(`${BASE_URL}/${id}`, authorizationHeader);
};

export default { setToken, getAll, create, edit, deleteBlog };
