import React from 'react';
import './App.css';
import Home from './pages/Home';
import Salao from './pages/Salao';
import Cozinha from './pages/Cozinha';
import Register from './pages/Register'
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';

function App (){
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Route path="/" exact component={Home} />
          <Route path="/Salao/:id" component={Salao} />
          <Route path="/Register" component={Register} />
          <Route path="/Cozinha" component={Cozinha} />
        </header>
      </div>
    </Router>
  )
}

export default App;
