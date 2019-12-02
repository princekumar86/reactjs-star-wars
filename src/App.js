import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Search from './components/Search';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/search' component={Search} />
      </Switch>
    </div>
  );
}

export default App;
