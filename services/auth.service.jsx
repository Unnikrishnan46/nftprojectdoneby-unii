import { BehaviorSubject } from 'rxjs';
import Router from 'next/router'
import Cookies from "js-cookie";

import { fetchWrapper } from '../helpers/wrapper.jsx';
// const userSubject = new BehaviorSubject(storage.get("user-data"))


const userSubject = new BehaviorSubject(process.browser && typeof window !== "undefined" && localStorage.getItem('user-data') !== null && localStorage.getItem('user-data') !== undefined && localStorage.getItem('user-data'))


export const authService = {
  user: userSubject.asObservable(),
  get userValue() { return userSubject },
  login,
  logout,
  signup
};

const setCookie = (res) => {
  let d = new Date();
  d.setTime(d.getTime() + (60 * 60 * 1000));
  console.log('res',res);
  Cookies.set("user-token", res?.data?.token, { expires: d, path: "*" })
}

function login(data) {
  return fetchWrapper.post(`http://localhost:3001/api/v1/users/login`, undefined, data).then((res) => {
    userSubject.next(res.data);
    localStorage.setItem('user-data', JSON.stringify(res.data));
      setCookie(res);
    Router.push("/");

    return res;
  });
}

function signup(data) {
  return fetchWrapper.post(`http://localhost:3001/api/v1/users/signup`, undefined, data).then((res) => {
    // userSubject.next(res.data);
    // localStorage.setItem('user-data', JSON.stringify(res.data));
    // setCookie(res);
    // Cookies.set("user-token", res?.data?.data)
    return res;
  });
}

function logout() {

  localStorage.removeItem('user-data');
  Cookies.remove('user-token')
  userSubject.next(null);
  Router.push('/login');
}
