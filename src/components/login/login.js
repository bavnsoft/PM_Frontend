import React, { Component } from 'react';
import './login.css';

class login extends Component {
  // constructor(props){
    // super(props);
    // this.state = {};
  // }

  // componentWillMount(){}
  // componentDidMount(){}
  // componentWillUnmount(){}

  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}

  render() {
    return (
            <div className="login-box">
        <div className="login-logo">
          <a href="../../index2."><b>Admin</b>LTE</a>
        </div>
        <div className="login-box-body">
          <p className="login-box-msg">Sign in to start your session</p>
       <form>

            <div className="form-group has-feedback">
              <input type="email" className="form-control" placeholder="Email" />
              <span className="glyphicon glyphicon-envelope form-control-feedback" />
            </div>
            <div className="form-group has-feedback">
              <input type="password" className="form-control" placeholder="Password" />
              <span className="glyphicon glyphicon-lock form-control-feedback" />
            </div>
            <div className="row">
              <div className="col-xs-8">
                <div className="checkbox icheck">
                  <label>
                    <input type="checkbox" /> Remember Me
                  </label>
                </div>
              </div>
              {/* /.col */}
              <div className="col-xs-4">
                <button type="button" className="btn btn-primary btn-block btn-flat">Sign In</button>
              </div>
              {/* /.col */}
            </div>
          </form>
          
          {/* /.social-auth-links */}
          <a href="#">I forgot my password</a><br />
          <a href="register.html" className="text-center">Register a new membership</a>
        </div>
        {/* /.login-box-body */}
      </div>
    );
  }
}

export default login;