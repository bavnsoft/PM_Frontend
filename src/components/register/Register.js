import React, { Component } from 'react';
import './Register.css';

class Register extends Component {
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

               <div className="register-box">
        <div className="register-logo">
          <a href="../../index2.html"><b>Admin</b>LTE</a>
        </div>
        <div className="register-box-body">
          <p className="login-box-msg">Register a new membership</p>
          <form action="../../index.html" method="post">
            <div className="form-group has-feedback">
              <input type="text" className="form-control" placeholder="Full name" />
              <span className="glyphicon glyphicon-user form-control-feedback" />
            </div>
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
                    <input type="checkbox" /> I agree to the <a href="#">terms</a>
                  </label>
                </div>
              </div>
              {/* /.col */}
              <div className="col-xs-4">
                <button type="button" className="btn btn-primary btn-block btn-flat">Register</button>
              </div>
              {/* /.col */}
            </div>
          </form>
          <div className="social-auth-links text-center">
           
          </div>
          
        </div>
        {/* /.form-box */}
      </div>

     
    );
  }
}

export default Register;