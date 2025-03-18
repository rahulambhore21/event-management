import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Events from './components/Events/Events';
import Event from './pages/Event/Event';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={Events} />
      <Route path="/event/:id" component={Event} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
