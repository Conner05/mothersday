import React, { useState, useRef } from "react"
import * as utils from "./utils"

const MESSAGE_TYPE = { SUCCESS: "success", ERROR: "danger" }
const INPUT_IS_VALID_CLASS = { IS_VALID: "is-valid", IS_INVALID: "is-invalid" }

export default function BlobUpload({ setNames, setMessage }) {
  const [name, setName] = useState("")
  const [inputIsValidClass, setInputIsValidClass] = useState("")
  const fileInput = useRef()

  const uploadFiles = async () => {
    setInputIsValidClass("")
    try {
      await utils.postFiles(fileInput.current.files, name)
      setNames((currNames) => [name.trim().split(" ")[0], ...currNames])
      setName("")
      setMessage({ display: true, value: `Success! Thanks ${name}!`, type: MESSAGE_TYPE.SUCCESS })
    } catch (error) {
      setMessage({ display: true, value: `Something went wrong! ${error}`, type: MESSAGE_TYPE.ERROR })
    }
  }

  const handleUploadClick = (e) => {
    e.preventDefault()
    if (name.length < 3) {
      setInputIsValidClass(INPUT_IS_VALID_CLASS.IS_INVALID)
      return
    }
    fileInput.current.click()
  }

  const handleNameChange = (e) => {
    setMessage({ display: false, value: "", type: "" })
    const val = e.target.value
    if (val.length < 3) {
      setInputIsValidClass(INPUT_IS_VALID_CLASS.IS_INVALID)
    } else {
      setInputIsValidClass(INPUT_IS_VALID_CLASS.IS_VALID)
    }
    setName(val)
  }
  return (
    <form className="needs-validation" noValidate>
      <div className="form-row">
        <div className="col-12 mb-3">
          <label htmlFor="validationCustom03" className="col-sm-2 col-form-label col-form-label-lg">
            Name
          </label>
          <input
            type="text"
            className={`form-control form-control-lg ${inputIsValidClass}`}
            aria-label="Enter Name"
            value={name}
            onChange={(e) => handleNameChange(e)}
            placeholder="Tell me who you are!"
            required
          />
          <div className="invalid-feedback">Tell me who you are first!</div>
          <div className="valid-feedback">Looks good!</div>
        </div>
      </div>
      <button aria-label="select video" className="btn btn-primary btn-lg btn-block" onClick={(e) => handleUploadClick(e)} id="select-button" style={{ marginTop: "25px" }}>
        <span role="img" aria-label="point right emoji">
          👉
        </span>
        <span style={{ fontWeight: "bold" }}>&nbsp;Select Video&nbsp;</span>
        <span role="img" aria-label="video camera emoji">
          🎥
        </span>
      </button>
      <input ref={fileInput} aria-label="hidden input" onChange={async () => await uploadFiles()} type="file" id="file-input" multiple style={{ display: "none" }} />
    </form>
  )
}
