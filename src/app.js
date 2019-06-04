
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import Navbar from './components/common/Navbar'
import FlashMessages from './components/common/FlashMessages'

import Home from './components/common/Home.js'
import Register from './components/common/Register.js'
import MainMap from './components/map/MainMap.js'
import Create from './components/events/Create.js'

import 'bulma'
import './style.scss'

class App extends React.Component {
  render(){
    return(
      <Router>
        <div>
          <Navbar />
          <FlashMessages />
          <Switch>
            <Route path="/create" component={Create} />
            <Route path="/map" component={MainMap} />
            <Route path="/register" component={Register} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
