import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import HomeFeed from "./pages/HomeFeed";

function App() {
  return (
    <>
      <Wrapper>
        <Router>
          <Switch>
            <Route exact path="/">
              <HomeFeed />
            </Route>
            <Route exact path="/sign-in">
              <SignIn />
            </Route>
            <Route exact path="/sign-up">
              <SignUp />
            </Route>
          </Switch>
        </Router>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div``;

export default App;
