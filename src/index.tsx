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
        <Route path="/todos/:id" children={<Todo />} />
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
