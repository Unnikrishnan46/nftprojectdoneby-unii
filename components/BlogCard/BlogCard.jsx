import React from 'react'
import Style from "./BlogCard.module.css";
import { AiOutlineDelete, AiFillCaretRight } from 'react-icons/ai'
import { Button } from '../componentsindex';
import Image from 'next/image'
import images from "../../img";
import { Router, useRouter } from 'next/router';

const BlogCard = ({ blogTitle, blogContent, deleteBlog, blogId, categories, image }) => {
  const router = useRouter();
  console.log("image is ",image)
  return (
    <div class={Style.card}>
      {/* <div className="card__header">
      <img src="https://source.unsplash.com/600x400/?food" alt="card__image" className="card__image" width="600">
    </div> */}
      {console.log('', image)}
      {console.log('', images)}
      <div class={Style.card__body}>
        {/* <Image
          style={{ marginLeft: "auto" }}
          src={`/${image}`}
          alt="Picture of the author"
          width={500}
          height={500}
        /> */}

       {image ? <Image
          style={{ marginLeft: "auto" }}
          src={require(`../../img/${image}.jpg`)}
          alt="My picture"
          width={500}
          height={500}
        /> : "" }

        <div className={Style.content} >
          <h1 >{blogTitle}</h1>
          {
            categories.split(",").length > 0 ? categories?.split(",").map((category, i) => {
              return <span key={i} class={`${Style.tag} ${Style.tag_brown}`}>{category}</span>
            }) : ""
          }
          <p>{blogContent}</p>
          <Button type="button" btnName="Read Full Post" classStyle={Style.button} handleClick={() => router.push(`/${blogId}`)}></Button>
          {/* <AiOutlineDelete fontSize={30} onClick={() => deleteBlog(blogId)}/> */}
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

export default BlogCard