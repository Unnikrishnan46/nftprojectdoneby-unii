import axios from 'axios';
import Cookies from 'js-cookie';
import {useRouter} from 'next/router';
import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import BlogCard from '../../components/BlogCard/BlogCard';
import {Button, CreateBlog} from '../../components/componentsindex'
import {setBlogList} from '../../redux/reducers/BlogReducer';
import {authService} from '../../services/auth.service';
import {blogService} from '../../services/blog.service';
import Style from "../../styles/blog.module.css";

export const getServerSideProps = async (context) => {
  var authorization = "";

  
  let token  = context.req.headers.cookie.split(" ")[3];
  authorization = token?.split("=")[1];

  const allBlogOptions = {
    method: 'GET',
    url: `http://localhost:3001/api/v1/blogs`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Bearer ${authorization}`
    }
  };

  const allBlogs = await axios(allBlogOptions).then((res) => res).catch(err => err)

  return {
    props: {
      allBlogs: allBlogs.data ? allBlogs?.data.data.blogs : []
    }
  }
}


const Blog = ({allBlogs}) => {
  const dispatch = useDispatch();
  const { blogList} = useSelector((state) =>state.blog)

  useEffect(() => {
    if(allBlogs!==[]){
    dispatch(setBlogList(allBlogs))
  }
  }, [allBlogs])

  function DeleteBlog(id){
    return blogService.deleteBlog(id)
      .then((res) => {
        console.log('res',res.data.data);
      })
      
  }

  return (
    <div className={Style.container}>
      {/* <Button type="button" btnName="Add Blog" classStyle={Style.button} /> */}
      {/* <div className={Style.blog_list}>
          <div className={Style.blog_list}> */}
            {
              blogList?.length >0 ? blogList?.map(item => {
                return <BlogCard blogTitle={item.title} blogContent={item.content} deleteBlog={DeleteBlog} blogId={item._id} categories={item.categories} image={item.filename} />
                
                // <li>{item.title}- {item.content} <button onClick={() =>DeleteBlog(item._id)}>Delete</button> </li>
              }):""
            }
          {/* </div>
      </div> */}
    </div>
    
  )
}

export default Blog