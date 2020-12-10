import React from "react";
import ReactDOM from "react-dom";
import Routers from "./routers";
import { GlobalProvider } from "./context/global";
import "./assets/styles/index.sass";
import "./assets/styles/tailwind.css";

ReactDOM.render(
  <GlobalProvider>
    <Routers />
  </GlobalProvider>,

  document.getElementById("root")
);
