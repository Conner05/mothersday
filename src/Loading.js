import React, { useEffect, useRef, useState } from "react"
import elsie from "./elsie-min.PNG"

export default function Loading() {
  const img = useRef()
  const [rotate, setRotate] = useState("rotate")
  const [dot1, setDot1] = useState("")
  const [dot2, setDot2] = useState("")
  const [dot3, setDot3] = useState("")
  const color = "white"

  useEffect(() => {
    const rotateInterval = setInterval(() => {
      setRotate((curr) => (curr === "rotate" ? "rotate-reverse" : "rotate"))
    }, 500)
    return () => {
      clearInterval(rotateInterval)
    }
  }, [])

  useEffect(() => {
    const ellipsesTimeout = setTimeout(() => {
      if (dot1 === color) {
        setDot1("")
        setDot2(color)
      } else if (dot2 === color) {
        setDot2("")
        setDot3(color)
      } else if (dot3 === color) {
        setDot3("")
        setDot1(color)
      } else {
        setDot1(color)
      }
    }, 400)
    return () => {
      clearTimeout(ellipsesTimeout)
    }
  }, [dot1, dot2, dot3])

  return (
    <div className="loading" aria-label="loading">
      <img ref={img} src={elsie} className={rotate} alt="elsie moving" aria-label="picture of elsie moving" />
      <h1>
        Loading<span style={{ color: dot1 }}>.</span>
        <span style={{ color: dot2 }}>.</span>
        <span style={{ color: dot3 }}>.</span>
      </h1>
    </div>
  )
}
