import React, { Component } from 'react';
import './addproject.css';
import $ from "jquery";
import Header from '../../Header';
import SideBar from '../../SideBar';
import axios from 'axios';
import swal from 'sweetalert';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import config from '../../../config.json';

const url='http://localhost:4000/';
class addproject extends Component {
   constructor(props){
     super(props);
     this.state = {
      startDate: new Date(),
      endDate: new Date(),
        serialno:'',
        projectname:'',     
       // startdate:'',
       // enddate:'',
        upload:'', 

     };
        this.handleChanger = this.handleChanger.bind(this);
        this.handleChange = this.handleChange.bind(this);

  }
  handleChanger(date) {
    this.setState({
      startDate: date
    });
  }

handleChange(date) {
    this.setState({
      endDate: date
    });
  }
   componentDidMount(){
  
    }

    
 serialno(e){
    this.setState({serialno:e.target.value})
  }

projectname(e){
    this.setState({projectname:e.target.value})
  }

 
 startDate(e){
    this.setState({startDate:e.target.value})
  }
  endDate(e){
    this.setState({endDate:e.target.value})
  }
upload(e){
    this.setState({upload:e.target.files[0]})
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
  if(!this.state.projectname.trim()){
      $(".errorr").show();
      $(".errorr h5").html("Please enter Your Project Name")
      setTimeout(function(){ $(".errorr").hide();},3000);
      return false;
}
 console.log(this.state);
  if(!this.state.serialno.trim()){
      $(".errorrr").show();
      $(".errorrr h5").html("Please enter your Task Name")
      setTimeout(function(){ $(".errorrr").hide();},3000);
      return false;

}



 
console.log(this.state);
  if(!this.state.upload){
      $(".errorrrrrr").show();
      $(".errorrrrrr h5").html("Please upload Documents")
      setTimeout(function(){ $(".errorrrrrr").hide();},3000);

}




    const  {serialno, projectname ,startDate,endDate,upload} = this.state;

      /*axios.post(url+'project', {serialno, projectname,startdate,enddate,upload})
          .then((result) => {
            //access the results here....

            console.log(result.data.user_id);
            if(result.data.status==true){
                swal(result.data.message);
              
            }else{
                    swal(result.data.message);

            }

          });

  }*/
let formData = new FormData();    //formdata object

formData.append('serialno', serialno);   //append the values with key, value pair
formData.append('projectname', projectname);
formData.append('startDate', startDate);
formData.append('endDate', endDate);
formData.append('upload', upload);

const configers = {     
    headers: { 'content-type': 'multipart/form-data' }
}




      axios.post(config.LocalapiUrl+'project', formData, configers)
          .then((result) => {
           

            if(result.data.status==true){
                swal(result.data.message);
                
                this.props.history.replace('/manageproject');
              
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
               <h3 className="box-title"><b>PROJECT</b></h3>
              </div>
              {/* /.box-header */}
              {/* form start */}
              <form >
              <div className="box-body">
              <div className="form-group">
                  <label><b>Select Employee</b></label>
                  <select className="form-control">
                    <option>RahuL</option>
                    <option>Sumit </option>
                    <option>shivank </option>
                    <option>Jagjit </option>
                    <option>Other</option>
                  </select>
                </div>
                </div>
                <div className="box-body">
                <div className="form-group">
                    <label htmlFor="Serial No">Serial No.</label>
                    <input type="Serial No" className="form-control" id="Serial No" placeholder="Serial No"  onChange={(e)=>this.serialno(e)}/>
                 <div className="errorrr"><h5></h5></div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="Project Name">Project Name</label>
                    <input type="Project Name" className="form-control" id="Project Name" placeholder="Project Name"  onChange={(e)=>this.projectname(e)}/>
                 <div className="errorr"><h5></h5></div>
                  </div>
                  <div className="form-group">
                    
                     <label>Start Date</label><br/>
                           <DatePicker className="form-control-start"
                                  selected={this.state.startDate}
                                  onChange={this.handleChanger}
                                />
                  </div>

                <div className="form-group">
                   <label>End Date</label><br/>
                    <DatePicker className="form-control-end"
                                  selected={this.state.endDate}
                                  onChange={this.handleChange}
                                />
                  </div>
                

                  <div className="form-group">
                    <label htmlFor="upload" >Upload Document</label>
                    <input type="file" id="upload" onChange={(e)=>this.upload(e)}/>
                    {/*<p className="help-block">Example block-level help text here.</p>*/}
                  <div className="errorrrrrr"><h5></h5></div>
                  </div>
                  <div className="checkbox">
                    <label>
                      <input type="checkbox"/> Check me out
                    </label>  
                  </div>
                </div>
                {/* /.box-body */}
                <div className="box-footer">
                  <button type="button" className="btn btn-primary" onClick={(e)=>this.save(e)}>Save</button>
                </div>
              </form>
            </div>
          </div></div></section>
  </div>
  </div>
    );
  }
}

export default addproject;