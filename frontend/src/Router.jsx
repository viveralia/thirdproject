import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Email from './pages/Form/Email'
import Instagram from './pages/Form/Instagram'
import Bio from './pages/Form/Bio'

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        {/* Multistep Form */}
        <Route exact path='/signup/email' component={Email} />
        <Route exact path='/signup/instagram' component={Instagram} />
        <Route exact path='/signup/about' component={Bio} />
        {/* 404 */}
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
