import React, { Component } from 'react';
import './editemploye.css';
import $ from "jquery";
import Header from '../../Header';
import SideBar from '../../SideBar';
import axios from 'axios';
import swal from 'sweetalert';
import config from '../../../config.json';

const url='http://localhost:4000/';
class editemploye extends Component {
  constructor(props){
     super(props);
     this.state = {
        employeeid:'',
        employeename:'',
        employeedepartment:'',
        employeeprofile:'',
        employeeprofilePre:'',
        id:'',
         

     };
  }
 


  componentWillMount(){

        
         axios.post(config.LocalapiUrl+'GetEmpById', {id:this.props.match.params.id})
          .then((result) => {
            //access the results here....
            console.log(result)
                if(result.data.status==true){
                  console.log(result.data.result[0].employeedepartment)
                    this.setState({
                      employeedepartment:result.data.result[0].employeedepartment,
                      employeename:result.data.result[0].employeename,
                      employeeid:result.data.result[0].employeeid,
                      employeeprofile:result.data.result[0].employeeprofile,
                      employeeprofilePre:result.data.result[0].employeeprofile,
                      id:result.data.result[0]._id,
                    })

                }
           

          });
  }
  // componentDidMount(){}
  // componentWillUnmount(){}

  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}

employeeid(e){
    this.setState({employeeid:e.target.value})
  }

  employeename(e){
    this.setState({employeename:e.target.value})
  }
 employeedepartment(e){
    this.setState({employeedepartment:e.target.value})
  }

 readURL(input) {
            if (input.target.files && input.target.files[0]) {
                var reader = new FileReader();
             this.setState({employeeprofile:input.target.files[0]})
                reader.onload = function (e) {
                    $('#blah')
                        .attr('src', e.target.result);
                       //console.log(e.target.result)
                };

                reader.readAsDataURL(input.target.files[0]);
            }
        }


save(e){
  console.log(this.state);
  if(!this.state.employeeid.trim()){
      $(".errorr").show();
      $(".errorr h5").html("Please enter Your id")
      setTimeout(function(){ $(".errorr").hide();},3000);
      return false;
}
 console.log(this.state);
  if(!this.state.employeename.trim()){
      $(".errorrr").show();
      $(".errorrr h5").html("Please enter your Name")
      setTimeout(function(){ $(".errorrr").hide();},3000);
      return false;

}

 console.log(this.state);
  if(!this.state.employeedepartment.trim()){
      $(".errorrrr").show();
      $(".errorrrr h5").html("Please enter your Department")
      setTimeout(function(){ $(".errorrrr").hide();},3000);
      return false;


}  if(!this.state.employeeprofile){
      $(".errorrrr").show();
      $(".errorrrr h5").html("Please upload employee image")
      setTimeout(function(){ $(".errorrrr").hide();},3000);
      return false;


}

    const  {employeeid, employeename ,employeedepartment,employeeprofile , id} = this.state;


let formData = new FormData();    //formdata object

formData.append('employeeid', employeeid);   //append the values with key, value pair
formData.append('employeename', employeename);
formData.append('employeedepartment', employeedepartment);
formData.append('employeeprofile', employeeprofile);
formData.append('id', id);

const configers = {     
    headers: { 'content-type': 'multipart/form-data' }
}


      axios.post(config.LocalapiUrl+'editempolyes', formData, configers)
      //console.log(req.body)
          .then((result) => {
           

            if(result.data.status==true){
                swal(result.data.message);
                
                this.props.history.replace('/manageemployee');
              
            }else{
                    swal(result.data.message);

            }

          });

  }






  render() {
    return (
      <div>
        <Header />
        <SideBar />
      <div className="content-wrapper">
             <section className="content">
        <div className="row">
          {/* left column */}
          <div className="col-md-6">
            {/* general form elements */}
            <div className="box box-primary">
              <div className="box-header with-border">
               <h3 className="box-title"><b>EDIT EMPLOYEE</b></h3>
              </div>
              {/* /.box-header */}
              {/* form start */}
              <form >
                <div className="box-body">
                  <div className="form-group">
                    <label htmlFor="employeeid">Employee ID</label>
                    <input type="employeeid" className="form-control" value={this.state.employeeid }id="employeeid" placeholder="Employee ID"  onChange={(e)=>this.employeeid(e)}/>
                 <div className="errorr"><h5></h5></div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="employeename">Employee Name</label>
                    <input type="employeename" className="form-control"value={this.state.employeename} id="employeename" placeholder="Employee Name" onChange={(e)=>this.employeename(e)}/>
                 <div className="errorrr"><h5></h5></div>
                  </div>

                <div className="form-group">
                    <label htmlFor="employeedepartment">Employee Department </label>
                    <input type="employeedepartment" className="form-control" value={this.state.employeedepartment} id="employeedepartment" placeholder="Employee Department " onChange={(e)=>this.employeedepartment(e)}/>
                  <div className="errorrrr"><h5></h5></div>
                  </div>

                  <div className="form-group">
                  <input type='file' onChange={(e)=>this.readURL(e)} />
                 <img id="blah" src={this.state.employeeprofilePre}alt="your image" />
                  </div>


                </div>        
                <div className="box-footer">
                  <button type="button" className="btn btn-primary" onClick={(e)=>this.save(e)}>Update</button>
                </div>
              </form>
            </div>
          </div></div></section>
  </div>
  </div>
    );
  }
} 

export default editemploye;