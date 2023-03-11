import React, {useEffect} from "react";

//INTERNAL IMPORT
import Style from "../styles/login.module.css";
import Login from "../loginAndSignUp/login";
import {useRouter} from "next/router";
import Cookies from "js-cookie";
import {authService} from "../services/auth.service";
import Link from "next/link";

const login = () => {
  const router = useRouter();

  useEffect(() => {
    // redirect to home if already logged in
    let token = Cookies.get("user-token");
    let control = authService.userValue.getValue();

    if (control !== false && control !== null && token !== undefined && token !== null) {
      console.log("token suii ",token)
      router.push('/');
    }
  }, []);
  return (
    <div className={Style.login}>
      <div className={Style.login_box}>
        <h1>Login</h1>
        <Login />
        <p className={Style.login_box_para}>
          New user? <Link href="/signUp">Create an account</Link>
        </p>
      </div>
    </div> 
  );
};

export default login;
