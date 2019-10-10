import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Email from './pages/Form/Email'
import Instagram from './pages/Form/Instagram'
import LinkedIn from './pages/Form/LinkedIn'
import Password from './pages/Form/Password'
import Login from './pages/Login'
import Portfolio from './pages/Portfolio'

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        {/* Multistep Form */}
        <Route exact path='/signup/email' component={Email} />
        <Route exact path='/signup/instagram' component={Instagram} />
        <Route exact path='/signup/linkedin' component={LinkedIn} />
        <Route exact path='/signup/password' component={Password} />
        {/* Portfolio */}
        <Route exact path='/me/:linkedInUsername' component={Portfolio} />
        <Route exact path='/me/:linkedInUsername/edit' component={Portfolio} />
        {/* 404 */}
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
