
import Cookies from "js-cookie";
import { fetchWrapper } from '../helpers/wrapper.jsx';

export const blogService = {
  createBlog,
  getBlogDetail,
  deleteBlog
};
function createBlog(data) {
  // let token = Cookies.get("user-token");
  return fetchWrapper.post(`http://localhost:3001/api/v1/blogs`, undefined, data).then((res) => {
    console.log('createRes',res);
    return res;
  });
}

function getBlogDetail() {
  // let token = Cookies.get("user-token");
  return fetchWrapper.get(`http://localhost:3001/api/v1/blogs`, undefined, data).then((res) => {
    console.log('createRes',res);
    return res;
  });
}
//TODO:
function deleteBlog(id) {
  let token = Cookies.get("user-token");
  return fetchWrapper.delete(`http://localhost:3001/api/v1/blogs/${id}`, token, undefined).then((res) => {
    console.log('createRes',res);
    return res;
  });
}

