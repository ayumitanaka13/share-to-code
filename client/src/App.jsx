import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import PostDetails from "./pages/PostDetails";
import Footer from "./components/Footer";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <BrowserRouter>
      <div className="min-h-screen w-screen relative">
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
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
