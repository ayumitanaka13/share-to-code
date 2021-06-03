import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Auth from "./components/Auth";

import "@material-tailwind/react/tailwind.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen w-screen bg-gray-200">
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" exact component={Auth} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
