import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './components/main';
import Todo from './components/todo';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/">
          <Main />
        </Route>
        <Route path="/todos/:id" children={<Todo />} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
