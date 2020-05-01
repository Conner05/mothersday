import React from "react";
import "./App.css";

function App() {
  return (
    <div className='App'>
      <button id='select-button'>Select and upload files</button>
      <input type='file' id='file-input' multiple style={{ display: "none" }} />
    </div>
  );
}

export default App;
