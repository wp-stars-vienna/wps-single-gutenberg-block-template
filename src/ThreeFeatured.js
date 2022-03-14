import "./frontend.scss"
import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import PostTeaser from "./PostTeaser"

const ThreeFeatured = (props) => {
    const [showSkyColor, setShowSkyColor] = useState(false)
    const [showGrassColor, setShowGrassColor] = useState(false)

    return (
      <div className="mainblock-frontend">
        <p>
          <button onClick={() => setShowSkyColor(prev => !prev)}>Toggle view sky color</button>
          {showSkyColor && <span>{props.skyColor}</span>}
        </p>
        <p>
          <button onClick={() => setShowGrassColor(prev => !prev)}>Toggle view grass color</button>
          {showGrassColor && <span>{props.grassColor}</span>}
        </p>
        <div class="posts-row">
            {props.post_objects.map(post => {
                console.log(post)
                return (
                    <div key={post.id}>
                        <PostTeaser post={post} />
                    </div>
                )
            })}
        </div>
      </div>
    )
}

export default ThreeFeatured