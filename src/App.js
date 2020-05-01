import React, { useState, useEffect } from "react"
import "./App.css"
import BlobList from "./BlobList"
import * as utils from "./utils"
import BlobUpload from "./BlobUpload"
import Header from "./Header"

function App() {
  const [message, setMessage] = useState({ display: false, value: "", type: "success" })
  const [names, setNames] = useState([])

  useEffect(() => {
    const getNames = async () => {
      const result = await utils.getNamesOfPosters()
      setNames(result)
    }
    getNames()
  }, [])

  return (
    <div className="container" style={{ overflowY: "scroll" }}>
      <div className="row" style={{ marginTop: "50px" }}>
        <div className="col-12">
          <Header message={message} />
          <BlobUpload setNames={setNames} setMessage={setMessage} />
        </div>
      </div>
      <div style={{ marginTop: "25px" }}></div>
      {names.length > 0 && (
        <div className="row">
          <div className="col-12">
            <BlobList names={names}>
              <h5>
                <span role="img" aria-label="eyes emoji">
                  👀
                </span>
                &nbsp;Look who's already submitted!
              </h5>
            </BlobList>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
