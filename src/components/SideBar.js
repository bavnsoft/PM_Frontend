import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {NavLink} from 'react-router-dom';

export default class SideBar extends Component {
    render(){

      var user_id = localStorage.getItem('user_id'); 

        return (
            <aside className="main-sidebar">
                <section className="sidebar">
                    <div className="user-panel">
                        <div className="pull-left image">
                            <img src="img/user2-160x160.jpg" className="img-circle" alt="User Image" />
                        </div>
                        <div className="pull-left info">
                            <p>Alexander Pierce</p>
                            <a href="#"><i className="fa fa-circle text-success"></i> Online</a>
                        </div>
                    </div>
                    <ul className="sidebar-menu" data-widget="tree">
                        
                        <li>
                        <NavLink to="/Dashboard"exact activeStyle={{color:'white'}}>
                            <i className="fa fa-th"></i> <span> Dashboard</span>
                            <span className="pull-right-container">
                            <small className="label pull-right bg-green"></small>
                            </span>
                        </NavLink>
                        </li>
                        
                        <li>
                         <NavLink to="/manageemployee"exact activeStyle={{color:'white'}}>
                        
                            <i className="fa fa-th"></i> <span>Manage Employee</span>
                            <span className="pull-right-container">
                            <small className="label pull-right bg-green"></small>
                            </span>
                        </NavLink>
                        </li>



                         <li>
                          <NavLink to="/manageleave"exact activeStyle={{color:'white'}}>
                    
                            <i className="fa fa-th"></i> <span>Manage Leaves</span>
                            <span className="pull-right-container">
                            <small className="label pull-right bg-green"></small>
                            </span>
                        </NavLink>
                        </li>
                         <li>

                    <NavLink to="/department"exact activeStyle={{color:'white'}}>

                            <i className="fa fa-th"></i> <span>Manage Department</span>
                            <span className="pull-right-container">
                            <small className="label pull-right bg-green"></small>
                            </span>
                        </NavLink>
                        </li>

                         <li>
                        
                          <NavLink to="/manageproject"exact activeStyle={{color:'white'}}>
                            <i className="fa fa-th"></i> <span>Manage Project</span>
                            <span className="pull-right-container">
                            <small className="label pull-right bg-green"></small>
                            </span>
                        </NavLink>
                        </li>
                       
                           <li>
            
                         <NavLink to="/managetask"exact activeStyle={{color:'white'}}>

                            <i className="fa fa-th"></i> <span>Manage Task</span>
                            <span className="pull-right-container">
                            <small className="label pull-right bg-green"></small>
                            </span>
                        </NavLink>
                        </li>

                    </ul>
                </section>
            </aside> 
        )
    }
}
