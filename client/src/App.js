import React from 'react'
import {BrowserRouter as Router, Route,Switch,} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import LoginView from './views/loginView'
import Footer from './components/footer'
import AppBarView from './views/appBarView'
import Game from './components/game'
import UserRegister from './components/userRegister'

function App() {
  return (
    <div className="container">
      <React.Fragment>
        <Router>
            <Route exact path="/" component={LoginView} />      
            <Route exact path="/register" component={UserRegister}/>      
            <Route path="/app" component={AppBarView}/>
            <Route exact path="/app/game" component={Game}/> 
        </Router>
        <Footer />
      </React.Fragment>
    </div>
  );
}

export default App;
