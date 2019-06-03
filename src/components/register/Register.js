import React, { Component } from 'react';
import './Register.css';
import $ from "jquery";
import axios from 'axios';
//import swal from 'bootstrap-sweetalert';
import swal from 'sweetalert';
import config from '../../config.json';

const url='http://localhost:4000/';
class Register extends Component {
   constructor(props){
     super(props);
     this.state = {
        username :'',
        email:'',
        password:'',
        signup:''
     };
  }

  // componentWillMount(){}
  // componentDidMount(){}
  // componentWillUnmount(){}

  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}


  username(e){
    this.setState({username:e.target.value})
  }
  

  email(e){
    this.setState({email:e.target.value})
  }

  password(e){
    this.setState({password:e.target.value})
  }
signup(e){
  console.log(this.state);
  if(!this.state.username.trim()){
      $(".error").show();
      $(".error h5").html("Please enter Full name")
      setTimeout(function(){ $(".error").hide();},3000);
              return false;

}
console.log(this.state);
  if(!this.state.email.trim()){
      $(".errorr").show();
      $(".errorr h5").html("Please enter Your email")
      setTimeout(function(){ $(".errorr").hide();},3000);
       return false;


}
console.log(this.state);
  if(!this.state.password.trim()){
      $(".errorrr").show();
      $(".errorrr h5").html("Please enter your valid password")
      setTimeout(function(){ $(".errorrr").hide();},3000);
       return false;

}

   const { username, email, password } = this.state;
   axios.post(config.LiveapiUrl+'signup', { username, email, password})
          .then((result) => {
            //access the results here....

            console.log(result.data.status);

            if(result.data.status==true){
                
                swal(result.data.message)
                swal("Good job!", "You are Register!", "success");
               this.props.history.replace('/login');

            }else{

            }

          });

  }



  render() {
              const { username, email, password } = this.state;

 return (

               <div className="register-box">
        <div className="register-logo">
          <a href="../../index2.html"><b>Register</b></a>
        </div>
        <div className="register-box-body">
          <p className="login-box-msg">Register a new membership</p>
          <form>

            <div className="form-group has-feedback">
              <input type="text" className="form-control" placeholder="Full name" onChange={(e)=>this.username(e)}/>
              <div className="error"><h5></h5></div>
              <span className="glyphicon glyphicon-user form-control-feedback" />
            
            </div>
            <div className="form-group has-feedback">
              <input type="email" className="form-control" placeholder="Email" onChange={(e)=>this.email(e)}/>
              <span className="glyphicon glyphicon-envelope form-control-feedback" />
             <div className="errorr"><h5></h5></div>
            </div>
            <div className="form-group has-feedback">
              <input type="password" className="form-control" placeholder="Password" onChange={(e)=>this.password(e)}/>
              <span className="glyphicon glyphicon-lock form-control-feedback" />
            <div className="errorrr"><h5></h5></div>
            </div>
           
            <div className="row">
              <div className="col-xs-8">
                
              </div>
              {/* /.col */}
              <div className="col-xs-4">
                <button type="button" className="btn btn-primary-register btn-block btn-flat" onClick={(e)=>this.signup(e)}>Register</button>
              </div>
              {/* /.col */}
            </div>
          </form>
          <a href="/login" className="text-center">I Have Already Account</a>
          <div className="social-auth-links text-center">
           
          </div>
          
        </div>
        {/* /.form-box */}
      </div>

     
    );
  }
}

export default Register;