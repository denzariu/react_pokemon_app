import React from 'react'
import { Switch, Route } from 'wouter'

import Home from "../pages/Home"
import About from "../pages/About"

export default () => {
  return (
    <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
    </Switch>
  )
}
