import React, {useState} from 'react'
import {blogService} from "../../services/blog.service.jsx";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import {Formik,Form} from "formik";
import {Button, FormInput} from "../componentsindex.js"; 
import Style from "./CreateBlog.module.css";
import axios from 'axios';

const CreateBlog = () => {
  const validationSchema1 = Yup.object().shape({
    title: Yup.string().min(10,"Blog title must have 10 character")
      .required("Blog title required"),
    content: Yup.string()
      .min(10,"Blog content must have 10 character")
      .required("Blog content required"),
    // categories: Yup.string().min(2,"Blog category must have 2 character").required("Category required")
  });

  const formOptions = { resolver: yupResolver(validationSchema1) };

  const { register, handleSubmit, reset, setError, formState } = useForm(formOptions);
  const { errors } = formState;

  async function onSubmitFunc(data) {
    console.log('onSubmitted',data);

    const formData = new FormData();
    formData.append("title",data.title);
    formData.append("content",data.content);
    formData.append("categories",data.categories);
    formData.append("filename",selectedFile);

    // let header = token !== undefined ? {
    //   'Content-Type': 'multipart/form-data' }
    //   // "Authorization": token
    // } : { 'Content-Type': 'multipart/form-data' }


    return await axios.post("http://localhost:3001/api/v1/blogs",formData,{headers:{'Content-Type': 'multipart/form-data'}}).then((res) => {
        console.log('createResponse',res);
      })
      
  }

  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState();

  const handleUpload = async () => {
    setUploading(true);
    try {
      if (!selectedFile) return;
      const formData = new FormData();
      // formData.append("myImage", selectedFile);
      // const { data } = await axios.post("/api/image", formData);
      console.log(data);
    } catch (error) {
      console.log(error.response?.data);
    }
    setUploading(false);
  };
  return (
    <Formik
      validationSchema={validationSchema1}
      initialValues={{ title: '', content: '',categories:''}}
      onSubmit={(values,actions) => onSubmitFunc(values)}
        // setTimeout(() => {
        //   alert(JSON.stringify(values, null, 2));
        //   actions.setSubmitting(false);
        // }, 1000);}
    >
      {formik => {
        const { touched, isValid, values, handleChange } = formik
        console.log('values',values);
        
    return (
    <div className={Style.blog}>
      <div className={Style.create_blog_box}>
        <Form>
            <div style={{position:"relative"}}>
              <label>
              <input hidden  type="file" id="myFile" name="myFile" onChange={({ target }) => {
            if (target.files) {
              const file = target.files[0];
              setSelectedImage(URL.createObjectURL(file));
              setSelectedFile(file);
            }
          }}/>
              <div style={{border:"1px dashed",cursor:"pointer",padding:"5px"}}>
                {
                  selectedImage ? <span >{selectedFile.name}</span>:<span className={Style.selectedLink} >Select Image</span>
                }
              </div>
              </label>
            </div>
            <FormInput errors={errors.title} isValid={isValid} touched={touched.title} formik={formik.errors.title} type="title" inputType="text" values={values.title} handleChange={handleChange} text="Title" />
            <FormInput errors={errors.content} isValid={isValid} touched={touched.content} formik={formik.errors.content} type="content" inputType="text" values={values.content} handleChange={handleChange} text="Content" />
            <FormInput errors={errors.categories} isValid={isValid} touched={touched.categories} formik={formik.errors.categories} type="categories" inputType="text" values={values.categories} handleChange={handleChange} text="Categories" placeholder="category,category..." />
            <Button type="submit" isSubmitting={formState.isSubmitting} btnName="Create" classStyle={Style.button} />
          </Form>
      </div>
    </div>
    )
    }}
    </Formik>
  )
}

export default CreateBlog;