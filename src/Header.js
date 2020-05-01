import React, { Fragment } from "react"

export default function Header({ message }) {
  return (
    <Fragment>
      <h3 style={{ marginBottom: "25px" }}>
        <span role="img" aria-label="celebrate emoji">
          🎊
        </span>{" "}
        Wish Mysteree a Happy Mother's Day!{" "}
        <span role="img" aria-label="celebrate emoji">
          🎊
        </span>
      </h3>
      {message.display && (
        <div className={`alert alert-${message.type}`} role="alert">
          {message.value}
        </div>
      )}
      <div className={`alert alert-info`} role="alert">
        <span role="img" aria-label="wave emoji">
          👋
        </span>{" "}
        Conner here! Please upload a short video wishing Mysteree a Happy <span style={{ fontWeight: "bold" }}>FIRST</span> Mother's Day!{" "}
        <span role="img" aria-label="party emoji">
          🎉
        </span>
      </div>
    </Fragment>
  )
}
