    import React, {Component} from 'react';

export default class Header extends Component {

    logout(e){
       window.location = '/login'
    }
    render(){
        return (
            <header className="main-header">
                <a href="#" className="logo">
                    <span className="logo-mini"><b>A</b>LT</span>
                    <span className="logo-lg"><b>PM_SOFTWARE</b></span>
                </a>
                <nav className="navbar navbar-static-top">
                    <a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
                        <span className="sr-only">Toggle navigation</span>
                    </a>
                    <div className="navbar-custom-menu">
                        <ul className="nav navbar-nav">
                            <li className="dropdown messages-menu">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                   
                                    
                                </a>
                                <ul className="dropdown-menu">
                                    <li className="header">You have 4 messages</li>
                                    <li>
                                        <ul className="menu">
                                            <li>
                                                <a href="#">
                                                    <div className="pull-left">
                                                        <img src="img/user2-160x160.jpg" className="img-circle" alt="User Image" />
                                                    </div>
                                                    <h4>
                                                        Support Team
                                                        <small><i className="fa fa-clock-o"></i> 5 mins</small>
                                                    </h4>
                                                    <p>Why not buy a new awesome theme?</p>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        
                        <div className="col-xs-4">

              <div className="col-xs-4">
                <button type="button"className="btn btn-primary-logout" onClick={(e)=>this.logout(e)}>Logout</button>

                 </div>
              </div>
                    </div>
                </nav>
            </header>
        )
    }
}
