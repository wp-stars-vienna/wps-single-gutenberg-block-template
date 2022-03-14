import "./frontend.scss"
import React, { useState } from "react"
import ReactDOM from "react-dom"

const PostTeaser = (props) => {
    console.log(props)
    return (
      <div className="post-teaser">
        {props.post.post_title}
      </div>
    )
}

export default PostTeaser