import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
//import { Router, Route, Link, IndexRoute } from 'react-router'

import register from './components/register/Register'
import login from './components/login/login'
import Dashboad from './components/Pages/Dashboad/Dashboad'
import Employees from './components/Pages/Employees/Employees'
import department from './components/Pages/department/department'
import manageproject from './components/manageproject/manageproject'
import addproject from './components/manageproject/addproject'
import addemployee from './components/manageemployee/addemployee'
import manageemployee from './components/manageemployee/manageemployee'
import managetask from './components/Pages/managetask/managetask'
import editemploye from './components/manageemployee/editemploye'
import manageleave from './components/Pages/manageleave/manageleave'
import addleave from './components/Pages/manageleave/addleave/addleave'
import adddepartment from './components/Pages/department/adddepartment/adddepartment'
import edittask from './components/Pages/managetask/edittask/edittask'
import addtaskk from './components/Pages/Dashboad/addtaskk/addtaskk'
import Edittask from './components/Pages/Dashboad/addtaskk/Edit-task'
import manageovertime from './components/Pages/manageovertime/manageovertime'
import editovertime from './components/Pages/manageovertime/editovertime/editovertime'
import addovertime from './components/Pages/manageovertime/addovertime/addovertime'


import App from './App';





ReactDOM.render((
<Router>
            <div>
                  <Route exact path = "/" component = {login} />
                  <Route path = "/login" component = {login} />
                  <Route path = "/register" component = {register} />
                  <Route path = "/Dashboard" component = {Dashboad} />
                <Route path = "/Employees" component = {Employees} />
                  <Route path = "/department" component = {department} />           
            <Route path = "/manageproject" component = {manageproject} />
            <Route path = "/addproject" component = {addproject} />
            <Route path = "/addemployee" component = {addemployee} />
            <Route path = "/manageemployee" component = {manageemployee} />
            <Route path = "/managetask" component = {managetask} />
            <Route path = "/editemploye/:id" component = {editemploye} />
            <Route path = "/addleave" component = {addleave} />
            <Route path = "/manageleave" component = {manageleave} />
            <Route path = "/adddepartment" component = {adddepartment} />
            <Route path = "/edittask" component = {edittask} />
            <Route path = "/addtaskk" component = {addtaskk} />
            <Route path = "/edit-task" component = {Edittask} />
            <Route path = "/manageovertime" component = {manageovertime} />
            <Route path = "/editovertime" component = {editovertime} />
            <Route path = "/addovertime" component = {addovertime} />


            </div>
</Router>
), document.getElementById('root'))
