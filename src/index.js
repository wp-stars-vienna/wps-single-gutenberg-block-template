import "./index.scss"
import React, { useState, useEffect } from "react"
import axios from 'axios'

wp.blocks.registerBlockType("wpsblocks/wps-main-block", {
  title: "WPS Main Block",
  icon: "welcome-learn-more",
  category: "common",
  attributes: {
    skyColor: { type: "string" },
    grassColor: { type: "string" },
    posts: {type: "array" }
  },
  edit: EditComponent,
  save: function () {
    return null
  }
})

function EditComponent(props) {
  function updateSkyColor(e) {
    props.setAttributes({ skyColor: e.target.value })
  }

  function updateGrassColor(e) {
    props.setAttributes({ grassColor: e.target.value })
  }

  function updatePostSelection(e) {
    console.log(getSelectedOptions(e.target))
    let posts = getSelectedOptions(e.target);
    props.setAttributes({ posts: posts })
  }

  // handles selected options in a select-multiple
  function getSelectedOptions(sel) {
    console.log(sel)
    var opts = [], opt;
    
    for (var i=0, len=sel.options.length; i<len; i++) {
        opt = sel.options[i];
        if ( opt.selected ) {
            opts.push(opt.value);
        }
    }
    return opts;
  }

  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8888/wp_development/wp-json/wp/v2/posts?per_page=3')
      .then(res => {
        console.log(res.data)
        setPosts(res.data)
      })
      .catch(err => {

      })
  }, [])

  return (
    <div className="wpsMainBlock">
      <input type="text" value={props.attributes.skyColor} onChange={updateSkyColor} placeholder="sky color..." />
      <input type="text" value={props.attributes.grassColor} onChange={updateGrassColor} placeholder="grass color..." />
      <select name="posts" id="posts" multiple onChange={updatePostSelection}>
        {posts.map(post => {
          return (
            <option value={post.id}>{post.title.rendered}</option>
          )
        })}
      </select>
    </div>
  )
}
