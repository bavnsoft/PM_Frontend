import React, { Component } from 'react';
import './addleave.css';
import $ from "jquery";
import Header from '../../../Header';
import SideBar from '../../../SideBar';
import axios from 'axios';
import swal from 'sweetalert';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import config from '../../../../config.json';


const url='http://localhost:4000/';
class addleave extends Component {
  constructor(props){
   super(props);
   this.state = {
    startDate: new Date(),

     EmployeeName:'',
     typeofDay:'',
     typeofleave:'Causal',
     Description:'',
     user_id:''
   };
   this.handleChange = this.handleChange.bind(this);
  
   }
   handleChange(date) {
    this.setState({
      startDate: date
    });
  }

   componentWillMount(){

    this.getid();
   }
  // componentDidMount(){}
  // componentWillUnmount(){}

  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}

  getid(){
  
/*    axios.post(url+'addleaves',{user_id:user_id})
          .then((result) => {
            //access the results here....
                if(result.data.status==true){
                    this.setState({addleaves:result.data.result})

                }
           

          });*/
}

EmployeeName(e){
    this.setState({EmployeeName:e.target.value})
  }


  typeofDay(e){
    this.setState({typeofDay:e.target.value});
  }


  typeofleave(e){
    this.setState({typeofleave:e.target.value})
  }





  Description(e){
    this.setState({Description:e.target.value})
  }



  startDate(e){
    this.setState({startDate:e.target.value})
  }



 

apply(e){

  if(!this.state.EmployeeName.trim()){
      $(".errorrrr").show();
      $(".errorrrr h5").html("Please Enter Your Name")
      setTimeout(function(){ $(".errorrrr").hide();},3000);
      return false;
    }
    console.log(this.state);
  if(!this.state.typeofDay.trim()){
      $(".errorrrrr").show();
      $(".errorrrrr h5").html("Please enter Type of Day")
      setTimeout(function(){ $(".errorrrrr").hide();},3000);
      return false;

}

    console.log(this.state);
  if(!this.state.startDate){
      $(".errorr").show();
      $(".errorr h5").html("Please enter Date")
      setTimeout(function(){ $(".errorr").hide();},3000);
      return false;
}

  if(!this.state.Description.trim()){
      $(".errorrr").show();
      $(".errorrr h5").html("Please enter Description")
      setTimeout(function(){ $(".errorrr").hide();},3000);
      return false;

}

const  {EmployeeName, typeofDay,typeofleave ,startDate ,Description} = this.state;
 

let formData = new FormData();    //formdata object
 var user_id = localStorage.getItem('user_id'); 
formData.append('EmployeeName', EmployeeName);   //append the values with key, value pair
formData.append('typeofDay', typeofDay);
formData.append('typeofleave', typeofleave);
formData.append('startDate', startDate);
formData.append('Description', Description);
formData.append('user_id', user_id);

const configers = {     
    headers: { 'content-type': 'multipart/form-data' }
}

//console.log('ll;l;l;l;l;')

      axios.post(config.LocalapiUrl+'addleaves', formData, configers)
          .then((result) => {
           

            if(result.data.status==true){
                swal(result.data.message);

                this.props.history.replace('/manageleave');
              this.getid();
              
            }else{
                    swal(result.data.message);

            }

          });

}

  render() {
    return (
        <div><Header />
        <SideBar />
       <div className="content-wrapper">
             <section className="content">
        <div className="row">
          {/* left column */}
          <div className="col-md-6">
            {/* general form elements */}
            <div className="box box-primary">
              <div className="box-header with-border">
               <h1 className="box-title"><b>ADD LEAVES</b></h1>
              </div>
              

              {/* /.box-header */}
              {/* form start */}
               <form role="form">
                  <div className="box-body">
                  <div className="form-group">
                    <label htmlFor="EmployeeName">Employee Name</label>
                    <input type="EmployeeName" className="form-control" id="EmployeeName" placeholder="Employee Name"  onChange={(e)=>this.EmployeeName(e)}/>
                 <div className="errorrrr"><h5></h5></div>
                  </div>
                    <div className="form-group">
                     <label>Type of Day</label>

        <div className="radio">
          <label>
            <input type="radio" name="optionsRadios"  value="Full Day" onChange={(e)=>this.typeofDay(e)}/>
          Full Day
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" name="optionsRadios" value="Half Day" onChange={(e)=>this.typeofDay(e)}  />
            Half Day
          </label>
        </div>
         <div className="radio">
          <label>
            <input type="radio" name="optionsRadios" value="Short Day" onChange={(e)=>this.typeofDay(e)} />
            Short Day
          </label>
        </div>    
        <div className="errorrrrr"><h5></h5></div>
    
      </div>
                   
                  
                <div className="form-group">
                <label>Type of Leaves</label>
                  <select className="form-control"onChange={(e)=>this.typeofleave(e)}>

                    <option value="Causal">Causal</option>
                    <option value="Emergency">Emergency</option>

                  </select>
                </div>




 
                       <div className="form-group">
                          <label>Date</label><br/>
                           <DatePicker className="form-control-date"
                                  selected={this.state.startDate}
                                  onChange={this.handleChange}
                                />
                                </div>

                    
                    <div className="form-group">
                  <label>Description</label>
                  <textarea className="form-control" rows="3" placeholder="Enter ..."onChange={(e)=>this.Description(e)}></textarea>
                 <div className="errorrr"><h5></h5></div>
                </div>
                  </div>
                  {/* /.box-body */}
                  <div className="box-footer">
                    <button type="button" className="btn btn-primary" onClick={(e)=>this.apply(e)}>Apply</button>
                  </div>
                </form>
            </div>
          </div></div></section>
  </div>
  </div>
    );
  }
}

export default addleave;