import React from "react";
import Navigation from "./components/navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Admin from "./pages/admin";
import About from "./pages/about";
import Container from "react-bootstrap/Container";
import Home from "./pages/home";
import Posts from "./pages/posts";

function App() {
  return (
    <>
      <Router>
        <Navigation />
        <Container>
          <div style={{ height: "40px" }}></div>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/posts/:id" exact component={Posts} />
            <Route path="/admin" exact component={Admin} />
            <Route path="/about" exact component={About} />
            <Route path="/" render={() => <div>404. Page not found</div>} />
          </Switch>
        </Container>
      </Router>
    </>
  );
}

export default App;
