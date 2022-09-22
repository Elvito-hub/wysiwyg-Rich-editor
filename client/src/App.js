import React, { Component } from "react";
import RichEditor from "./Components/RichEditor";
import "./app.css";
import "@draft-js-plugins/emoji/lib/plugin.css";

const App = () => (
  <div className="App">
    <h2>React Wysiwyg Rich Editor Using Draft.js</h2>
    <RichEditor />
  </div>
);

export default App;
