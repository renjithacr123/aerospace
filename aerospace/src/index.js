import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./home";
import LineChart from "./chart";

ReactDOM.render(
  <React.StrictMode>
    <Home />
    <LineChart />
  </React.StrictMode>,
  document.getElementById("root")
);
