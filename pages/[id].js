import axios from 'axios';
import Image from 'next/image';
import React, {useEffect} from 'react'
// import Style from '../../styles/blogDetail.module.css'
import Style from '../styles/blogDetail.module.css'
// import images from "../../img";


export const getServerSideProps = async (context) => {
  var authorization = "";
  const { id } = context.query;

  let token  = context.req.headers.cookie.split(" ")[3];
  authorization = token?.split("=")[1];

  const allBlogOptions = {
    method: 'GET',
    url: `http://localhost:3001/api/v1/blogs/${id}`,
    headers: {
      'Content-Type': 'application/json'
      // 'Authorization':`Bearer ${authorization}`
    }
  };

  const blogDetail = await axios(allBlogOptions).then((res) => res).catch(err => err)

  return {
    props: {
      blogDetail: blogDetail.data ? blogDetail?.data.data.blog : {}
    }
  }
}



const BlogDetail = ({blogDetail}) => {

  useEffect(() => {
console.log('detail',blogDetail.filename);
  }, [blogDetail])
  return (
    <div class={Style.card}>
    {/* <div className="card__header">
      <img src="https://source.unsplash.com/600x400/?food" alt="card__image" className="card__image" width="600">
    </div> */}
    <div class={Style.card__body}>

    <Image
      style={{marginLeft:"auto"}}
      src={require(`../img/${blogDetail.filename}.jpg`)}
      alt="Picture of the author"
      width={500}
      height={500} 
      />

    {blogDetail.image ? <Image
      style={{marginLeft:"auto"}}
      src={require(`../img/${blogDetail.filename}.jpg`)}
      // src={`http://localhost:3001/api/v1/blogs${blogDetail.image}`}
      // src={`${blogDetail.image}`}
      alt="Picture of the author"
      width={500}
      height={500} 
      /> : ""}
      <div className={Style.content} >
      <h1>{blogDetail.title}</h1>

      <p>{blogDetail.content}</p>
      {/* <AiOutlineDelete fontSize={30} onClick={() => deleteBlog(blogId)}/> */}

      {
        blogDetail.categories.split(",").length>0? blogDetail.categories?.split(",").map((category,i) =>{
          return <span key={i} class={`${Style.tag} ${Style.tag_brown}`}>{category}</span>
        }):""
      }
      </div>
    </div>

    {/* <div className="card__footer">
      <div className="user">
        <div className="user__info">
          <h5>Jony Doe</h5>
          <small>Yesterday</small>
        </div>
      </div>
    </div> */}
  </div>
  )
}

export default BlogDetail

