import React, { useState, useEffect } from 'react'
import jwt from 'jsonwebtoken';
import Cookies from "js-cookie";
// import {authService} from "../services/auth.service";
import { authService } from "../services/auth.service";
import axios from 'axios';
import { CreateBlog } from '../components/componentsindex'

const createBlog = () => {
  const [role, setRole] = useState(null);
  const [adminHere, setAdminHere] = useState(false);

  let token = Cookies.get("user-token");
  let control = authService.userValue.getValue();

  console.log(token, "  ", control.status)

  useEffect(() => {
    const token = localStorage.getItem('user-data'); // retrieve token from local storage
    if (token) {
      const regex = /"role":"(.+?)"/;
      const match = token.match(regex);
      if (match) {
        const role = match[1];
        console.log("user role is ", role);
        if( role === "user"){
          console.log("this is a user")
          setAdminHere(false)
        }if( role === "admin"){
          console.log("this is a admin")
          setAdminHere(true)
        }
      } else {
        setAdminHere(false)
        // handle error if role is not found
      }

    }
  }, []);

  return (
    <div>  
    {adminHere ? <CreateBlog /> : "" }
    </div>
  )
}

export default createBlog