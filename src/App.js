import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Search from './components/Search';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path='/search' component={Search} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
