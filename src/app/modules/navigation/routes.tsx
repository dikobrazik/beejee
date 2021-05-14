import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Navigator = () => {
  return (
    <Router>
      <Switch>
        <Route path="/sign-in"></Route>
        <Route path="/tasks"></Route>
        <Route path="/"></Route>
      </Switch>
    </Router>
  );
};

export default Navigator;
