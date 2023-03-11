import React, { useState } from "react";
import Image from "next/image";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
//INTERNALIMPORT
import Style from "./loginAndSignUp.module.css";
import images from "../img";
import { Button, Error } from "../components/componentsindex.js";
import {Form, Formik} from "formik";
import {FormInput} from "../components/componentsindex.js";
import Link from "next/link";
import {authService} from "../services/auth.service";

const signUp = () => {
  const [activeBtn, setActiveBtn] = useState(1);

  let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name required"),
    email: Yup.string().email("Please enter a valid e-mail").matches(regex, "Please enter a valid e-mail")
      .required("Email required"),
    password: Yup.string()
      .required("Password required"), 
    confirmPassword: Yup.string()
      .required("Confirm password required").oneOf([Yup.ref('password'), null], 'Passwords must match')
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, reset, setError, formState } = useForm(formOptions);
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

  

  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const errorChange = () =>{
    setOpenError(!openError)
  }

  async function onSubmitFunc(data) {
      let dat = { name: data.name, email: data.email, password: data.password,confirmPassword : data.confirmPassword }
      return await authService.signup({
        name: dat.name,
        email: dat.email,
        password: dat.password,
        passwordConfirm:dat.confirmPassword,
        redirect: false,
      }).then(res => {console.log('res',res); return res}).catch(err =>{
        setErrorMessage(err.message)
        errorChange();
        return console.log('err',err);
      })



    // return authService.signup(dat)
    //   .then((res) => {
    //     res.data.status === "success" ?( console.log("İşlem başarılı"), router.push("/login")) : ""
    //   })
    //   .catch((error: any) => {
    //     error.response.data.message === "ERROR: duplicate key value violates unique constraint \"idx_users_email\" (SQLSTATE 23505)" && (Alert().Error("Email registered in the system"), router.push("/login"))
    //     //     // setError('apiError', { message: error.message });
    //   });
  }
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{ name: "", email: '', password: '',confirmPassword:""}}
      onSubmit={(values) => onSubmitFunc(values)}
    >
      {formik => {
        const { touched, isValid, values, handleChange } = formik
    return (
    <div className={Style.user}>
      
      <div className={Style.user_box}>
      {openError && <Error error={errorMessage} errorChange={errorChange}  />}
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
          <div className={Style.user_box_input}>
            <FormInput errors={errors.name} isValid={isValid} touched={touched.name} formik={formik.errors.name} type="name" inputType="text" values={values.name} handleChange={handleChange} text="Name"  />
            <FormInput errors={errors.email} isValid={isValid} touched={touched.email} formik={formik.errors.email} type="email" inputType="email" values={values.email} handleChange={handleChange} text="Email" placeholder="example@emample.com" />
            <FormInput errors={errors.password} isValid={isValid} touched={touched.password} formik={formik.errors.password} type="password" inputType="password" values={values.password} handleChange={handleChange} text="Password" />

            <FormInput errors={errors.confirmPassword} isValid={isValid} touched={touched.confirmPassword} formik={formik.errors.confirmPassword} type="confirmPassword" inputType="password" values={values.confirmPassword} handleChange={handleChange} text="Confirm Password" />
          </div>

        {/* <div className={Style.user_box_input_box}>
            <label htmlFor="name">Name</label>
            <input type="text" placeholder="" />
          </div>
          <div className={Style.user_box_input_box}>
            <label htmlFor="email">Email address</label>
            <input type="email" placeholder="example@emample.com" />
          </div>
          <div className={Style.user_box_input_box}>
            <label
              htmlFor="password"
              className={Style.user_box_input_box_label}
            >
              <p>Password</p>
              <p>
                <a href="#">Forget password</a>
              </p>
            </label>
            <input type="password" />
          </div>
          <div className={Style.user_box_input_box}>
            <label
              htmlFor="confirm Password"
              className={Style.user_box_input_box_label}
            >
              <p>Confirm Password</p>
            </label>
            <input type="password" />
          </div> */}
          
        <Button type="submit" isSubmitting={formState.isSubmitting} btnName="Continue" classStyle={Style.button} handleClick={undefined} />
        </Form>
        <small style={{marginTop:"10px"}}>If you have a registered account<b style={{marginLeft:"10px"}}><Link href="/login">Login</Link></b></small>
      </div>
    </div>
    )
      }}
    </Formik>
  );
};

export default signUp;
