import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Auth from "./components/Auth";
import PostDetails from "./components/PostDetails";

import "@material-tailwind/react/tailwind.css";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <BrowserRouter>
      <div className="min-h-screen w-screen">
        {/* <div className="min-h-screen w-screen bg-gradient-to-tr from-green-400 to-blue-500"> */}
        <NavBar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route
            path="/auth"
            exact
            component={() => (!user ? <Auth /> : <Redirect to="/posts" />)}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
