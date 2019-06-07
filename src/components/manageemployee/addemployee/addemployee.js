import React, { Component } from 'react';
import './addemployee.css';
import $ from "jquery";
import Header from '../../Header';
import SideBar from '../../SideBar';
import axios from 'axios';
import swal from 'sweetalert';
import Autocomplete from  'react-autocomplete';
//import { getStocks, matchStocks } from './data';
import Autosuggest from 'react-autosuggest';
import config from '../../../config.json';



// Imagine you have a list of languages that you'd like to autosuggest.
const languages = [
  {
    name: 'JAVA/J2EE & its Frameworks (Struts, Spring, Hibernate)'
    ,
  },
  {
    name: 'CISCO Technologies',
  },

  {
    name: 'Cloud Computing',
  },

  {
    name: 'Microsoft Technologies',
  },

  {
    name: 'PHP',
  },
   {
    name: 'React',
  },
   {
    name: 'Angular',
  },
   {
    name: 'Node',
  },
];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {

  
    
  

  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : languages.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);




const url='http://localhost:4000/';
class addemployee extends Component {
  constructor(props){
     super(props);
     this.state = {
        employeeid:'',
        employeename:'',
        employeeemail:'',
        PhoneNo:'',
        employeedepartment:'',
        employeeprofile:'',
        value: '',
        suggestions: []
         

     };
  }

onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    
 

    this.setState({
      employeedepartment: getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };



 
  // constructor(props){
    // super(props);
    // this.state = {};
  // }

   componentWillMount(){

  
    //this.setState({loder:true});

 
    axios.post(config.LocalapiUrl+'autogenrate')
          .then((result) => {
            //access the results here....
                if(result.data.status==true){
                    this.setState({employeeid:result.data.maxvalue ? result.data.maxvalue : 1000})
                  


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

employeeemail(e){
  this.setState({employeeemail:e.target.value})
}

PhoneNo(e){
  this.setState({PhoneNo:e.target.value})
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
 /* console.log(this.state);
  if(!this.state.employeeid.trim()){
      $(".errorr").show();
      $(".errorr h5").html("Please enter Your id")
      setTimeout(function(){ $(".errorr").hide();},3000);
      return false;
}*/
  if(!this.state.employeename.trim()){
      $(".errorrr").show();
      $(".errorrr h5").html("Please enter employee Name")
      setTimeout(function(){ $(".errorrr").hide();},3000);
      return false;

}

  if(!this.state.employeeemail.trim()){
      $(".errorrr").show();
      $(".errorrr h5").html("Please enter employee email")
      setTimeout(function(){ $(".errorrr").hide();},3000);
      return false;

}

  if(!this.state.PhoneNo.trim()){
      $(".errorrrrrr").show();
      $(".errorrrrrr h5").html("Please enter employee phone")
      setTimeout(function(){ $(".errorrrrrr").hide();},3000);
      return false;

}


  if(!this.state.employeedepartment){
      $(".errorrrr").show();
      $(".errorrrr h5").html("Please enter employee Department")
      setTimeout(function(){ $(".errorrrr").hide();},3000);
      return false;


}  if(!this.state.employeeprofile){
      $(".errorrrr").show();
      $(".errorrrr h5").html("Please upload employee image")
      setTimeout(function(){ $(".errorrrr").hide();},3000);
      return false;


}

    const  {employeeid, employeename ,employeeemail,PhoneNo,employeedepartment,employeeprofile} = this.state;


let formData = new FormData();    //formdata object

formData.append('employeeid', employeeid);   //append the values with key, value pair
formData.append('employeename', employeename);
formData.append('employeeemail', employeeemail);
formData.append('PhoneNo', PhoneNo);
formData.append('employeedepartment', employeedepartment[0].name);
formData.append('employeeprofile', employeeprofile);

const configers = {     
    headers: { 'content-type': 'multipart/form-data' }
}

      axios.post(config.LocalapiUrl+'employee', formData, configers)
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
    const { value, suggestions,employeedepartment,employeeid} =this.state;


    const inputProps = {
      placeholder: 'Choose Department',
      value,
      onChange: this.onChange
    };




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
               <h3 className="box-title"><b>ADD EMPLOYEE</b></h3>
              </div>
              {/* /.box-header */}
              {/* form start */}
              <form >
                <div className="box-body">
                  <div className="form-group">
                    <label htmlFor="employeeid">Employee ID</label>
                    <input type="employeeid" value={employeeid} className="form-control" id="employeeid" placeholder="Employee ID"  onChange={(e)=>this.employeeid(e)} readOnly/>
                 <div className="errorr"><h5></h5></div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="employeename">Employee Name</label>
                    <input type="employeename" className="form-control" id="employeename" placeholder="Employee Name" onChange={(e)=>this.employeename(e)}/>
                 <div className="errorrr"><h5></h5></div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="employeeemail">Employee Email</label>
                    <input type="employeeemail" className="form-control" id="employeeemail" placeholder="Employee Email" onChange={(e)=>this.employeeemail(e)}/>
                 <div className="errorrr"><h5></h5></div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="PhoneNo">Phone No</label>
                    <input type="PhoneNo" className="form-control" id="PhoneNo" placeholder="Phone No" onChange={(e)=>this.PhoneNo(e)}/>
                 <div className="errorrrrrr"><h5></h5></div>
                  </div>

                <div className="form-group">
                    <label htmlFor="employeedepartment">Employee Department </label>
                    <Autosuggest 
                        suggestions={employeedepartment}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                      />
                    {/*<input type="employeedepartment" className="form-control" id="employeedepartment" placeholder="Employee Department " onChange={(e)=>this.employeedepartment(e)}/>*/}
                  <div className="errorrrr"><h5></h5></div>
                  
                  </div>

                  <div className="form-group">
                  <input type='file' onChange={(e)=>this.readURL(e)} /><br/>

                 <img id="blah" src="http://placehold.it/180" style={{height:"100px",width:"100px"}}alt="your image" />
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

export default addemployee;