import React from "react"
import "./App.css"

function BlobList({ children, names }) {
  return (
    <div className="row">
      <div className="col-12" aria-label="names">
        {children}
        <div className="col-10 offset-1">
          {names.map((name, key) => (
            <div key={key} className={`alert alert-${key % 2 ? "success" : "secondary"}`} style={{ padding: "8px 20px", marginBottom: "5px" }} role="alert">
              <span role="img" aria-label="woman emoji">
                🙋‍♀️
              </span>
              <span aria-label={`names list number ${key + 1} ${name}`}>&nbsp;{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlobList
