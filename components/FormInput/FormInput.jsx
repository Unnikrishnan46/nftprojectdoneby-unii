import {Field} from "formik";
import Style from "./FormInput.module.css";

const FormInput = ({ errors, isValid, touched, formik, type,inputType, handleChange, values, text,placeholder,changePasswordShow }) => {
  return <div className={Style.user_box_input_box}>
  <label
    htmlFor={`${type}`}
    className={Style.user_box_input_box_label}
  >
    <p>{text}</p>
    {
      type==="password" ? <p><a href="#">Forget password</a></p> :""
    }
  </label>
  <Field id={`${type}`} type={inputType} className={`form-control p-0 m-0 ${errors ? 'is-invalid' : ''}`} onChange={handleChange} placeholder={placeholder}
      value={values} />
  <div className={`invalid-feedback`}>{isValid !== true && touched ? <div>{formik}</div> : null}</div>
</div>
}

export default FormInput;