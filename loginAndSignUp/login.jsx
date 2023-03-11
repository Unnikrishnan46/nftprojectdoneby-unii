import React, { useEffect, useState } from "react";
import Image from "next/image";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import {Form, Formik} from "formik";
import {FormInput} from "../components/componentsindex.js";


//INTERNALIMPORT
import Style from "./loginAndSignUp.module.css";
import images from "../img";
import { Button } from "../components/componentsindex.js";
import {authService} from "../services/auth.service.jsx";
import {VscEye, VscEyeClosed} from "react-icons/vsc";

const login = () => {
  const [activeBtn, setActiveBtn] = useState(1);
  const [submitting, setSubmitting] = useState(false)
  const [passwordShow, setPasswordShow] = useState(false)

  let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Please enter a valid e-mail").matches(regex, "Please enter a valid e-mail")
      .required("Email required"),
    password: Yup.string().required("Password required").min(8,"Please enter a password of at least 8 characters")
      
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, reset, setError, formState,resolver } = useForm(formOptions);
  const { errors } = formState;

  const socialImage = [
    {
      social: images.facebook,
      name: "Continue with Facebook",
    },
    {
      social: images.twitter,
      name: "Continue with twitter",
    },
    {
      social: images.facebook,
      name: "Continue with Facebook",
    },
  ];

  const changePasswordShow = () =>{
    setPasswordShow(!passwordShow);
  }


  const handleClick = () =>{
    setSubmitting(true);
  }

  function onSubmitFunc(data) {
    let dat = {email: data.email, password: data.password}
    // const res = await signIn("credentials", {
    //   email: dat.email,
    //   password: dat.password,
    //   redirect: false,
    // });

    return authService.login(dat)
      .then((res) => {
        res.data.status === "success" ?( console.log("Success"), router.push("/login")) : ""
      })
      .catch((error) => {
        error.response.data.message === "ERROR: duplicate key value violates unique constraint \"idx_users_email\" (SQLSTATE 23505)" && (Alert().Error("Email registered in the system"), router.push("/login"))
        //     // setError('apiError', { message: error.message });
      });
  }
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{ email: '', password: ''}}
      onSubmit={(values) => onSubmitFunc(values)}
    >
      {formik => {
        const { touched, isValid, values, handleChange } = formik
    return (
    <div className={Style.user}>
      <div className={Style.user_box}>
        <div className={Style.user_box_social}>
          {socialImage.map((el, i) => (
            <div
              key={i + 1}
              onClick={() => setActiveBtn(i + 1)}
              className={`${Style.user_box_social_item} ${
                activeBtn == i + 1 ? Style.active : ""
              }`}
            >
              <Image
                src={el.social}
                alt={el.name}
                width={30}
                height={30}
                className={Style.user_box_social_item_img}
              />
              <p>
                <span>{el.name}</span>
              </p>
            </div>
          ))}
        </div>
        <p className={Style.user_box_or}>OR</p>
        <Form>
          <FormInput errors={errors.email} isValid={isValid} touched={touched.email} formik={formik.errors.email} type="email" inputType="email" values={values.email} handleChange={handleChange} text="Email" placeholder="example@emample.com" />
            <FormInput errors={errors.password} isValid={isValid} touched={touched.password} formik={formik.errors.password} type="password" inputType={passwordShow ? "text":"password"} values={values.password} handleChange={handleChange} text="Password" changePasswordShow={changePasswordShow} />
            <div style={{display:"flex", justifyContent:"end",marginTop:"5px"}}>
            {passwordShow===true ? <VscEye fontSize={25} onClick={() => changePasswordShow()} /> : <VscEyeClosed fontSize={25} onClick={() => changePasswordShow()}/>}
            </div>
            <Button type="submit" isSubmitting={formState.isSubmitting} btnName="Continue" handleClick={handleClick} classStyle={Style.button} />

          
          </Form>
      </div>
    </div>
    )
    }} 
    </Formik>
  );
};

export default login;
