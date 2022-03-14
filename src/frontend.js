import "./frontend.scss"
import React from "react"
import ReactDOM from "react-dom"
import ThreeFeatured from "./ThreeFeatured"


document.addEventListener("DOMContentLoaded", () => {
  const divsToUpdate = document.querySelectorAll(".mainblock-update-me")

  divsToUpdate.forEach(div => {
    const data = JSON.parse(div.querySelector("pre").innerText)
    console.log(data.post_objects)
    ReactDOM.render(<ThreeFeatured {...data} />, div)
    div.classList.remove("mainblock-update-me")
  })
});

