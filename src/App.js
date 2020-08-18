import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './app/home/Home';
function App() {
  return (
      <main>
          <Switch>
            <Route path="/" component={Home} exact />
          </Switch>
        </main>
  );
}

export default App;
