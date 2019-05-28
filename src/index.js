import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
//import { Router, Route, Link, IndexRoute } from 'react-router'

import register from './components/register/Register'
import login from './components/login/login'
import App from './App';





ReactDOM.render((
<Router>
		<div>
			<Route exact path = "/" component = {App} />
			<Route path = "/login" component = {login} />
			<Route path = "/register" component = {register} />
			
		</div>
</Router>
), document.getElementById('root'))
