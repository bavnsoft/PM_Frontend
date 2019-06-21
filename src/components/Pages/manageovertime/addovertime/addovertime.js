import React, { Component } from 'react';
import './addovertime.css';
import Header from '../../../Header';
import SideBar from '../../../SideBar';
import { Link } from 'react-router-dom'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import $ from "jquery";
import config from '../../../../config.json';
import swal from 'sweetalert';

const url='http://localhost:4000/';

class addovertime extends Component {

  constructor(props){
    super(props);
   this.state = {
      overtimeDate: new Date(),
      Time:'',

   };
           this.handleChange = this.handleChange.bind(this);

   }
handleChange(date) {
   this.setState({
      overtimeDate: date
    });
  } 
  // componentWillMount(){}
  // componentDidMount(){}
  // componentWillUnmount(){}

  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}


 overtimeDate(e){
    this.setState({overtimeDate:e.target.value})
  }

Time(e){
    this.setState({Time:e.target.value})
  }


  save(e){
 


 //console.log(this.state);
  if(!this.state.Time.trim()){
      $(".errorrr").show();
      $(".errorrr h5").html("Please Enter Time ")
      setTimeout(function(){ $(".errorrr").hide();},3000);
      return false;

}


const  {overtimeDate,Time} = this.state;
let formData = new FormData();    //formdata object

formData.append('overtimeDate', overtimeDate);   //append the values with key, value pair
formData.append('Time', Time);

const configers = {     
    headers: { 'content-type': 'multipart/form-data' }
}




      axios.post(config.LiveapiUrl+'overtime', formData, configers)
          .then((result) => {
           

            if(result.data.status==true){
                swal(result.data.message);
                
                this.props.history.replace('/manageovertime');
              
            }else{
                    swal(result.data.message);

            }

          });
      }


  render() {
    const { value, Time} =this.state;

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
               <h3 className="box-title"><b>ADD OVERTIME</b></h3>
              </div>
              {/* /.box-header */}
              {/* form start */}
              <form >
                <div className="box-body">
                  <div className="form-group">
                    
                     <label> Date</label><br/>
                           <DatePicker className="form-control-start"
                                  selected={this.state.overtimeDate}
                                  onChange={this.handleChange}
                                />

                  </div>
                 
                  <div className="form-group">
                    <label htmlFor="Time">Time</label>
                    <input type="number" className="form-control" placeholder="Time"  onChange={(e)=>this.Time(e)}/>
                 <div className="errorrr"><h5></h5></div>
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

export default addovertime;