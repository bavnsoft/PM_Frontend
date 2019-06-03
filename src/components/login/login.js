import React, { Component } from 'react';
import './login.css';
import $ from "jquery";
import axios from 'axios';
import swal from 'sweetalert';
import config from '../../config.json';


const url='http://localhost:4000/';
class login extends Component {

  constructor(props){
     super(props);
     this.state = {
        email:'',
        password:'',
        login:''
     };
  }
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
  email(e){
    this.setState({email:e.target.value})
  }

  password(e){
    this.setState({password:e.target.value})
  }
login(e){
  console.log(this.state);
  if(!this.state.email.trim()){
      $(".errorr").show();
      $(".errorr h5").html("Please enter Your email")
      setTimeout(function(){ $(".errorr").hide();},3000);
}
 console.log(this.state);
  if(!this.state.password.trim()){
      $(".errorrr").show();
      $(".errorrr h5").html("Please enter your valid password")
      setTimeout(function(){ $(".errorrr").hide();},3000);
}

 const { email, password } = this.state;
   axios.post(config.LiveapiUrl+'login', {email, password})
          .then((result) => {
            //access the results here....

            console.log(result.data.user_id);

            if(result.data.status==true){
                
                //console.log(result.data);

                localStorage.setItem('user_id',result.data.user_id);
                                this.props.history.replace('/Dashboard');

            //localStorage.setItem('user_id'JSON,stringfy(user_id));
                
                //swal(result.data.message);
              
            }else{
                    swal(result.data.message);

            }

          });






}

  render() {
    return (
            <div className="login-box">
        <div className="login-logo">
          <a href="../../index2.html"><b>Sign</b>IN</a>
        </div>       
        <div className="login-box-body">
          <p className="login-box-msg">Sign In To Start Your Session</p>
          <form>
            <div className="form-group has-feedback">
              <input type="email" className="form-control" placeholder="Email"onChange={(e)=>this.email(e)} />
              <div className="errorr"><h5></h5></div>
              <span className="glyphicon glyphicon-envelope form-control-feedback" />
              

            </div>
            <div className="form-group has-feedback">
              <input type="password" className="form-control" placeholder="Password" onChange={(e)=>this.password(e)}/>
              <div className="errorrr"><h5></h5></div>
              <span className="glyphicon glyphicon-lock form-control-feedback" />
              

            </div>
            <div className="row">
              <div className="col-xs-8">
                


              </div>
              {/* /.col */}
              <div className="col-xs-4">
                <button type="button" className="btn btn-primary-submit btn-block btn-flat"onClick={(e)=>this.login(e)}>Sign In</button>
              </div>
              {/* /.col */}
            </div>
          </form>
          
          {/* /.social-auth-links */}
           {/* <a href="#">I forgot my password</a><br />
          <a href="/register" className="text-center">Register a new membership</a> */}
        </div>
        {/* /.login-box-body */}
      </div>
    );
  }
}

export default login;