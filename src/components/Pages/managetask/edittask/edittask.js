import React, { Component } from 'react';
import './edittask.css';
import axios from 'axios';
import $ from "jquery";
import Header from '../../../Header';
import SideBar from '../../../SideBar';
import swal from 'sweetalert';
import config from '../../../../config.json';

const url='http://localhost:4000/';

class edittask extends Component {
  constructor(props){
  super(props);
    this.state = {
      projectname:'',
        TaskName:'',
        TaskDetail:'',
        Hours:'',
        upload:'', 
         name: "",
      shareholders: [{ name: "" }]
    };
 }

  // componentWillMount(){}
  // componentDidMount(){}
  // componentWillUnmount(){}

  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}

 componentDidMount(){
  
    }

projectname(e){
    this.setState({projectname:e.target.value})
  }

  TaskName(e){
    this.setState({TaskName:e.target.value})
  }
 TaskDetail(e){
    this.setState({TaskDetail:e.target.value})
  }
  Hours(e){
    this.setState({Hours:e.target.value})
  }
upload(e){
    this.setState({upload:e.target.value})
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
  if(!this.state.TaskName.trim()){
      $(".errorrr").show();
      $(".errorrr h5").html("Please enter your Task Name")
      setTimeout(function(){ $(".errorrr").hide();},3000);
      return false;

}

 console.log(this.state);
  if(!this.state.TaskDetail.trim()){
      $(".errorrrr").show();
      $(".errorrrr h5").html("Please enter your Task Detail")
      setTimeout(function(){ $(".errorrrr").hide();},3000);
      return false;
}

 console.log(this.state);
  if(!this.state.Hours.trim()){
      $(".errorrrrr").show();
      $(".errorrrrr h5").html("Please enter your Project Timeing")
      setTimeout(function(){ $(".errorrrrr").hide();},3000);
      return false;
}
console.log(this.state);
  if(!this.state.upload.trim()){
      $(".errorrrrrr").show();
      $(".errorrrrrr h5").html("Please upload Documents")
      setTimeout(function(){ $(".errorrrrrr").hide();},3000);

}




    const  {projectname, TaskName ,TaskDetail,Hours,upload} = this.state;

      axios.post(config.LiveapiUrl+'project', {projectname, TaskName,TaskDetail,Hours,upload})
          .then((result) => {
            //access the results here....

            console.log(result.data.user_id);
            if(result.data.status==true){
                swal(result.data.message);
              
            }else{
                    swal(result.data.message);

            }

          });

  }

 

  handleNameChange = evt => {
    this.setState({ name: evt.target.value });
  };

  handleShareholderNameChange = idx => evt => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, name: evt.target.value };
    });

    this.setState({ shareholders: newShareholders });
  };

  handleSubmit = evt => {
    const { name, shareholders } = this.state;
    alert(`Incorporated: ${name} with ${shareholders.length} shareholders`);
  };

  handleAddShareholder = () => {
    this.setState({
      shareholders: this.state.shareholders.concat([{ name: "" }])
    });
  };

  handleRemoveShareholder = idx => () => {
    this.setState({
      shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
    });
  };



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
                <div className="row">
                <div className="col-md-8">

               <h3 className="box-title"><b>Task Detail</b></h3>
               </div>
              <div className="col-md-4">
        
         <button
          type="button" className="btn btn-primary"
          onClick={this.handleAddShareholder}
          >
          ADD NEW
        </button>
             </div>

              </div></div>
              {/* /.box-header */}
              {/* form start */}
               <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Bavn Soft"
          value={this.state.name}
          onChange={this.handleNameChange}
        />

        <h4>Today Task Detail</h4>

        {this.state.shareholders.map((shareholder, idx) => (
          <div className="shareholder">
            <div className="row">
                <div className="col-sm-5">
            <input
              type="text"
              placeholder={`Task ${idx + 1} Name`}
              value={shareholder.name}
              


              onChange={this.handleShareholderNameChange(idx)}
            />
            </div>


            <div className="col-sm-5">
                <input
                  type="text"
                  placeholder={`Total hours`}
                  value={shareholder.hours}
                  onChange={this.handleShareholderNameChange(idx)}
                />
            </div>

            <div className="col-sm-2">
                <button
                  type="button" className="btn btn-danger"
                  onClick={this.handleRemoveShareholder(idx)}
                  className="small">
                
              <i className="fa fa-times"></i>

               </button>
              </div>


          </div>
       </div>
        ))}
     <button type="button" className="btn btn-primary" onClick={(e)=>this.save(e)}>Total Hours</button>

     <button type="button" className="btn btn-primary" onClick={(e)=>this.save(e)}>Save</button>

      </form>
            
            </div>
          </div></div></section>
  </div>
  </div>

    );
  }
}

export default edittask;